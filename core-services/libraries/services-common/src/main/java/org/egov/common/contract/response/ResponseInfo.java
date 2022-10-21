package org.egov.common.contract.response;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
public class ResponseInfo {

    private String apiId;

    private String ver;

    private Date ts;

    private String resMsgId;

    private String msgId;

    private String status;
    
    private String parentId;
}