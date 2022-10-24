package org.egov.user.avm.developer.entity;

import javax.validation.constraints.NotNull;

import org.egov.common.contract.request.RequestInfo;
import org.egov.user.web.contract.UserRequest;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class CreateDeveloperRegRequest {

	private RequestInfo requestInfo;
	
	@JsonProperty("developerRegistration")
	private DeveloperRegistration developerRegistration;
}
