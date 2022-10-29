package org.egov.pg.service.gateways.nic;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ManualPayment {
	private String applicationNumber;
	private String txnId;
	private String status;
	private String validUpto;
	private String paymentType;

}
