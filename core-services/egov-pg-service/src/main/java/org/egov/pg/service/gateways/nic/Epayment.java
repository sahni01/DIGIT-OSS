package org.egov.pg.service.gateways.nic;

import java.util.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class Epayment {
	private String applicationNumber;
	private String txnId;
	private String status;
	private String validUpto;
	private String paymentType;
	private String amount;
	private String cin;
	private String bankCode;
	private String transactionDate;
	
}
