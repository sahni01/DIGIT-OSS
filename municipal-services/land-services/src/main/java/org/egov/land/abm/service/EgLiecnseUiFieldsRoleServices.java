package org.egov.land.abm.service;

import org.egov.land.abm.models.EgLiecnseUiFieldsRoleRequest;
import org.egov.land.abm.newservices.entity.EgLiecnseUiFieldsRole;
import org.egov.land.abm.repo.EgLiecnseUiFieldsRoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EgLiecnseUiFieldsRoleServices {

	@Autowired EgLiecnseUiFieldsRoleRepo egLiecnseUiFieldsRoleRepo;
	
	public EgLiecnseUiFieldsRole create(EgLiecnseUiFieldsRoleRequest egLiecnseUiFieldsRoleRequest) {
		//egLiecnseUiFieldsRoleRepo.
		return this.egLiecnseUiFieldsRoleRepo.save(egLiecnseUiFieldsRoleRequest.getEgLiecnseUiFieldsRole());
	}
}
