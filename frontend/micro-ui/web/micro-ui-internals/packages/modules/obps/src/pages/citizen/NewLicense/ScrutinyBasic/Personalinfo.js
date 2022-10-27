import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Card, Row, Col } from "react-bootstrap";
// import * as Icon from "react-bootstrap-icons";
// import { XCircleFill } from "react-bootstrap-icons";
// import { CheckCircleFill } from "react-bootstrap-icons";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
// import BootstrapSwitchButton from "bootstrap-switch-button-react";
// import Alert from "react-bootstrap/Alert";
// import ToggleButton from "react-toggle-button";
import Toggle from "react-toggle";
import "react-toggle/style.css";
// import WarningIcon from "@material-ui/icons/Warning";

import LicenseDetailsScrutiny from "../ScrutinyBasic/Developer/LicenseDetailsScrutiny";

import Collapse from "react-bootstrap/Collapse";
import Modal from "react-bootstrap/Modal";
import ModalChild from "./Remarks/ModalChild";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const Personalinfo = (props) => {
  const [uncheckedValue, setUncheckedVlue] = useState([]);
  const [checkValue, setCheckedVAlue] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [messege, setMessege] = useState("");
  const [developerLabel, setDeveloperLabel] = useState(true);
  const [show, setshow] = useState(false);
  const [show3, setshow3] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [noChecked, setNochecked] = useState(true);
  const [warningOrred, setwarningOrred] = useState("#ffcf33");
  const [color, setColor] = useState({ yes: false, no: false });
  const [smShow2, setSmShow2] = useState(false);
  const [smShow3, setSmShow3] = useState(false);
  const [labelValue, setLabelValue] = useState("");
  const [modaldData, setmodaldData] = useState({ label: "", Remarks: "" });
  const [isyesOrNochecked, setYesorNochecked] = useState(true);

  const handlemodaldData = (data) => {
    setmodaldData(data.data);
    setSmShow(false);
  };

  const handleYesOrNochecked = (data) => {
    setYesorNochecked(data.data);
  };
  const handlemodalsubmit = () => {
    console.log("here");
    const filteredObj = uncheckedValue.filter((obj) => {
      return obj.label == modaldData.label;
    });

    if (isyesOrNochecked === false) {
      if (modaldData.label !== "" || modaldData.Remarks !== "") {
        // if (filteredObj.length === 0) {
        setUncheckedVlue((prev) => [...prev, modaldData]);
        // }
      }
    } else {
      if (modaldData.label !== "" || modaldData.Remarks !== "") {
        // if (filteredObj.length === 0) {
        setCheckedVAlue((prev) => [...prev, modaldData]);
        // }
      }
    }
  };
  useEffect(() => {
    console.log("called");
    handlemodalsubmit();
  }, [modaldData.Remarks]);
  useEffect(() => {
    props.passUncheckedList({ data: uncheckedValue });
  }, [uncheckedValue]);

  useEffect(() => {
    props.passCheckedList({ data: checkValue });
  }, [checkValue]);
  console.log("unchecked values", uncheckedValue);

  console.log(uncheckedValue.indexOf("developer"));

  const developerInputFiledColor = modaldData.label === "developer" ? modaldData.color : { data: "#FFB602" };

  const developerInputFiledColor1 = modaldData.label === "Authorized Person Name" ? modaldData.color : { data: "#FFB602" }; //change the white color to default color
  const developerInputFiledColor3 = modaldData.label === "Authorized MobileNo. 2" ? modaldData.color : { data: "#FFB602" };
  const developerInputFiledColor4 = modaldData.label === "Email ID" ? modaldData.color : { data: "#FFB602" };
  const developerInputFiledColor5 = modaldData.label === "PAN No." ? modaldData.color : { data: "#FFB602" };
  const developerInputFiledColor6 = modaldData.label === "Address 1" ? modaldData.color : { data: "#FFB602" };
  const developerInputFiledColor7 = modaldData.label === "Village/City" ? modaldData.color : { data: "#FFB602" };
  const developerInputFiledColor2 = modaldData.label === "Authorized Mobile No" ? modaldData.color : { data: "#FFB602" };
  const developerInputFiledColor8 = modaldData.label === "Pincode" ? modaldData.color : { data: "#FFB602" };
  const developerInputFiledColor9 = modaldData.label === "Tehsil" ? modaldData.color : { data: "#FFB602" };
  const developerInputFiledColor10 = modaldData.label === "District" ? modaldData.color : { data: "#FFB602" };
  const developerInputFiledColor11 = modaldData.label === "State" ? modaldData.color : { data: "#FFB602" };
  const developerInputFiledColor12 = modaldData.label === "Status (Individual/ Company/ Firm/ LLP etc.)" ? modaldData.color : { data: "#FFB602" };
  const developerInputFiledColor13 = modaldData.label === "LC-I signed by" ? modaldData.color : { data: "#FFB602" };
  const developerInputFiledColor14 =
    modaldData.label === "If LC-I is not signed by self (in case of an individual) nature of authorization (GPA/SPA)"
      ? modaldData.color
      : { data: "#FFB602" };
  const developerInputFiledColor15 =
    modaldData.label === "Permanent address in case of individual/ registered office address in case other than individual"
      ? modaldData.color
      : { data: "#FFB602" };
  const developerInputFiledColor16 = modaldData.label === "Address for communication" ? modaldData.color : { data: "#FFB602" };
  const developerInputFiledColor17 =
    modaldData.label === "Name of the authorized person to sign the application" ? modaldData.color : { data: "#FFB602" };
  const developerInputFiledColor18 = modaldData.label === "Email ID for communication" ? modaldData.color : { data: "#FFB602" };
  const developerInputFiledColor19 =
    modaldData.label === "Name of individual Land owner/ land-owning company/ firm/ LLP etc." ? modaldData.color : { data: "#FFB602" };

  console.log("color for the deeloper", developerInputFiledColor);

  return (
    <Form
      ref={props.personalInfoRef}
      // style={{
      //   width: "100%",
      //   height: props.heightPersonal,
      //   overflow: "hidden",
      //   marginBottom: 20,
      //   borderColor: "#C3C3C3",
      //   borderStyle: "solid",
      //   borderWidth: 2,
      // }}
    >
      {/* <Alert variant="warning">{messege}</Alert> */}
      <div>
        <Col class="col-12">
          <Button
            style={{
              marginBottom: 3,
              width: "inherit",
              textAlign: "inherit",
              padding: "0.25rem 1rem",
              fontWeight: "Bold",
              backgroundColor: "#c2c4c7",
              border: "none",
              color: "unset",
            }}
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            Applicant info
            <AddIcon style={{ width: "67em" }}></AddIcon>
          </Button>
        </Col>
      </div>

      {/* <div style={{ width:"100%" , height:40, padding:2,}}>
    <Button onClick={() =>props.Personalinfo({data:true})} style={{ width:"100%" , height:"100%"}}>Step-1</Button>
    </div> */}
      {/* <Card
        style={{
          width: "100%",
          height: props.heightPersonal,
          overflow: "hidden",
          marginBottom: 20,
          borderColor: "#C3C3C3",
          borderStyle: "solid",
          borderWidth: 2,
          padding: 2,
        }}
      > */}
      <Collapse in={open}>
        <div id="example-collapse-text">
          <div>
            <Col class="col-12">
              <Button
                style={{
                  marginBottom: 3,
                  width: "inherit",
                  textAlign: "inherit",
                  padding: "0.25rem 1rem",
                  fontWeight: "Bold",
                  backgroundColor: "#c2c4c7",
                  border: "none",
                  color: "unset",
                }}
                onClick={() => setOpen2(!open2)}
                aria-controls="example-collapse-text"
                aria-expanded={open2}
              >
                Personal info
                <AddIcon style={{ width: "67.6em" }}></AddIcon>
              </Button>
            </Col>
          </div>

          {/* </div>
      </Collapse> */}
          <Collapse in={open2}>
            <div id="example-collapse-text">
              <Form.Group style={{ display: props.displayPersonal }} className="justify-content-center">
                <Row className="ms-auto" style={{ marginBottom: 20 }}>
                  <Col className="ms-auto" md={4} xxl lg="4">
                    <div>
                      <Form.Label>
                        <b>Developer</b>
                      </Form.Label>
                      <span style={{ color: "red" }}>*</span> &nbsp;&nbsp;
                    </div>
                    <div style={{ display: "flex" }}>
                      <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} readOnly></Form.Control>
                      <ReportProblemIcon
                        style={{
                          color: developerInputFiledColor.data,
                        }}
                        onClick={() => {
                          setLabelValue("developer"), setSmShow(true), console.log("modal open");
                        }}
                      ></ReportProblemIcon>
                      <ModalChild
                        labelmodal={labelValue}
                        passmodalData={handlemodaldData}
                        isYesorNoChecked={handleYesOrNochecked}
                        displaymodal={smShow}
                        setColor={setColor}
                      ></ModalChild>
                      {/* <BootstrapSwitchButton
                        checked={true}
                        onlabel="Yes"
                        offlabel="No"
                        onstyle="success"
                        offstyle="danger"
                        width={30}
                        padding={5}
                        height={10}
                        onChange={(e) => {
                          console.log(e);
                          !e && uncheckedValue.indexOf("Developer") === -1
                            ? setUncheckedVlue((prev) => [...prev, "Developer"])
                            : setUncheckedVlue((prev) => prev.filter((elm) => elm !== "Developer"));
                        }}
                      /> */}
                      {/* <Toggle className="react-toggle" onChange={(e) => console.log(e)} /> */}
                      {/* <Toggle
                        defaultChecked={this.state.baconIsReady}
                        defaultChecked={true}
                        icons={false}
                        onChange={
                          (e) => {
                            console.log(e.target.checked);
                          }
                          console.log(e);
                        }
                      /> */}

                      {/* onstyle="success" offstyle="danger" onClick={() => setShow(!show)} */}

                      {/* <ToggleButton type="radio"></ToggleButton> */}
                    </div>

                    {/* <Modal size="sm" show={smShow} onHide={() => setSmShow(false)} aria-labelledby="example-modal-sizes-title-sm">
                      <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-sm">Developer</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {" "}
                        <Form.Check
                          value="Developer"
                          onChange={(e) => {
                            setCrosschecked(""), setNochecked(false), setwarningOrred("#09cb3d");
                          }}
                          type="radio"
                          id="default-radio"
                          // label={<CheckCircleIcon color="success"></CheckCircleIcon>}
                          label="Yes"
                          name="group0"
                          inline
                        ></Form.Check>
                        <Form.Check
                          onChange={(e) => {
                            setCrosschecked(e.target.value), setNochecked(true), setwarningOrred("#ff0000");
                          }}
                          value="Developer"
                          type="radio"
                          id="default-radio"
                          // label={<CancelIcon color="error" />}
                          label="No"
                          name="group0"
                          inline
                        ></Form.Check>
                        <Col xs={8} md={4}>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Remarks</Form.Label>
                            <Form.Control type="text" placeholder="" autoFocus onChange={(e) => setDeveloperRemarks(e.target.value)} />
                          </Form.Group>
                        </Col>
                        <div class="col-md-4 bg-light text-right" style={{ position: "relative", marginBottom: 40 }}>
                          <Button style={{ textAlign: "right" }} onClick={handlemodalsubmit}>
                            Submit
                          </Button>
                        </div>
                      </Modal.Body>
                    </Modal> */}
                    {/* <Form.Check
                  value="Developer"
                  type="radio"
                  id="default-radio"
                  
                  label={<CheckCircleIcon color="success"></CheckCircleIcon>}
                  name="group0"
                  inline
                ></Form.Check>
                <Form.Check
                  onChange={(e) => setUncheckedVlue((prev) => [...prev, e.target.value])}
                  value="Developer"
                  type="radio"
                  id="default-radio"
                 
                  label={<CancelIcon color="error" />}
                  name="group0"
                  inline
                ></Form.Check> */}

                    {/* <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="customSwitches" />
                  <label class="custom-control-label" for="customSwitches"></label>
                </div>
                <label class="switch">
                  <input type="checkbox" />
                  <span class="slider"></span>
                </label>
                <div class="checkbox">
                  <label>
                    <input type="checkbox" data-toggle="toggle" />
                    Option one is enabled
                  </label>
                </div> */}
                  </Col>
                  <Col className="ms-auto" md={4} xxl lg="4">
                    <Form.Label>
                      <b>Authorized Person Name</b>
                    </Form.Label>
                    <span style={{ color: "red" }}>*</span> &nbsp;&nbsp;
                    <div style={{ display: "flex" }}>
                      <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} readOnly></Form.Control>
                      <ReportProblemIcon
                        style={{
                          color: developerInputFiledColor1.data,
                        }}
                        onClick={() => {
                          setLabelValue("Authorized Person Name"), setSmShow(true), console.log("modal open");
                        }}
                      ></ReportProblemIcon>
                    </div>
                    {/* <Form.Check
                      value="Authorized Person Name"
                      type="radio"
                      id="default-radio"
                      // label={<AiFillCheckCircle class="fa fa-check text-success" size={18}></AiFillCheckCircle>}
                      label={<CheckCircleIcon color="success"></CheckCircleIcon>}
                      name="group1"
                      inline
                    ></Form.Check>
                    <Form.Check
                      onChange={(e) => setUncheckedVlue((prev) => [...prev, e.target.value])}
                      value="Authorized Person Name"
                      type="radio"
                      id="default-radio"
                      // label={<AiFillCloseCircle class="fa fa-times text-danger" size={18}></AiFillCloseCircle>}
                      label={<CancelIcon color="error" />}
                      name="group1"
                      inline
                    ></Form.Check> */}
                  </Col>
                  <Col className="ms-auto" md={4} xxl lg="4">
                    <div>
                      <Form.Label>
                        <b>Authorized Mobile No</b>
                      </Form.Label>
                      <span style={{ color: "red" }}>*</span> &nbsp;&nbsp;
                      {/* <ReportProblemIcon style={{ color: warningOrred }} onClick={() => setSmShow(true)}></ReportProblemIcon> */}
                    </div>

                    {/* <Form.Check
                      value="Authorized Mobile No"
                      type="radio"
                      id="default-radio"
                      //  label={<AiFillCheckCircle class="fa fa-check text-success" size={18}></AiFillCheckCircle>}
                      label={<CheckCircleIcon color="success"></CheckCircleIcon>}
                      name="group2"
                      inline
                    ></Form.Check>
                    <Form.Check
                      onChange={(e) => setUncheckedVlue((prev) => [...prev, e.target.value])}
                      value="Authorized Mobile No"
                      type="radio"
                      id="default-radio"
                      //  label={<AiFillCloseCircle class="fa fa-times text-danger" size={18}></AiFillCloseCircle>}
                      label={<CancelIcon color="error" />}
                      name="group2"
                      inline
                    ></Form.Check> */}

                    {/*  <div style={{ display: "flex" }}>
                      <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} readOnly></Form.Control>
                      <ReportProblemIcon
                        style={{
                          color: "black",
                        }}
                        onClick={() => {
                          setLabelValue("developer"), setSmShow(true), console.log("modal open");
                        }}
                      ></ReportProblemIcon></div> */}

                    <div style={{ display: "flex" }}>
                      <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} readOnly></Form.Control>
                      <ReportProblemIcon
                        style={{
                          color: developerInputFiledColor2.data,
                        }}
                        onClick={() => {
                          setLabelValue("Authorized Person Name"), setSmShow(true), console.log("modal open");
                        }}
                      ></ReportProblemIcon>
                    </div>
                  </Col>
                </Row>

                {/* <Collapse in={open}>
          <div id="example-collapse-text"> */}
                <Row className="ms-auto" style={{ marginBottom: 20 }}>
                  <Col md={4} xxl lg="4">
                    <div>
                      <Form.Label>
                        <b>Authorized MobileNo. 2 </b>
                      </Form.Label>

                      <span style={{ color: "red" }}>*</span>
                    </div>
                    {/* <Modal size="sm" show={smShow2} onHide={() => setSmShow2(false)} aria-labelledby="example-modal-sizes-title-sm">
                      <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-sm">Authorized MobileNo. 2</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {" "}
                        <Form.Check
                          value="Developer"
                          onChange={(e) => {
                            setCrosschecked(""), setNochecked(false), setwarningOrred("#09cb3d");
                          }}
                          type="radio"
                          id="default-radio"
                          // label={<CheckCircleIcon color="success"></CheckCircleIcon>}
                          label="Yes"
                          name="group0"
                          inline
                        ></Form.Check>
                        <Form.Check
                          onChange={(e) => {
                            setCrosschecked(e.target.value), setNochecked(true), setwarningOrred("#ff0000");
                          }}
                          value="Developer"
                          type="radio"
                          id="default-radio"
                          // label={<CancelIcon color="error" />}
                          label="No"
                          name="group0"
                          inline
                        ></Form.Check>
                        <Col xs={8} md={4}>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Remarks</Form.Label>
                            <Form.Control type="text" placeholder="" autoFocus onChange={(e) => setDeveloperRemarks(e.target.value)} />
                          </Form.Group>
                        </Col>
                        <div class="col-md-4 bg-light text-right" style={{ position: "relative", marginBottom: 40 }}>
                          <Button style={{ textAlign: "right" }} onClick={handlemodalsubmit}>
                            Submit
                          </Button>
                        </div>
                      </Modal.Body>
                    </Modal> */}
                    {/* <Form.Check
                      value="Authorized Mobile No. 2"
                      type="radio"
                      id="default-radio"
                      // label={<AiFillCheckCircle  class="fa fa-check text-success" size={18}></AiFillCheckCircle>}
                      label={<CheckCircleIcon color="success"></CheckCircleIcon>}
                      name="group3"
                      inline
                    ></Form.Check>
                    <Form.Check
                      onChange={(e) => setUncheckedVlue((prev) => [...prev, e.target.value])}
                      value="Authorized Mobile No. 2"
                      type="radio"
                      id="default-radio"
                      // label={<AiFillCloseCircle class="fa fa-times text-danger" size={18}></AiFillCloseCircle>}
                      label={<CancelIcon color="error" />}
                      name="group3"
                      inline
                    ></Form.Check> */}

                    <div style={{ display: "flex" }}>
                      <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} readOnly></Form.Control>
                      <ReportProblemIcon
                        style={{
                          color: developerInputFiledColor3.data,
                        }}
                        onClick={() => {
                          setLabelValue("Authorized MobileNo. 2 "), setSmShow(true), console.log("modal open");
                        }}
                      ></ReportProblemIcon>
                    </div>
                  </Col>

                  <Col md={4} xxl lg="4">
                    <div>
                      <Form.Label>
                        <b>Email ID</b>
                      </Form.Label>
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    {/* <Form.Check
                      value="Email ID"
                      type="radio"
                      id="default-radio"
                      label={<AiFillCheckCircle  class="fa fa-check text-success" size={18}></AiFillCheckCircle>}
                      label={<CheckCircleIcon color="success"></CheckCircleIcon>}
                      name="group4"
                      inline
                    ></Form.Check>
                    <Form.Check
                      onChange={(e) => setUncheckedVlue((prev) => [...prev, e.target.value])}
                      value="Email ID"
                      type="radio"
                      id="default-radio"
                      label={<AiFillCloseCircle class="fa fa-times text-danger" size={18}></AiFillCloseCircle>}
                      label={<CancelIcon color="error" />}
                      name="group4"
                      inline
                    ></Form.Check> */}
                    <div style={{ display: "flex" }}>
                      <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} readOnly></Form.Control>
                      <ReportProblemIcon
                        style={{
                          color: developerInputFiledColor4.data,
                        }}
                        onClick={() => {
                          setLabelValue("Email ID"), setSmShow(true), console.log("modal open");
                        }}
                      ></ReportProblemIcon>
                    </div>
                  </Col>
                  <Col md={4} xxl lg="4">
                    <div>
                      <Form.Label>
                        <b>PAN No.</b>
                      </Form.Label>
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    {/* <Form.Check
                      value="PAN No."
                      type="radio"
                      id="default-radio"
                      label={<AiFillCheckCircle class="fa fa-check text-success" size={18}></AiFillCheckCircle>}
                      label={<CheckCircleIcon color="success"></CheckCircleIcon>}
                      name="group5"
                      inline
                    ></Form.Check>
                    <Form.Check
                      onChange={(e) => setUncheckedVlue((prev) => [...prev, e.target.value])}
                      value="PAN No."
                      type="radio"
                      id="default-radio"
                      label={<AiFillCloseCircle class="fa fa-times text-danger" size={18}></AiFillCloseCircle>}
                      label={<CancelIcon color="error" />}
                      name="group5"
                      inline
                    ></Form.Check> */}
                    <div style={{ display: "flex" }}>
                      <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} readOnly></Form.Control>
                      <ReportProblemIcon
                        style={{
                          color: developerInputFiledColor5.data,
                        }}
                        onClick={() => {
                          setLabelValue("PAN No."), setSmShow(true), console.log("modal open");
                        }}
                      ></ReportProblemIcon>
                    </div>
                  </Col>
                </Row>
                <Row className="ms-auto" style={{ marginBottom: 20 }}>
                  <Col md={4} xxl lg="4">
                    <div>
                      <Form.Label>
                        <b>Address 1 </b>
                      </Form.Label>
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    {/* <Form.Check
                      value="Address 1"
                      type="radio"
                      id="default-radio"
                      label={<AiFillCheckCircle  class="fa fa-check text-success"size={18}></AiFillCheckCircle>}
                      label={<CheckCircleIcon color="success"></CheckCircleIcon>}
                      name="group6"
                      inline
                    ></Form.Check>
                    <Form.Check
                      onChange={(e) => setUncheckedVlue((prev) => [...prev, e.target.value])}
                      value="Address 1"
                      type="radio"
                      id="default-radio"
                      label={<AiFillCloseCircle class="fa fa-times text-danger"size={18}></AiFillCloseCircle>}
                      label={<CancelIcon color="error" />}
                      name="group6"
                      inline
                    ></Form.Check> */}
                    <div style={{ display: "flex" }}>
                      <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} readOnly></Form.Control>
                      <ReportProblemIcon
                        style={{
                          color: developerInputFiledColor6.data,
                        }}
                        onClick={() => {
                          setLabelValue("Address  1"), setSmShow(true), console.log("modal open");
                        }}
                      ></ReportProblemIcon>
                    </div>
                  </Col>
                  <Col md={4} xxl lg="4">
                    <div>
                      <Form.Label>
                        <b>Village/City</b>
                      </Form.Label>
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    {/* <Form.Check
                      value="Village/City."
                      type="radio"
                      id="default-radio"
                      label={<AiFillCheckCircle class="fa fa-check text-success" size={18}></AiFillCheckCircle>}
                      label={<CheckCircleIcon color="success"></CheckCircleIcon>}
                      name="group7"
                      inline
                    ></Form.Check>
                    <Form.Check
                      onChange={(e) => setUncheckedVlue((prev) => [...prev, e.target.value])}
                      value="Village/City."
                      type="radio"
                      id="default-radio"
                       label={<AiFillCloseCircle class="fa fa-times text-danger" size={18}></AiFillCloseCircle>}
                      label={<CancelIcon color="error" />}
                      name="group7"
                      inline
                    ></Form.Check> */}
                    <div style={{ display: "flex" }}>
                      <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} readOnly></Form.Control>
                      <ReportProblemIcon
                        style={{
                          color: developerInputFiledColor7.data,
                        }}
                        onClick={() => {
                          setLabelValue("Village/City"), setSmShow(true), console.log("modal open");
                        }}
                      ></ReportProblemIcon>
                    </div>
                  </Col>
                  <Col md={4} xxl lg="4">
                    <div>
                      <Form.Label>
                        <b>Pincode</b>
                      </Form.Label>
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    {/* <Form.Check
                      value="Pincode"
                      type="radio"
                      id="default-radio"
                      label={<AiFillCheckCircle class="fa fa-check text-success" size={18}></AiFillCheckCircle>}
                      label={<CheckCircleIcon color="success"></CheckCircleIcon>}
                      name="group8"
                      inline
                    ></Form.Check>
                    <Form.Check
                      onChange={(e) => setUncheckedVlue((prev) => [...prev, e.target.value])}
                      value="Pincode"
                      type="radio"
                      id="default-radio"
                      label={<AiFillCloseCircle class="fa fa-times text-danger" size={18}></AiFillCloseCircle>}
                      label={<CancelIcon color="error" />}
                      name="group8"
                      inline
                    ></Form.Check> */}
                    <div style={{ display: "flex" }}>
                      <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} readOnly></Form.Control>
                      <ReportProblemIcon
                        style={{
                          color: developerInputFiledColor8.data,
                        }}
                        onClick={() => {
                          setLabelValue("Pincode"), setSmShow(true), console.log("modal open");
                        }}
                      ></ReportProblemIcon>
                    </div>
                  </Col>
                </Row>
                <Row className="ms-auto" style={{ marginBottom: 20 }}>
                  <Col md={4} xxl lg="4">
                    <div>
                      <Form.Label>
                        <b>Tehsil</b>{" "}
                      </Form.Label>
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    {/* <Form.Check
                      value="Tehsil"
                      type="radio"
                      id="default-radio"
                       label={<AiFillCheckCircle class="fa fa-check text-success" size={18}></AiFillCheckCircle>}
                      label={<CheckCircleIcon color="success"></CheckCircleIcon>}
                      name="group9"
                      inline
                    ></Form.Check>
                    <Form.Check
                      onChange={(e) => setUncheckedVlue((prev) => [...prev, e.target.value])}
                      value="Tehsil"
                      type="radio"
                      id="default-radio"
                      label={<AiFillCloseCircle class="fa fa-times text-danger" size={18}></AiFillCloseCircle>}
                      label={<CancelIcon color="error" />}
                      name="group9"
                      inline
                    ></Form.Check> */}
                    <div style={{ display: "flex" }}>
                      <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} readOnly></Form.Control>
                      <ReportProblemIcon
                        style={{
                          color: developerInputFiledColor9.data,
                        }}
                        onClick={() => {
                          setLabelValue("Tehsil"), setSmShow(true), console.log("modal open");
                        }}
                      ></ReportProblemIcon>
                    </div>
                  </Col>
                  <Col md={4} xxl lg="4">
                    <div>
                      <Form.Label>
                        <b>District</b>
                      </Form.Label>
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    {/* <Form.Check
                      value="District"
                      type="radio"
                      id="default-radio"
                      label={<AiFillCheckCircle class="fa fa-check text-success" size={18}></AiFillCheckCircle>}
                      label={<CheckCircleIcon color="success"></CheckCircleIcon>}
                      name="group10"
                      inline
                    ></Form.Check>
                    <Form.Check
                      onChange={(e) => setUncheckedVlue((prev) => [...prev, e.target.value])}
                      value="District"
                      type="radio"
                      id="default-radio"
                      label={<AiFillCloseCircle class="fa fa-times text-danger" size={18}></AiFillCloseCircle>}
                      label={<CancelIcon color="error" />}
                      name="group10"
                      inline
                    ></Form.Check> */}
                    <div style={{ display: "flex" }}>
                      <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} readOnly></Form.Control>
                      <ReportProblemIcon
                        style={{
                          color: developerInputFiledColor10.data,
                        }}
                        onClick={() => {
                          setLabelValue("District"), setSmShow(true), console.log("modal open");
                        }}
                      ></ReportProblemIcon>
                    </div>
                  </Col>
                  <Col md={4} xxl lg="4">
                    <div>
                      <Form.Label>
                        <b>State</b>
                      </Form.Label>
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    {/* <Form.Check
                      value="State"
                      type="radio"
                      id="default-radio"
                      label={<AiFillCheckCircle class="fa fa-check text-success" size={18}></AiFillCheckCircle>}
                      label={<CheckCircleIcon color="success"></CheckCircleIcon>}
                      name="group11"
                      inline
                    ></Form.Check>
                    <Form.Check
                      onChange={(e) => setUncheckedVlue((prev) => [...prev, e.target.value])}
                      value="State"
                      type="radio"
                      id="default-radio"
                      label={<AiFillCloseCircle class="fa fa-times text-danger" size={18}></AiFillCloseCircle>}
                      label={<CancelIcon color="error" />}
                      name="group11"
                      inline
                    ></Form.Check> */}
                    <div style={{ display: "flex" }}>
                      <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} readOnly></Form.Control>
                      <ReportProblemIcon
                        style={{
                          color: developerInputFiledColor11.data,
                        }}
                        onClick={() => {
                          setLabelValue("State"), setSmShow(true), console.log("modal open");
                        }}
                      ></ReportProblemIcon>
                    </div>
                  </Col>
                </Row>
                <Row className="ms-auto" style={{ marginBottom: 20 }}>
                  <Col md={4} xxl lg="4">
                    <div>
                      <Form.Label>
                        <b>Status (Individual/ Company/ Firm/ LLP etc.)</b>
                      </Form.Label>
                    </div>
                    {/* <Form.Check
                      value="Status (Individual/ Company/ Firm/ LLP etc.)"
                      type="radio"
                      id="default-radio"
                      
                      label={<CheckCircleIcon color="success"></CheckCircleIcon>}
                      name="group12"
                      inline
                    ></Form.Check>
                    <Form.Check
                      onChange={(e) => setUncheckedVlue((prev) => [...prev, e.target.value])}
                      value="Status (Individual/ Company/ Firm/ LLP etc.)"
                      type="radio"
                      id="default-radio"
                     
                      label={<CancelIcon color="error" />}
                      name="group12"
                      inline
                    ></Form.Check> */}
                    <div style={{ display: "flex" }}>
                      <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} readOnly></Form.Control>
                      <ReportProblemIcon
                        style={{
                          color: developerInputFiledColor12.data,
                        }}
                        onClick={() => {
                          setLabelValue("Status (Individual/ Company/ Firm/ LLP etc.)"), setSmShow(true), console.log("modal open");
                        }}
                      ></ReportProblemIcon>
                    </div>
                  </Col>
                  <Col md={4} xxl lg="4">
                    <div>
                      <Form.Label>
                        <b>LC-I signed by</b>{" "}
                      </Form.Label>
                    </div>
                    {/* <Form.Check
                      value="LC-I signed by"
                      type="radio"
                      id="default-radio"
                      label={<AiFillCheckCircle class="fa fa-check text-success" size={18}></AiFillCheckCircle>}
                      label={<CheckCircleIcon color="success"></CheckCircleIcon>}
                      name="group13"
                      inline
                    ></Form.Check>
                    <Form.Check
                      onChange={(e) => setUncheckedVlue((prev) => [...prev, e.target.value])}
                      value="LC-I signed by"
                      type="radio"
                      id="default-radio"
                       label={<AiFillCloseCircle class="fa fa-times text-danger" size={18}></AiFillCloseCircle>}
                      label={<CancelIcon color="error" />}
                      name="group13"
                      inline
                    ></Form.Check> */}
                    <div style={{ display: "flex" }}>
                      <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} readOnly></Form.Control>
                      <ReportProblemIcon
                        style={{
                          color: developerInputFiledColor13.data,
                        }}
                        onClick={() => {
                          setLabelValue("LC-I signed by"), setSmShow(true), console.log("modal open");
                        }}
                      ></ReportProblemIcon>
                    </div>
                  </Col>
                  <Col md={4} xxl lg="4">
                    <div>
                      <Form.Label>
                        <b>If LC-I is not signed by self (in case of an individual) nature of authorization (GPA/SPA)</b>
                      </Form.Label>
                    </div>
                    {/* <Form.Check
                      value="If LC-I is not signed by self (in case of an individual) nature of authorization (GPA/SPA)"
                      type="radio"
                      id="default-radio"
                      label={<AiFillCheckCircle class="fa fa-check text-success" size={18}></AiFillCheckCircle>}
                      label={<CheckCircleIcon color="success"></CheckCircleIcon>}
                      name="group14"
                      inline
                    ></Form.Check>
                    <Form.Check
                      onChange={(e) => setUncheckedVlue((prev) => [...prev, e.target.value])}
                      value="If LC-I is not signed by self (in case of an individual) nature of authorization (GPA/SPA)"
                      type="radio"
                      id="default-radio"
                       label={<AiFillCloseCircle class="fa fa-times text-danger" size={18}></AiFillCloseCircle>}
                      label={<CancelIcon color="error" />}
                      name="group14"
                      inline
                    ></Form.Check> */}
                    <div style={{ display: "flex" }}>
                      <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} readOnly></Form.Control>
                      <ReportProblemIcon
                        style={{
                          color: developerInputFiledColor14.data,
                        }}
                        onClick={() => {
                          setLabelValue("If LC-I is not signed by self (in case of an individual) nature of authorization (GPA/SPA)"),
                            setSmShow(true),
                            console.log("modal open");
                        }}
                      ></ReportProblemIcon>
                    </div>
                  </Col>
                </Row>
                <Row className="ms-auto" style={{ marginBottom: 20 }}>
                  <Col md={4} xxl lg="4">
                    <div>
                      <Form.Label
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Permanent address in case of individual/ registered office address in case other than individual"
                      >
                        <b>Permanent Address </b>
                        <InfoIcon />
                      </Form.Label>
                    </div>
                    {/* <Form.Check
                      value="Permanent address in case of individual/ registered office address in case other than individual"
                      type="radio"
                      id="default-radio"
                       label={<AiFillCheckCircle class="fa fa-check text-success" size={18}></AiFillCheckCircle>}
                      label={<CheckCircleIcon color="success"></CheckCircleIcon>}
                      name="group15"
                      inline
                    ></Form.Check>
                    <Form.Check
                      onChange={(e) => setUncheckedVlue((prev) => [...prev, e.target.value])}
                      value="Permanent address in case of individual/ registered office address in case other than individual"
                      type="radio"
                      id="default-radio"
                      label={<AiFillCloseCircle class="fa fa-times text-danger" size={18}></AiFillCloseCircle>}
                      label={<CancelIcon color="error" />}
                      name="group15"
                      inline
                    ></Form.Check> */}
                    <div style={{ display: "flex" }}>
                      <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} readOnly></Form.Control>
                      <ReportProblemIcon
                        style={{
                          color: developerInputFiledColor15.data,
                        }}
                        onClick={() => {
                          setLabelValue("Permanent address in case of individual/ registered office address in case other than individual"),
                            setSmShow(true),
                            console.log("modal open");
                        }}
                      ></ReportProblemIcon>
                    </div>
                  </Col>
                  <Col md={4} xxl lg="4">
                    <div>
                      <Form.Label>
                        <b>Address for communication</b>
                      </Form.Label>
                    </div>
                    <div style={{ display: "flex" }}>
                      <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} readOnly></Form.Control>
                      <ReportProblemIcon
                        style={{
                          color: developerInputFiledColor16.data,
                        }}
                        onClick={() => {
                          setLabelValue("Address for communication"), setSmShow(true), console.log("modal open");
                        }}
                      ></ReportProblemIcon>
                    </div>
                  </Col>
                  <Col md={4} xxl lg="4">
                    <div>
                      <Form.Label>
                        <b>Name of the authorized person to sign the application</b>{" "}
                      </Form.Label>
                    </div>
                    {/* <Form.Check
                      value="Name of the authorized person to sign the application"
                      type="radio"
                      id="default-radio"
                      label={<AiFillCheckCircle class="fa fa-check text-success" size={18}></AiFillCheckCircle>}
                      label={<CheckCircleIcon color="success"></CheckCircleIcon>}
                      name="group17"
                      inline
                    ></Form.Check>
                    <Form.Check
                      onChange={(e) => setUncheckedVlue((prev) => [...prev, e.target.value])}
                      value="Name of the authorized person to sign the application"
                      type="radio"
                      id="default-radio"
                       label={<AiFillCloseCircle class="fa fa-times text-danger" size={18}></AiFillCloseCircle>}
                      label={<CancelIcon color="error" />}
                      name="group17"
                      inline
                    ></Form.Check> */}
                    <div style={{ display: "flex" }}>
                      <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} readOnly></Form.Control>
                      <ReportProblemIcon
                        style={{
                          color: developerInputFiledColor17.data,
                        }}
                        onClick={() => {
                          setLabelValue("Name of the authorized person to sign the application"), setSmShow(true), console.log("modal open");
                        }}
                      ></ReportProblemIcon>
                    </div>
                  </Col>
                </Row>
                <Row className="ms-auto" style={{ marginBottom: 20 }}>
                  <Col md={4} xxl lg="4">
                    <div>
                      <Form.Label>
                        <b>Email ID for communication</b>
                      </Form.Label>
                    </div>
                    {/* <Form.Check
                      value="Email ID for communication"
                      type="radio"
                      id="default-radio"
                       label={<AiFillCheckCircle class="fa fa-check text-success" size={18}></AiFillCheckCircle>}
                      label={<CheckCircleIcon color="success"></CheckCircleIcon>}
                      name="group18"
                      inline
                    ></Form.Check>
                    <Form.Check
                      onChange={(e) => setUncheckedVlue((prev) => [...prev, e.target.value])}
                      value="Email ID for communication"
                      type="radio"
                      id="default-radio"
                       label={<AiFillCloseCircle class="fa fa-times text-danger" size={18}></AiFillCloseCircle>}
                      label={<CancelIcon color="error" />}
                      name="group18"
                      inline
                    ></Form.Check> */}
                    <div style={{ display: "flex" }}>
                      <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} readOnly></Form.Control>
                      <ReportProblemIcon
                        style={{
                          color: developerInputFiledColor18.data,
                        }}
                        onClick={() => {
                          setLabelValue("Email ID for communication"), setSmShow(true), console.log("modal open");
                        }}
                      ></ReportProblemIcon>
                    </div>
                  </Col>
                  <Col md={4} xxl lg="4">
                    <div>
                      <Form.Label>
                        <b>Name of individual Land owner/ land-owning company/ firm/ LLP etc.</b>
                      </Form.Label>
                    </div>
                    {/* <Form.Check
                      value="Name of individual Land owner/ land-owning company/ firm/ LLP etc."
                      type="radio"
                      id="default-radio"
                      label={<CheckCircleIcon color="success"></CheckCircleIcon>}
                      name="group19"
                      inline
                    ></Form.Check>
                    <Form.Check
                      onChange={(e) => setUncheckedVlue((prev) => [...prev, e.target.value])}
                      value="Name of individual Land owner/ land-owning company/ firm/ LLP etc."
                      type="radio"
                      id="default-radio"
                      label={<CancelIcon color="error" />}
                      name="group19"
                      inline
                    ></Form.Check> */}
                    <div style={{ display: "flex" }}>
                      <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} readOnly></Form.Control>
                      <ReportProblemIcon
                        style={{
                          color: developerInputFiledColor1.data,
                        }}
                        onClick={() => {
                          setLabelValue("Name of individual Land owner/ land-owning company/ firm/ LLP etc."),
                            setSmShow(true),
                            console.log("modal open");
                        }}
                      ></ReportProblemIcon>
                    </div>
                  </Col>
                </Row>
                {/* </div>
        </Collapse> */}
              </Form.Group>
              <div class="col-md-12 bg-light text-right" style={{ position: "relative", marginBottom: 40 }}>
                <Button
                  style={{ textAlign: "right" }}
                  onClick={() => {
                    console.log("here");
                    props.passUncheckedList({ data: uncheckedValue });
                  }}
                >
                  Submit
                </Button>
              </div>
              <hr></hr>
              {/* </Card> */}
            </div>
          </Collapse>
          <LicenseDetailsScrutiny />
        </div>
      </Collapse>
    </Form>
  );
};

export default Personalinfo;
