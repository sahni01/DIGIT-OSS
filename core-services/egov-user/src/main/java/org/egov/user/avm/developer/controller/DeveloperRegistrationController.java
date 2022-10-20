package org.egov.user.avm.developer.controller;

import static org.apache.commons.lang3.StringUtils.isEmpty;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.egov.common.contract.request.RequestInfo;
import org.egov.tracer.model.CustomException;
import org.egov.user.avm.developer.dto.UserDeveloperDto;
import org.egov.user.avm.developer.entity.AddRemoveAuthoizedUsers;
import org.egov.user.avm.developer.entity.DeveloperInfo;
import org.egov.user.avm.developer.entity.DeveloperRegistration;
import org.egov.user.avm.developer.entity.Developerdetail;
import org.egov.user.avm.developer.repo.DeveloperRegistrationRepo;
import org.egov.user.avm.developer.services.DeveloperRegistrationService;
import org.egov.user.domain.model.User;
import org.egov.user.domain.model.enums.UserType;
import org.egov.user.domain.service.UserService;
import org.egov.user.web.contract.CreateUserRequest;
import org.egov.user.web.contract.UserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;


@RestController
@RequestMapping("/developer")
public class DeveloperRegistrationController {

	
	@Autowired DeveloperRegistrationService developerRegistrationService;
	@Autowired DeveloperRegistrationRepo developerRegistrationRepo;
	@Autowired UserService userService;
	@Autowired private RestTemplate restTemplate;
	
	@PostMapping("/_registration")
	public DeveloperRegistration createDeveloperRegistraion(@RequestBody DeveloperRegistration developerRegistration) throws JsonProcessingException {

		DeveloperRegistration developerRegistration1 = developerRegistrationService.addDeveloperRegistraion(developerRegistration); 

		Long devId=developerRegistration1.getId();
		UserRequest userRequest ;
		
		for(int i =0;i<developerRegistration1.getDeveloperDetail().size();i++) {				
			for(int j =0; j<developerRegistration1.getDeveloperDetail().get(i).getDevDetail().getAddRemoveAuthoizedUsers().size();j++ ) {
				
				userRequest = new UserRequest();
				
				CreateUserRequest createUserRequest = new CreateUserRequest();
				RequestInfo requestInfo = new RequestInfo();
				requestInfo.setApiId("1");
				requestInfo.setVer("1");
				requestInfo.setDid("");
				requestInfo.setAction("_create");
				requestInfo.setAuthToken("null");
				createUserRequest.setRequestInfo(requestInfo);
				
				userRequest = developerRegistration1.getDeveloperDetail().get(i).getDevDetail().getAddRemoveAuthoizedUsers().get(j);
				
				createUserRequest.setUser(userRequest);
				createUserRequest.getUser().setParentid(devId);
				
				User user = createUserRequest.toDomain(true);
				System.out.println("dev Id ======> " + devId);
				
				userService.createUser(user, requestInfo);
				 
			}
		}
		return developerRegistration1;
		
	}
	
	@GetMapping("/_getAuthorizedUser")
	public UserDeveloperDto viewAuthorizedUserDetail(@RequestParam("mobileNumber") String mobileNumber) {
		
		//String mobileNumber = "";
		UserDeveloperDto userDeveloperDto = new UserDeveloperDto();
		
		User user = userService.getAuthorizedUser(mobileNumber);
		if(!user.equals(null) && user.getParentid()!=null) {
			Long parentId = user.getParentid();
			DeveloperRegistration developerRegistration = developerRegistrationRepo.findById(parentId);
			userDeveloperDto.setUser(user);
			userDeveloperDto.setDeveloperRegistration(developerRegistration);
		}
		return userDeveloperDto;
	}
	
	@GetMapping("/token")
	public Object getToken() {
		
		String password = "";
		User user = new User();
		user.setUsername("rahul7");
		user.setTenantId("hr");
		user.setType(UserType.CITIZEN);
		
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
			headers.set("Authorization", "Basic ZWdvdi11c2VyLWNsaWVudDo=");
			MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
			map.add("username", user.getUsername());
			if (!isEmpty(password))
				map.add("password", password);
			else
				map.add("password", user.getPassword());
			map.add("grant_type", "password");
			map.add("scope", "read");
			map.add("tenantId", user.getTenantId());
			map.add("isInternal", "true");
			map.add("userType", UserType.CITIZEN.name());

			HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(map,
					headers);
			//return restTemplate.postForEntity("localhost:8086" + "/user/oauth/token", request, Map.class).getBody();
			return request;

		} catch (Exception e) {
			//log.error("Error occurred while logging-in via register flow", e);
			throw new CustomException("LOGIN_ERROR",
					"Error occurred while logging in via register flow: " + e.getMessage());
		}
	
		
	}

	
	public DeveloperRegistration createDeveloperRegistraionWithUser(@RequestBody DeveloperInfo developerInfo) throws JsonProcessingException {
		
		System.out.println("Request Info : " + developerInfo.getDeveloperRegistration().getDeveloperDetail().size());
		
		System.out.println("Registration Api.."+ developerInfo.getDeveloperRegistration().getDeveloperDetail().get(0).getDevDetail().getAddRemoveAuthoizedUsers().size());
		//DeveloperRegistration insertedDeveloper = this.developerRegistrationService.addDeveloperRegistraion(developerRegistration);
		List<User> userList = this.developerRegistrationService.setUserInfo(developerInfo.getDeveloperRegistration(),developerInfo.getRequestInfo());
		
		//User createdUser = userService.createCitizen(user, createUserRequest.getRequestInfo());
		return developerRegistrationService.addDeveloperRegistraion(developerInfo.getDeveloperRegistration());
		//return null;
		
	}
	
	
	
	@GetMapping("/_searchall")
	public List<DeveloperRegistration> searchDeveloperRegistraion(){
		
		
		System.out.println("Searching api..");
		return this.developerRegistrationService.findAllDeveloperDetail();
		
	}
	
	@GetMapping("/_get")
	public DeveloperRegistration getById(@RequestParam(value = "id") Long id) {
		System.out.println("Developer Id : " + id);
		return developerRegistrationService.getById(id);
		
	}
	
	
	public Developerdetail getAuthorizeUser() {
		
		Developerdetail d = developerRegistrationRepo.findAuthorizedUser("12312312");
		System.out.println("user : " + d.getVersion());
		return d;
	}
	
	@PostMapping("/_create")
	public DeveloperRegistration createDeveloperRegistraion1(@RequestBody DeveloperRegistration developerRegistration) throws JsonProcessingException {
		
		//System.out.println("Request Info : " + developerInfo.getDeveloperRegistration().getDeveloperDetail().size());
		
		System.out.println("Registration Api..");
		//DeveloperRegistration insertedDeveloper = this.developerRegistrationService.addDeveloperRegistraion(developerRegistration);
		//List<User> userList = this.developerRegistrationService.setUserInfo(developerRegistration);
		
		//User createdUser = userService.createCitizen(user, createUserRequest.getRequestInfo());
		return developerRegistrationService.addDeveloperRegistraion(developerRegistration);
		//return null;
		
	}
		
		

	
}
