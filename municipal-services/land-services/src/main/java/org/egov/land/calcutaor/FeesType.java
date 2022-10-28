package org.egov.land.calcutaor;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
class FeesType {

	private float scrutinyFeeCharges;
	private float licenseFeeCharges;
	private float conversionCharges;
	private float externalDevelopmentCharges;
	private float stateInfrastructureDevelopmentCharges;
	private  List<Float> farValue;
}
