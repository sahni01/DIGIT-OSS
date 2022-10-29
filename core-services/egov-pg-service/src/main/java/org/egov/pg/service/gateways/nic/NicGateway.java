package org.egov.pg.service.gateways.nic;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.paytm.pg.merchant.CheckSumServiceHelper;

import lombok.extern.slf4j.Slf4j;
import org.egov.pg.models.Transaction;
import org.egov.pg.service.Gateway;
import org.egov.pg.service.gateways.payu.PayuResponse;
import org.egov.pg.utils.Utils;
import org.egov.tracer.model.CustomException;
import org.egov.tracer.model.ServiceCallException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Collections;
import java.util.Map;
import java.util.Objects;
import java.util.TreeMap;

import static java.util.Objects.isNull;

@Service
@Slf4j
public class NicGateway implements Gateway {

	private final String GATEWAY_NAME = "NIC";
	private String DTO;
	private String STO;
	private String DDO;
	private String DeptCode;
	private String Bank;
	private String UUrl_Debit;
	private String UUrl_Status;
	private final boolean ACTIVE;

	private RestTemplate restTemplate;
	private ObjectMapper objectMapper;
	private Epayment epayment;
	private ManualPayment manualPayment;

	@Autowired
	public NicGateway(RestTemplate restTemplate, Environment environment, ObjectMapper objectMapper) {
		this.restTemplate = restTemplate;
		this.objectMapper = objectMapper;
		this.ACTIVE = Boolean.valueOf(environment.getRequiredProperty("nic.active"));

		// ACTIVE = Boolean.valueOf(environment.getRequiredProperty("paytm.active"));
		DTO = environment.getRequiredProperty("nic.DTO");
		STO = environment.getRequiredProperty("nic.STO");
		DDO = environment.getRequiredProperty("nic.DDO");
		DeptCode = environment.getRequiredProperty("nic.DeptCode");
		UUrl_Debit = environment.getRequiredProperty("nic.UUrl.Debit");
		UUrl_Status = environment.getRequiredProperty("nic.UUrl.Status");
	}

	@Override
	public URI generateRedirectURI(Transaction transaction) {

		TreeMap<String, String> paramMap = new TreeMap<>();
		paramMap.put("DTO", DTO);
		paramMap.put("STO", STO);
		paramMap.put("DDO", DDO);
		paramMap.put("DeptCode", DeptCode);
		paramMap.put("ApplicationNumber", transaction.getApplicationNumber());
		paramMap.put("FullName", transaction.getUser().getUserName());
		paramMap.put("CityName", transaction.getCityName());
		paramMap.put("Address", transaction.getAddress());
		paramMap.put("pinCode", transaction.getPinCode());
		paramMap.put("OfficeName", transaction.getOfficeName());
		paramMap.put("emailId", transaction.getUser().getEmailId());
		paramMap.put("TXN_AMOUNT", Utils.formatAmtAsRupee(transaction.getTxnAmount()));
		paramMap.put("challanYear", transaction.getChallanYear());
		paramMap.put("CALLBACK_URL", transaction.getCallbackUrl());
		paramMap.put("gatewayPaymentMode", transaction.getGatewayPaymentMode());
		paramMap.put("bankname", Bank);
		paramMap.put("remarks", transaction.getRemarks());
		paramMap.put("securityEmail", transaction.getSecurityEmail());
		paramMap.put("securityPhone", transaction.getSecurityPhone());
		paramMap.put("validUpto", transaction.getValidUpto());
		paramMap.put("schemeCount", transaction.getSchemeCount());

		try {

			String checkSum = CheckSumServiceHelper.getCheckSumServiceHelper().genrateCheckSum(DeptCode, paramMap);
			paramMap.put("CHECKSUMHASH", checkSum);

			MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
			paramMap.forEach((key, value) -> params.put(key, Collections.singletonList(value)));

			UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(UUrl_Debit).queryParams(params).build()
					.encode();

			return uriComponents.toUri();
		} catch (Exception e) {
			// log.error("Paytm Checksum generation failed", e);
			throw new CustomException("CHECKSUM_GEN_FAILED",
					"Hash generation failed, gateway redirect URI cannot be generated");
		}
	}

	@Override
	public Transaction fetchStatus(Transaction currentStatus, Map<String, String> params) {
		TreeMap<String, String> treeMap = new TreeMap<String, String>();
		treeMap.put("Paymenttype", currentStatus.getTxnId());
		NicReconciliation nicReconciliation = new NicReconciliation();

		try {

			String checkSum = CheckSumServiceHelper.getCheckSumServiceHelper().genrateCheckSum(DeptCode, treeMap);
			treeMap.put("CHECKSUMHASH", checkSum);

			HttpHeaders httpHeaders = new HttpHeaders();
			httpHeaders.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON.toString());

			HttpEntity<NicReconciliation> httpEntity = new HttpEntity<>(nicReconciliation, httpHeaders);

			ResponseEntity<NicResponse> response = restTemplate.postForEntity(UUrl_Status, httpEntity,
					NicResponse.class);

			return transformRawResponse(response.getBody(), currentStatus);

		} catch (RestClientException e) {
			// log.error("Unable to fetch status from Paytm gateway", e);
			throw new CustomException("UNABLE_TO_FETCH_STATUS", "Unable to fetch status from nic gateway");
		} catch (Exception e) {
			// log.error("Paytm Checksum generation failed", e);
			throw new CustomException("CHECKSUM_GEN_FAILED",
					"Hash generation failed, gateway redirect URI cannot be generated");
		}

	}

	@Override
	public boolean isActive() {
		return ACTIVE;
	}

	@Override
	public String gatewayName() {
		return GATEWAY_NAME;
	}

	@Override
	public String transactionIdKeyInResponse() {
		return "txnid";
	}

	private Transaction transformRawResponse(NicResponse resp, Transaction currentStatus) {

		Transaction.TxnStatusEnum status = Transaction.TxnStatusEnum.PENDING;

		if (resp.getStatus().equalsIgnoreCase("TXN_SUCCESS"))
			status = Transaction.TxnStatusEnum.SUCCESS;
		else if (resp.getStatus().equalsIgnoreCase("TXN_FAILURE"))
			status = Transaction.TxnStatusEnum.FAILURE;

		return Transaction.builder().txnId(currentStatus.getTxnId())
				.txnAmount(Utils.formatAmtAsRupee(resp.getTxnAmount())).ApplicationNumber(resp.getApplicationNumber())
				.txnStatus(status).gatewayPaymentMode(resp.getPaymentMode()).gatewayStatusCode(resp.getRespCode())
				.gatewayStatusMsg(resp.getRespMsg()).responseJson(resp).build();

	}
}
