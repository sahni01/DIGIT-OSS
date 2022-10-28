import React, { useState, useEffect } from "react";
// import { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { Card, Row, Col } from "react-bootstrap";
// import axios from "axios";
import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
// import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { VALIDATION_SCHEMA } from "../../../../utils/schema/step1";

import ReactMultiSelect from "../../../../../../../react-components/src/atoms/ReactMultiSelect";

const optionsArrList = [
  {
    name: "test",
    label: "K.Mishra",
    value: "01",
    id: "1",
  },
  { name: "test", label: "Developer 1", value: "02", id: "2" },
  { name: "test", label: "Developer 2", value: "03", id: "3" },
];
const optionsVillageList = [
  {
    label: "Balabgarh",
    value: "01",
    id: "1",
  },
  {
    label: "Village",
    value: "02",
    id: "2",
  },
  {
    label: "City",
    value: "03",
    id: "3",
  },
];
const optionsTehsilList = [
  {
    label: "Tehsil 1",
    value: "01",
    id: "1",
  },
  {
    label: "Tehsil 2",
    value: "02",
    id: "2",
  },
  {
    label: "Tehsil 3",
    value: "03",
    id: "3",
  },
];
const optionsDistrictList = [
  {
    label: "District 1",
    value: "01",
    id: "1",
  },
  {
    label: "District 2",
    value: "02",
    id: "2",
  },
  {
    label: "District 3",
    value: "03",
    id: "3",
  },
];
const optionsStateList = [
  {
    label: "State 1",
    value: "01",
    id: "1",
  },
  {
    label: "State 2",
    value: "02",
    id: "2",
  },
  {
    label: "State 3",
    value: "03",
    id: "3",
  },
];
// import { selectAurthorizedUserValuesArray } from "../../Redux/Slicer/Slicer";
// import {setApplicantFormData} from "../../Redux/Slicer/Slicer";
// import { useDispatch } from "react-redux";
const ApllicantFormStep1 = (props) => {
  const [post, setPost] = useState([]);
  const [form, setForm] = useState([]);
  const [developer, setDeveloper] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobile2, setMobile2] = useState("");
  const [email, setEmail] = useState("");
  const [pan, setPan] = useState("");
  const [address, setAddress] = useState("");
  const [village1, setvillage1] = useState("");
  const [pincode, setPincode] = useState("");
  const [tehsil, setTehsil] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [nameOwner, setnameOwner] = useState("");
  const [FormSubmitted, SetFormSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(VALIDATION_SCHEMA),
    shouldFocusError: true,
    // defaultValues,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const aurthorizedUserData = JSON.parse(localStorage.getItem("data_user"));
  // const dispatch = useDispatch();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePanChange = (event) => {
    setPan(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleVillageChange = (event) => {
    setvillage1(event.target.value);
  };
  const handlePinChange = (event) => {
    setPincode(event.target.value);
  };
  const handleNameOwnerChange = (event) => {
    setnameOwner(event.target.value);
  };

  const [employeeName, employeedata] = useState([]);

  const ApplicantFormSubmitHandlerForm = async (e) => {
    console.log("e=====", e);
    return;
    e.preventDefault();
    SetFormSubmitted(true);
    props.Step1Continue({ data: true });
    const forms = {
      developer: developer,
      name: name,
      mobile: mobile,
      mobile2: mobile2,
      email: email,
      pan: pan,
      address: address,
      village1: village1,
      pincode: pincode,
      tehsil: tehsil,
      district: district,
      state: state,
      nameOwner: nameOwner,
    };
    localStorage.setItem("key", JSON.stringify(forms));

    // console.log("FRMDATA",forms);
    // localStorage.setItem('step1', JSON.stringify(forms))
    // form.push(forms)
    // let frmData = JSON.parse(localStorage.getItem('step1') || "[]")
  };
  useEffect(() => {
    if (FormSubmitted) {
      props.ApplicantFormSubmit(true);
    }
  }, [FormSubmitted]);

  useEffect(() => {
    setValue("authorizedPerson", "testing");
  }, []);

  useEffect(() => {
    if (aurthorizedUserData !== undefined && aurthorizedUserData !== null) {
      console.log("authorized user data", aurthorizedUserData.aurthorizedUserInfoArray[0].name);
    }
  }, [aurthorizedUserData]);

  return (
    <form onSubmit={handleSubmit(ApplicantFormSubmitHandlerForm)}>
      <Card style={{ width: "126%", marginLeft: "19px", paddingRight: "10px" }}>
        <Form.Group className="justify-content-center" controlId="formBasicEmail">
          <Row className="ml-auto" style={{ marginBottom: 5 }}>
            <Col md={4} xxl lg="4">
              <div>
                <Form.Label>
                  <b>Developer</b> <span style={{ color: "red" }}>*</span>
                </Form.Label>
              </div>
              <ReactMultiSelect control={control} name="developer" data={optionsArrList} labels="Developer" getSelectedValue={setDeveloper} />
            </Col>
            <Col md={4} xxl lg="4">
              <div>
                <Form.Label>
                  <b>Authorized Person Name </b>
                  <span style={{ color: "red" }}>*</span>
                </Form.Label>
              </div>

              <input type="text" className="form-control" placeholder="N/A" disabled {...register("authorizedPerson")} />
              <h3 className="error-message">{errors?.authorizedPerson && errors?.authorizedPerson?.message}</h3>
            </Col>
            <Col md={4} xxl lg="4">
              <div>
                <Form.Label>
                  <b>Authorized Mobile No1</b> <span style={{ color: "red" }}>*</span>
                </Form.Label>
              </div>
              <Form.Control type="text" className="form-control" placeholder="N/A" {...register("authorizedmobile")} disabled />
              {errors.mobile && <p>Please check the First Name</p>}
            </Col>
          </Row>
          <br></br>
          <Row className="ml-auto" style={{ marginBottom: 5 }}>
            <Col md={4} xxl lg="4">
              <div>
                <Form.Label>
                  <b>Authorized Mobile No 2 </b>
                  <span style={{ color: "red" }}>*</span>
                </Form.Label>
              </div>
              <input type="tel" className="form-control" placeholder="Authorized Mobile No 2" {...register("authorizedmobile")} />
            </Col>
            <Col md={4} xxl lg="4">
              <div>
                <Form.Label>
                  <b>Email ID</b> <span style={{ color: "red" }}>*</span>
                </Form.Label>
              </div>
              <Form.Control type="text" placeholder="N/A" {...register("authorizedEmail")} disabled />
              {errors.email && <p>Please check the First Name</p>}
            </Col>
            <Col md={4} xxl lg="4">
              <div>
                <Form.Label>
                  <b>PAN No </b>
                  <span style={{ color: "red" }}>*</span>
                </Form.Label>
              </div>
              <Form.Control type="text" placeholder="N/A" {...register("authorizedPan")} disabled />
              {errors.pan && <p>Please check the First Name</p>}
            </Col>
          </Row>
          <br></br>
          <Row className="ml-auto" style={{ marginBottom: 5 }}>
            <Col md={4} xxl lg="4">
              <div>
                <Form.Label>
                  <b>Address 1</b> <span style={{ color: "red" }}>*</span>
                </Form.Label>
              </div>
              <Form.Control type="text" placeholder="Address 1" {...register("authorizedAddress")} />
              {errors.address && <p>Please check the First Name</p>}
            </Col>
            <Col md={4} xxl lg="4">
              <div>
                <Form.Label>
                  <b>Village/City </b>
                  <span style={{ color: "red" }}>*</span>
                </Form.Label>
              </div>
              <ReactMultiSelect control={control} name="village" data={optionsVillageList} labels="Village" getSelectedValue={setvillage1} />
            </Col>
            <Col md={4} xxl lg="4">
              <div>
                <Form.Label>
                  <b>Pincode</b> <span style={{ color: "red" }}>*</span>
                </Form.Label>
              </div>
              <Form.Control type="text" placeholder="Pincode" {...register("authorizedPinCode")} />
              {errors.pincode && <p>Please check the First Name</p>}
            </Col>
          </Row>
          <br></br>
          <Row className="ml-auto" style={{ marginBottom: 5 }}>
            <Col md={4} xxl lg="4">
              <div>
                <Form.Label>
                  <b>Tehshil </b>
                  <span style={{ color: "red" }}>*</span>
                </Form.Label>
              </div>
              <ReactMultiSelect control={control} name="tehsil" data={optionsTehsilList} labels="Tehsil" getSelectedValue={setTehsil} />
            </Col>
            <Col md={4} xxl lg="4">
              <div>
                <Form.Label>
                  <b>District</b> <span style={{ color: "red" }}>*</span>
                </Form.Label>
              </div>
              <ReactMultiSelect control={control} name="district" data={optionsDistrictList} labels="District" getSelectedValue={setDistrict} />
            </Col>
            <Col md={4} xxl lg="4">
              <div>
                <Form.Label>
                  <b>State</b> <span style={{ color: "red" }}>*</span>
                </Form.Label>
              </div>
              <ReactMultiSelect control={control} name="state" data={optionsStateList} labels="State" getSelectedValue={setState} />
            </Col>
          </Row>
          <br></br>
          <Row className="ml-auto" style={{ marginBottom: 5 }}>
            <Col md={4} xxl lg="4">
              <div>
                <Form.Label>
                  <b>Status (Individual/ Company/ Firm/ LLP etc.)</b>
                  <span style={{ color: "red" }}>*</span>
                </Form.Label>
              </div>
              <Form.Control type="text" disabled readOnly />
            </Col>
            <Col md={4} xxl lg="4">
              <div>
                <Form.Label style={{ marginTop: "15" }}>
                  <b>LC-I signed by </b>
                  <span style={{ color: "red" }}>*</span>
                </Form.Label>
              </div>
              <Form.Control type="text" disabled readOnly />
            </Col>
            <Col md={4} xxl lg="4">
              <div>
                <Form.Label>
                  <b>Address for communication</b> <span style={{ color: "red" }}>*</span>
                </Form.Label>
              </div>
              <Form.Control type="text" disabled readOnly />
            </Col>
          </Row>
          <br></br>
          <Row className="ml-auto" style={{ marginBottom: 5 }}>
            <Col md={4} xxl lg="4">
              <div>
                <Form.Label>
                  <b>Permanent address in case of individual/ registered office address in case other than individual</b>
                  <span style={{ color: "red" }}>*</span>
                </Form.Label>
              </div>
              <Form.Control type="text" disabled readOnly />
            </Col>
            <Col md={4} xxl lg="4">
              <div>
                <Form.Label>
                  <b>If LC-I is not signed by self (in case of an individual) nature of authorization (GPA/SPA)</b>
                  <span style={{ color: "red" }}>*</span>
                </Form.Label>
              </div>
              <Form.Control type="text" disabled readOnly />
            </Col>
            <Col md={4} xxl lg="4" style={{ marginTop: 23 }}>
              <div>
                <Form.Label>
                  <b>Email ID for communication</b>
                  <span style={{ color: "red" }}>*</span>
                </Form.Label>
              </div>
              <Form.Control type="text" disabled readOnly />
            </Col>
          </Row>
          <br></br>
          <Row className="ml-auto" style={{ marginBottom: 5 }}>
            <div className="col col-4">
              <div>
                <Form.Label>
                  <b>Name of the authorized person to sign the application</b>
                  <span style={{ color: "red" }}>*</span>
                  <i className="fa fa-info-circle-fill" />
                </Form.Label>
              </div>
              <Form.Control type="text" disabled readOnly />
            </div>
            {/* <Col md={4} xxl lg="4">
                            <div>
                                <Form.Label><b>Name of individual Land owner/ land-owning company/ firm/ LLP etc.</b> <span style={{ color: "red" }}>*</span></Form.Label>
                            </div>
                            <Form.Control type="text"  pattern="[A-Za-z]*" minLength={4}
                                onChange={(e) => setnameOwner(e.target.value)} value={nameOwner} onChange1={handleNameOwnerChange} />
                            {errors.nameOwner && <p></p>}
                        </Col> */}
          </Row>
        </Form.Group>
        {/* <Button 
                    style={{ alignSelf: "center", marginTop: "25px",marginLeft:"-1249px" }} 
                    variant="primary" type="submit" 
                    >
              Back
            </Button> */}
        <Button
          type="submit"
          style={{ alignSelf: "center", marginTop: "-35px", marginLeft: "1163px" }}
          variant="primary"
          // onClick={ApplicantFormSubmitHandlerForm}
        >
          Continue
        </Button>
      </Card>
    </form>
  );
};

export default ApllicantFormStep1;
