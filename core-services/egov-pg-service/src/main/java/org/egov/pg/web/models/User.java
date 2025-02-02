package org.egov.pg.web.models;

import lombok.*;

import javax.validation.constraints.NotNull;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    private String uuid;

    @NotNull
    private String name;

    private String userName;

    @NotNull
    private String mobileNumber;

    private String emailId;
    private String cityName;
    private String address;
    private String pinCode;

    @NotNull
    private String tenantId;

    public User(org.egov.common.contract.request.User user) {
        this.uuid = user.getUuid();
        this.name = user.getName();
        this.userName = user.getUserName();
        this.mobileNumber = user.getMobileNumber();
        this.emailId = user.getEmailId();
        this.tenantId = user.getTenantId();
        this.cityName = user.getCityName();
        this.address = user.getAddress();
        this.pinCode=user.getPinCode();
    }

}
