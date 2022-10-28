package org.egov.land.web.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.egov.land.calcutaor.Calculator;
import org.egov.land.calcutaor.FeeTypeCalculationDtoInfo;
import org.egov.land.calcutaor.FeesTypeCalculationDto;
import org.egov.land.service.LandService;
import org.egov.land.util.LandUtil;
import org.egov.land.util.ResponseInfoFactory;
import org.egov.land.web.models.LandInfo;
import org.egov.land.web.models.LandInfoRequest;
import org.egov.land.web.models.LandInfoResponse;
import org.egov.land.web.models.LandSearchCriteria;
import org.egov.land.web.models.RequestInfoWrapper;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1")
public class LandController {
	@Autowired
	FeeTypeCalculationDtoInfo info;
	
	@Autowired
	private LandService landService;

	@Autowired
	private ResponseInfoFactory responseInfoFactory;
	
	@Autowired
	private LandUtil landUtil;
	
	@PostMapping(value = "/land/_create")
	public ResponseEntity<LandInfoResponse> create(@Valid @RequestBody LandInfoRequest landRequest) {
		landUtil.defaultJsonPathConfig();
		LandInfo landInfo = landService.create(landRequest);
		List<LandInfo> landInfos = new ArrayList<LandInfo>();
		landInfos.add(landInfo);
		LandInfoResponse response = LandInfoResponse.builder().landInfo(landInfos)
				.responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(landRequest.getRequestInfo(), true))
				.build();
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	

	@PostMapping(value = "/land/_update")
	public ResponseEntity<LandInfoResponse> update(@Valid @RequestBody LandInfoRequest landRequest) {

		LandInfo landInfo = landService.update(landRequest);
		List<LandInfo> landInfos = new ArrayList<LandInfo>();
		landInfos.add(landInfo);
		LandInfoResponse response = LandInfoResponse.builder().landInfo(landInfos)
				.responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(landRequest.getRequestInfo(), true))
				.build();
		return new ResponseEntity<>(response, HttpStatus.OK);

	}

	@PostMapping(value = "/land/_search")
	public ResponseEntity<LandInfoResponse> search(@Valid @RequestBody RequestInfoWrapper requestInfoWrapper,
			@Valid @ModelAttribute LandSearchCriteria criteria) {

		List<LandInfo> landInfo = landService.search(criteria, requestInfoWrapper.getRequestInfo());
		LandInfoResponse response = LandInfoResponse.builder().landInfo(landInfo)
				.responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(requestInfoWrapper.getRequestInfo(), true))
				.build();
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	

	@GetMapping("/_calculate")
	public FeeTypeCalculationDtoInfo get(@RequestParam("arce") float arce, @RequestParam("feeType") String feeType,
			@RequestParam("potenialZone") String potenialZone, @RequestParam("purposename") String purposename,
			@RequestParam("colonyType") String colonyType) throws FileNotFoundException, IOException, ParseException {

		FeesTypeCalculationDto calculator = Calculator.feesTypeCalculation(arce, feeType, potenialZone, purposename,
				colonyType);
		info.setFeeTypeCalculationDto(calculator);
		return info;
	}
	
}
