package org.egov.land.abm.service;

import java.util.List;

import org.egov.land.abm.newservices.entity.NewServiceInfo;
import org.egov.land.abm.repo.NewServiceInfoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NewServiceInfoService {

	@Autowired
	NewServiceInfoRepo newServiceInfoRepo;
	private long id = 1;

	public NewServiceInfo createNewServic(NewServiceInfo newServiceInfo) {
		return newServiceInfoRepo.save(newServiceInfo);
	}

	public NewServiceInfo getNewServicesInfo(Long id) {

		NewServiceInfo newServiceInfo = newServiceInfoRepo.getOne(id);
		return newServiceInfo;
	}

	public List<NewServiceInfo> getNewServicesInfoAll() {

		return newServiceInfoRepo.findAll();
	}

	public List<String> getApplicantsNumber() {
		
		return this.newServiceInfoRepo.getApplicantsNumber();
	}
}
