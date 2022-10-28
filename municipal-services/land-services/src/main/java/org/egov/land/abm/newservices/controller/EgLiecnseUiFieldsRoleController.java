package org.egov.land.abm.newservices.controller;

import java.util.ArrayList;
import java.util.List;

import org.egov.land.abm.models.EgLiecnseUiFieldsRoleRequest;
import org.egov.land.abm.models.EgLiecnseUiFieldsRoleResponse;
import org.egov.land.abm.newservices.entity.EgLiecnseUiFieldsRole;
import org.egov.land.abm.service.EgLiecnseUiFieldsRoleServices;
import org.egov.land.util.ResponseInfoFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/EgLiecnseUiFieldsRoleRequest")
public class EgLiecnseUiFieldsRoleController {

	@Autowired
	private ResponseInfoFactory responseInfoFactory;
	@Autowired EgLiecnseUiFieldsRoleServices egLiecnseUiFieldsRoleServices;
	
	@PostMapping("/_create")
	public ResponseEntity<EgLiecnseUiFieldsRoleResponse> create(@RequestBody EgLiecnseUiFieldsRoleRequest egLiecnseUiFieldsRoleRequest) {
		
		EgLiecnseUiFieldsRole egLiecnseUiFieldsRole = egLiecnseUiFieldsRoleServices.create(egLiecnseUiFieldsRoleRequest);
		List<EgLiecnseUiFieldsRole> egLiecnseUiFieldsRoleList = new ArrayList<>();
		egLiecnseUiFieldsRoleList.add(egLiecnseUiFieldsRole);
		
		EgLiecnseUiFieldsRoleResponse egLiecnseUiFieldsRoleResponse = EgLiecnseUiFieldsRoleResponse.builder().egLiecnseUiFieldsRole(egLiecnseUiFieldsRoleList).
				responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(egLiecnseUiFieldsRoleRequest.getRequestInfo(), true)).build();
				
		
		return new ResponseEntity<>(egLiecnseUiFieldsRoleResponse, HttpStatus.OK);
	}
}
