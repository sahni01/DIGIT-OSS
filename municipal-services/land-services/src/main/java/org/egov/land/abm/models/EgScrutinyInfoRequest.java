package org.egov.land.abm.models;

import org.egov.common.contract.request.RequestInfo;
import org.egov.land.abm.newservices.entity.EgScrutiny;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EgScrutinyInfoRequest {
	
@JsonProperty("RequestInfo")
	private RequestInfo requestInfo ;
@JsonProperty("EgScrutiny")
	private EgScrutiny egScrutiny;
}
