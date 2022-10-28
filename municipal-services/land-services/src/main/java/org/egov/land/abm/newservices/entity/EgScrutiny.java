package org.egov.land.abm.newservices.entity;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Time;

/**
 * The persistent class for the eg_scrutiny database table.
 * 
 */
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "eg_scrutiny")
@NamedQuery(name = "EgScrutiny.findAll", query = "SELECT e FROM EgScrutiny e")
public class EgScrutiny implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name = "EG_SCRUTINY_ID_GENERATOR", sequenceName = "EG_SCRUTINY_SEQ")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "EG_SCRUTINY_ID_GENERATOR")

	@JsonProperty("id")
	private Integer id;

	@Column(name = "application_id")
	@JsonProperty("applicationId")
	private Integer applicationId;

	@JsonProperty("comment")
	private String comment;

	@Column(name = "created_on")
	@JsonProperty("createdOn")
	private Time createdOn;

	@Column(name = "field_value")
	@JsonProperty("fieldValue")
	private String fieldValue;

	@Column(name = "\"field-d\"")
	@JsonProperty("field_d")
	private Integer field_d;

	@Column(name = "is_approved")
	@JsonProperty("isApproved")
	private Boolean isApproved;

	@JsonProperty("userid")
	private Integer userid;

}