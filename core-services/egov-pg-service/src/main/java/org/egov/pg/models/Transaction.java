package org.egov.pg.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.*;
import org.egov.pg.constants.TransactionAdditionalFields;
import org.egov.pg.web.models.User;
import org.hibernate.validator.constraints.SafeHtml;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Map;

/**
 * Transaction object representing a transaction
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Transaction {

    @SafeHtml
    @JsonProperty("tenantId")
    @NotNull
    @Size(min = 2, max = 50)
    private String tenantId;

    /**
     * Transaction Amount, preferably rounded off to two decimal places
     */
    @SafeHtml
    @JsonProperty("txnAmount")
    @NotNull
    @Size(min = 1)
    private String txnAmount;

    /**
     * Unique bill ID associated with the transaction
     */
    @SafeHtml
    @JsonProperty("billId")
    @NotNull
    @Size(min = 1)
    private String billId;


    /**
     * Backward compatibility
     */
    @SafeHtml
    @JsonProperty("module")
    @Size(min = 1)
    private String module;

    /**
     * Backward compatibility
     */
    @SafeHtml
    @JsonProperty("consumerCode")
    @NotNull
    @Size(min = 1, max = 128)
    private String consumerCode;


    /**
     * Unique bill ID associated with the transaction
     */
    @JsonProperty("taxAndPayments")
    @NotNull
    @Size(min = 1)
    private List<TaxAndPayment> taxAndPayments;


    /**
     * Brief description for which the payment is being made
     * ex, Property Tax Payment for FY-YYYY
     */
    @SafeHtml
    @JsonProperty("productInfo")
    @NotNull
    @Size(min = 1, max = 512)
    private String productInfo;

    /**
     * Gateway to be used to perform this transaction
     * Should be among the list of valid & active gateways returned by API
     */
    @SafeHtml
    @JsonProperty("gateway")
    @NotNull
    @Size(min = 2)
    private String gateway;

    /**
     * Callback URL to which control has to be redirected to by payment gateway
     *
     */
    @JsonProperty("callbackUrl")
    @NotNull
    @Size(min = 2)
    private String callbackUrl;

    /**
     * Generated by the app, after transaction is initiated
     */
    @JsonProperty("txnId")
    private String txnId;


    @JsonProperty("user")
    @NotNull
    @Valid
    private User user;

    @JsonProperty("redirectUrl")
    private String redirectUrl;

    /**
     * Represents the current status of a transaction
     */
    @JsonProperty("txnStatus")
    private TxnStatusEnum txnStatus;

    /**
     * Brief status message for the transaction
     */
    @JsonProperty("txnStatusMsg")
    private String txnStatusMsg;

    /**
     * Transaction ID, returned by the payment gateway
     */
    @JsonProperty("gatewayTxnId")
    private String gatewayTxnId;

    /**
     * Mode of payment, as returned by the payment gateway
     */
    @JsonProperty("gatewayPaymentMode")
    private String gatewayPaymentMode;

    /**
     * Payment Gateway Specific RAW status code
     */
    @JsonProperty("gatewayStatusCode")
    private String gatewayStatusCode;

    /**
     * Payment Gateway Specific RAW status message
     */
    @JsonProperty("gatewayStatusMsg")
    private String gatewayStatusMsg;

    /**
     * Receipt code of the receipt generated for this transaction
     */
    @JsonProperty("receipt")
    private String receipt;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

    @JsonProperty("additionalDetails")
    private Object additionalDetails;
    
    //--------------------nic detail----------------//
    @JsonProperty("officeName")
    private String officeName;
    
    private String challanYear;
    
    private String remarks;
    private String ApplicationNumber;
    private String securityEmail;
    
    private String securityPhone;
    private String validUpto;
    private String schemeCount;
    private Map<String,String> schemeName;
    private Map<String,String> feeamount;
    
    //----------------nic detail end-------------------//

    /**
     * Entire RAW payment gateway response
     */
    @JsonIgnore
    private Object responseJson;

    @JsonIgnore
    private Map<TransactionAdditionalFields, Object> additionalFields;

    /**
     * Current status of the transaction
     */
    public enum TxnStatusEnum {
        SUCCESS("SUCCESS"),

        FAILURE("FAILURE"),

        PENDING("PENDING");

        private String value;

        TxnStatusEnum(String value) {
            this.value = value;
        }

        @JsonCreator
        public static TxnStatusEnum fromValue(String text) {
            for (TxnStatusEnum b : TxnStatusEnum.values()) {
                if (String.valueOf(b.value).equals(text)) {
                    return b;
                }
            }
            return null;
        }

        @Override
        @JsonValue
        public String toString() {
            return String.valueOf(value);
        }
    }

}
