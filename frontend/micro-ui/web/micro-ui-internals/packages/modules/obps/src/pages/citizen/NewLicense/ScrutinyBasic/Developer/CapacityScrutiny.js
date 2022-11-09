import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useForm } from "react-hook-form";
import { Button, Form, FormLabel } from "react-bootstrap";
import { Card, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Timeline from "../../../../../../src/components/Timeline";
import { FormStep } from "@egovernments/digit-ui-react-components";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Collapse from "react-bootstrap/Collapse";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import ModalChild from "../Remarks/ModalChild";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const DeveloperCapacity = ({ t, config, onSelect, formData, formDataValue, data }) => {
  const { pathname: url } = useLocation();
  const userInfo = Digit.UserService.getUser();
  let validation = {};
  let isOpenLinkFlow = window.location.href.includes("openlink");

  const [isDevType, setIsDevType] = useState(false);
  const [isDevTypeComp, setIsDevTypeComp] = useState(false);
  const [modal, setmodal] = useState(false);
  const [modalColony, setmodalColony] = useState(false);
  const [capacityDevelopColonyHdruAct, setModalCapacityDevelopColonyHdruAct] = useState(
    formDataValue?.DeveloperCapacity?.capacityDevelopColonyHdruAct || []
  );
  // const [modalColonyDevGrpValuesArray, setModalColonyDevGrpValuesArray] = useState([]);
  const [capacityDevelopColonyLawAct, setCapacityDevelopColonyLawAct] = useState(formDataValue?.DeveloperCapacity?.capacityDevelopColonyLawAct || []);
  const [capacityDevelopAColony, setcapacityDevelopAColony] = useState([]);

  const [licenceNumber, setModalLcNo] = useState(formDataValue?.DeveloperCapacity?.licenceNumber || "");
  const [nameOfDeveloper, setModalDevName] = useState(formDataValue?.DeveloperCapacity?.nameOfDeveloper || "");
  const [purposeOfColony, setModalPurposeCol] = useState(formDataValue?.DeveloperCapacity?.purposeOfColony || "");
  const [sectorAndDevelopmentPlan, setModalDevPlan] = useState(formDataValue?.DeveloperCapacity?.sectorAndDevelopmentPlan || "");
  const [validatingLicence, setModalDevValidity] = useState(formDataValue?.DeveloperCapacity?.validatingLicence || "");

  const [coloniesDeveloped, setColonyDev] = useState(formDataValue?.DeveloperCapacity?.coloniesDeveloped || "");
  const [area, setColonyArea] = useState(formDataValue?.DeveloperCapacity?.area || "");
  const [purpose, setColonyPurpose] = useState(formDataValue?.DeveloperCapacity?.purpose || "");
  const [statusOfDevelopment, setColonyStatusDev] = useState(formDataValue?.DeveloperCapacity?.statusOfDevelopment || "");
  const [outstandingDues, setColonyoutstandingDue] = useState(formDataValue?.DeveloperCapacity?.outstandingDues || "");

  const [engineerName, setEngineerName] = useState(formDataValue?.DeveloperCapacity?.engineerName || "");
  const [engineerQualification, setEngineerQualification] = useState(formDataValue?.DeveloperCapacity?.engineerQualification || "");
  const [engineerSign, setEngineerSign] = useState(formDataValue?.DeveloperCapacity?.engineerSign || "");
  const [engineerDegree, setEngineerDegree] = useState(formDataValue?.DeveloperCapacity?.engineerDegree || "");
  const [architectName, setArchitectName] = useState(formDataValue?.DeveloperCapacity?.architectName || "");
  const [architectQualification, setArchitectQualification] = useState(formDataValue?.DeveloperCapacity?.architectQualification || "");
  const [architectSign, setArchitectSign] = useState(formDataValue?.DeveloperCapacity?.architectSign || "");
  const [architectDegree, setArchitectDegree] = useState(formDataValue?.DeveloperCapacity?.architectDegree || "");
  const [townPlannerName, setTownPlannerName] = useState(formDataValue?.DeveloperCapacity?.townPlannerName || "");
  const [townPlannerQualification, setTownPlannerQualification] = useState(formDataValue?.DeveloperCapacity?.townPlannerQualification || "");
  const [townPlannerSign, setTownPlannerSign] = useState(formDataValue?.DeveloperCapacity?.townPlannerSign || "");
  const [townPlannerDegree, setTownPlannerDegree] = useState(formDataValue?.DeveloperCapacity?.townPlannerDegree || "");
  const [existingDeveloperAgreement, setExistingDev] = useState(formDataValue?.DeveloperCapacity?.existingDeveloperAgreement || "");
  const [existingDeveloperAgreementDoc, setExistingDevDoc] = useState(formDataValue?.DeveloperCapacity?.existingDeveloperAgreementDoc || "");
  const [technicalCapacity, setTechnicalCapacity] = useState(formDataValue?.DeveloperCapacity?.technicalCapacity || "");
  const [technicalCapacityDoc, setTechnicalCapacityDoc] = useState(formDataValue?.DeveloperCapacity?.technicalCapacityDoc || "");
  const [engineerNameN, setengineerNameN] = useState(formDataValue?.DeveloperCapacity?.engineerNameN || "");
  const [engineerDocN, setEngineerDocN] = useState(formDataValue?.DeveloperCapacity?.engineerDocN || "");
  const [architectNameN, setArchitectNameN] = useState(formDataValue?.DeveloperCapacity?.architectNameN || "");
  const [architectDocN, setArchitectDocN] = useState(formDataValue?.DeveloperCapacity?.architectDocN || "");
  const [uplaodSpaBoard, setUplaodSpaBoard] = useState(formDataValue?.DeveloperCapacity?.uplaodSpaBoard || "");
  const [uplaodSpaBoardDoc, setUplaodSpaBoardDoc] = useState(formDataValue?.DeveloperCapacity?.uplaodSpaBoardDoc || "");
  const [agreementDoc, setAgreementDoc] = useState(formDataValue?.DeveloperCapacity?.agreementDoc || "");
  const [boardDoc, setBoardDoc] = useState(formDataValue?.DeveloperCapacity?.boardDoc || "");
  const [registeredDoc, setRegisteredDoc] = useState(formDataValue?.DeveloperCapacity?.registeredDoc || "");
  const [boardDocY, setBoardDocY] = useState(formDataValue?.DeveloperCapacity?.boardDocY || "");
  const [earlierDocY, setEarlierDocY] = useState(formDataValue?.DeveloperCapacity?.earlierDocY || "");
  const [boardDocN, setBoardDocN] = useState(formDataValue?.DeveloperCapacity?.boardDocN || "");
  const [earlierDocN, setEarlierDocN] = useState(formDataValue?.DeveloperCapacity?.earlierDocN || "");
  const [technicalAssistanceAgreementDoc, setTechnicalAssistanceAgreementDoc] = useState(
    formDataValue?.DeveloperCapacity?.technicalAssistanceAgreementDoc || ""
  );

  // console.log("AUTHNAME", authUserName);

  // const dispatch = useDispatch();

  const [uncheckedValue, setUncheckedVlue] = useState([]);
  const [checkValue, setCheckedVAlue] = useState([]);

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
  const [fieldValue, setFieldValue] = useState("");
  // const [fieldValue1, setFieldValue1] = useState("");

  const currentRemarks = (data) => {
    props.showTable({ data: data.data });
  };

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
    const filteredObjCheked = checkValue.filter((obj) => {
      return obj.label == modaldData.label;
    });
    if (filteredObj.length !== 0) {
      const removedList = uncheckedValue.filter((obj) => {
        return obj.label !== modaldData.label;
      });
      setUncheckedVlue(removedList);
    }
    if (filteredObjCheked.length !== 0) {
      const removedList = checkValue.filter((obj) => {
        return obj.label !== modaldData.label;
      });
      setCheckedVAlue(removedList);
    }

    if (isyesOrNochecked === false) {
      if (modaldData.label !== "" || modaldData.Remarks !== "") {
        if (filteredObj.length === 0) {
          setUncheckedVlue((prev) => [...prev, modaldData]);
        }
      }
    } else {
      if (modaldData.label !== "" || modaldData.Remarks !== "") {
        if (filteredObjCheked.length === 0) {
          setCheckedVAlue((prev) => [...prev, modaldData]);
        }
      }
    }
  };
  useEffect(() => {
    console.log("called");
    handlemodalsubmit();
  }, [modaldData.Remarks]);
  //   useEffect(() => {
  //     props.passUncheckedList({ data: uncheckedValue });
  //   }, [uncheckedValue]);

  //   useEffect(() => {
  //     props.passCheckedList({ data: checkValue });
  //   }, [checkValue]);
  console.log("unchecked values", uncheckedValue);

  console.log(uncheckedValue.indexOf("developer"));

  const developerInputFiledColor = uncheckedValue.filter((obj) => {
    return obj.label === "Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act,1975";
  });
  const developerInputCheckedFiledColor = checkValue.filter((obj) => {
    return obj.label === "Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act,1975";
  });
  const developerInputFiledColor1 = uncheckedValue.filter((obj) => {
    return obj.label === "Whether any technical expert(s) engaged";
  });
  const developerInputCheckedFiledColor1 = checkValue.filter((obj) => {
    return obj.label === "Whether any technical expert(s) engaged";
  });
  const developerInputFiledColor2 = uncheckedValue.filter((obj) => {
    return obj.label === "technical capacity sought";
  });
  const developerInputCheckedFiledColor2 = checkValue.filter((obj) => {
    return obj.label === "technical capacity sought";
  });
  const developerInputFiledColor3 = uncheckedValue.filter((obj) => {
    return obj.label === "Licences/permissions granted to Developer/ group company for development of colony under any other law/Act as";
  });
  const developerInputCheckedFiledColor3 = checkValue.filter((obj) => {
    return obj.label === "Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act,1975";
  });
  const developerInputFiledColor4 = uncheckedValue.filter((obj) => {
    return obj.label === "the proposed developer company/firm";
  });
  const developerInputCheckedFiledColor4 = checkValue.filter((obj) => {
    return obj.label === "the proposed developer company/firm";
  });

  ////////////////////////////////////////////
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm([{ XLongitude: "", YLatitude: "" }]);
  const formSubmit = (data) => {
    console.log("data", data);
  };
  const [AppliedDetailFormSubmitted, SetAppliedDetailFormSubmitted] = useState(false);

  const [open, setOpen] = useState(false);
  const [showhide, setShowhide] = useState("No");
  const [showhide1, setShowhide1] = useState("no");
  const [showhide0, setShowhide0] = useState("No");
  const [showhide6, setShowhide6] = useState("No");

  const handleshow = (e) => {
    const getshow = e.target.value;
    setShowhide(getshow);
  };
  const handleshow0 = (e) => {
    const getshow = e.target.value;
    setShowhide0(getshow);
  };
  const handleshow1 = (e) => {
    const getshow = e.target.value;
    setShowhide1(getshow);
  };

  const handleshow6 = (e) => {
    const getshow = e.target.value;
    setShowhide6(getshow);
  };

  const handleChange = (e) => {
    this.setState({ isRadioSelected: true });
  };

  const devTypeFlagVal = localStorage.getItem("devTypeValueFlag");

  const handleArrayValues = () => {
    if (licenceNumber !== "" && nameOfDeveloper !== "" && purposeOfColony !== "") {
      const values = {
        licenceNumber: licenceNumber,
        nameOfDeveloper: nameOfDeveloper,
        purposeOfColony: purposeOfColony,
        sectorAndDevelopmentPlan: sectorAndDevelopmentPlan,
        validatingLicence: validatingLicence,
      };
      setModalCapacityDevelopColonyHdruAct((prev) => [...prev, values]);
      setmodal(!modal);
    }
    console.log("DevCapacityFirst", capacityDevelopColonyHdruAct);
    localStorage.setItem("DevCapacityDetails", JSON.stringify(capacityDevelopColonyHdruAct));
  };

  const handleColonyDevGrp = () => {
    const colonyDevValues = {
      coloniesDeveloped: coloniesDeveloped,
      area: area,
      purpose: purpose,
      statusOfDevelopment: statusOfDevelopment,
      outstandingDues: outstandingDues,
    };
    setCapacityDevelopColonyLawAct((prev) => [...prev, colonyDevValues]);
    setmodalColony(!modalColony);
    console.log("DevCapacityColony", capacityDevelopColonyLawAct);
  };

  const submitTechdevData = async (e) => {
    //   e.preventDefault();
    const formDataValues = {
      capacityDevelopAColony: {
        capacityDevelopColonyHdruAct: capacityDevelopColonyHdruAct,
        capacityDevelopColonyLawAct: capacityDevelopColonyLawAct,
        technicalExpertEngaged: {
          engineerName: engineerName,
          engineerQualification: engineerQualification,
          engineerSign: engineerSign,
          engineerDegree: engineerDegree,
          architectName: architectName,
          architectQualification: architectQualification,
          architectSign: architectSign,
          architectDegree: architectDegree,
          townPlannerName: townPlannerName,
          townPlannerQualification: townPlannerQualification,
          townPlannerSign: townPlannerSign,
          townPlannerDegree: townPlannerDegree,
          existingDeveloperAgreement: existingDeveloperAgreement,
          existingDeveloperAgreementDoc: existingDeveloperAgreementDoc,
          technicalCapacity: technicalCapacity,
          technicalCapacityDoc: technicalCapacityDoc,
          engineerNameN: engineerNameN,
          engineerDocN: engineerDocN,
          architectNameN: architectNameN,
          architectDocN: architectDocN,
          uplaodSpaBoard: uplaodSpaBoard,
          uplaodSpaBoardDoc: uplaodSpaBoardDoc,
        },
        designationDirector: {
          agreementDoc: agreementDoc,
          boardDoc: boardDoc,
        },
        obtainedLicense: {
          registeredDoc: registeredDoc,
          boardDocY: boardDocY,
          earlierDocY: earlierDocY,
          boardDocN: boardDocN,
          earlierDocN: earlierDocN,
          technicalAssistanceAgreementDoc: technicalAssistanceAgreementDoc,
        },
      },
    };
    onSelect(config.key, formDataValues);

    console.log("FINAL SUBMIT", formDataValues);
    localStorage.setItem("capacity", JSON.stringify(formDataValues));
    setcapacityDevelopAColony((prev) => [...prev, formDataValues]);
  };
  const jsonobj = localStorage.getItem("capacity");
  console.log(JSON.parse(jsonobj));

  const [noofRows, setNoOfRows] = useState(1);
  const [noofRow, setNoOfRow] = useState(1);
  const [noofRow1, setNoOfRow1] = useState(1);
  const onSkip = () => onSelect();
  return (
    <div>
      <div
        className="collapse-header"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        style={{
          background: "#f1f1f1",
          padding: "0.25rem 1.25rem",
          borderRadius: "0.25rem",
          fontWeight: "600",
          display: "flex",
          cursor: "pointer",
          color: "#817f7f",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <span style={{ color: "#817f7f" }} className="">
          Developer Capacity
        </span>
        {open ? <RemoveIcon></RemoveIcon> : <AddIcon></AddIcon>}
      </div>

      <Collapse in={open}>
        <div id="example-collapse-text">
          <FormStep config={config} onSelect={submitTechdevData} onSkip={onSkip} t={t}>
            {devTypeFlagVal === "01" && (
              <div className="card-body">
                <div className="form-group row mb-12">
                  {/* <label className="col-sm-3 col-form-label">Individual</label> */}
                  <div className="col-sm-12">
                    {/* <textarea type="text" className="employee-card-input" id="details" placeholder="Enter Details" /> */}
                    <table className="table table-bordered" size="sm">
                      <thead>
                        <tr>
                          <th class="fw-normal">S.No.</th>
                          <th class="fw-normal">Particulars of document</th>
                          <th class="fw-normal">Details </th>
                          <th class="fw-normal">Annexure </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td> 1 </td>
                          <td>Net Worth in case of individual certified by CA</td>
                          <td>
                            <input type="file" name="upload" placeholder="" class="employee-card-input" />
                          </td>
                          <td align="center" size="large"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            {devTypeFlagVal === "02" && (
              <div className="card-body">
                <div className="form-group row">
                  <div className="col-sm-12">
                    <table className="table table-bordered" size="sm">
                      <thead>
                        <tr>
                          <th class="fw-normal">S.No.</th>
                          <th class="fw-normal">Particulars of document</th>
                          <th class="fw-normal">Details </th>
                          <th class="fw-normal">Annexure </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td> 1 </td>
                          <td>Balance sheet of last 3 years </td>
                          <td>
                            <input type="file" name="upload" placeholder="" class="employee-card-input" />
                          </td>
                          <td align="center" size="large"></td>
                        </tr>
                        <tr>
                          <td> 2 </td>
                          <td>Ps-3(Representing Paid-UP capital)</td>
                          <td>
                            <input type="file" name="upload" placeholder="" class="employee-card-input" />
                          </td>
                          <td align="center" size="large"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            {devTypeFlagVal === "03" && (
              <div className="card-body">
                <div className="form-group row">
                  {/* <label className="col-sm-3 col-form-label">LLP</label> */}
                  <div className="col-sm-12">
                    {/* <input type="text" className="employee-card-input" id="llp" placeholder="Enter Email" /> */}
                    <table className="table table-bordered" size="sm">
                      <thead>
                        <tr>
                          <th class="fw-normal">S.No.</th>
                          <th class="fw-normal">Particulars of document</th>
                          <th class="fw-normal">Details </th>
                          <th class="fw-normal">Annexure </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td> 1 </td>
                          <td>Networth of partners </td>
                          <td>
                            <input type="file" name="upload" placeholder="" class="employee-card-input" />
                          </td>
                          <td align="center" size="large">
                            {/* <FileUploadIcon /> */}
                          </td>
                        </tr>
                        <tr>
                          <td> 2 </td>
                          <td>Net worth of firm</td>
                          <td>
                            <input type="file" name="upload" placeholder="" class="employee-card-input" />
                          </td>
                          <td align="center" size="large">
                            {/* <FileUploadIcon /> */}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            <div className="card-body">
              <p>1. I/ We hereby submit the following information/ enclose the relevant documents:-</p>
              <p>
                &nbsp;&nbsp;&nbsp; (i) Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act,
                1975: *{" "}
              </p>
              <div>
                <div style={{ display: "flex" }}>
                  <input type="radio" value="Yes" id="Yes" className="mx-2 mt-1" disabled />
                  <label for="Yes">Yes</label>
                  <input type="radio" value="No" id="No" className="mx-2 mt-1" disabled />
                  <label for="No">No</label>
                  &nbsp;&nbsp;
                  <ReportProblemIcon
                    style={{
                      color:
                        developerInputFiledColor.length > 0
                          ? developerInputFiledColor[0].color.data
                          : developerInputCheckedFiledColor.length > 0
                          ? developerInputCheckedFiledColor[0].color.data
                          : "#FFB602",
                    }}
                    onClick={() => {
                      setLabelValue(
                        "Whether the Developer/ group company has earlier been granted permission to set up a colony under HDRU Act,1975"
                      ),
                        setSmShow(true),
                        console.log("modal open");
                    }}
                  ></ReportProblemIcon>
                  <ModalChild
                    labelmodal={labelValue}
                    passmodalData={handlemodaldData}
                    isYesorNoChecked={handleYesOrNochecked}
                    displaymodal={smShow}
                    setColor={setColor}
                  ></ModalChild>
                </div>
                {/* {showhide0 === "Yes" && ( */}
                <div className="card-body">
                  {/* <h5 className="card-h">Add/Remove Authorized Users</h5> */}
                  <div className="table-bd">
                    <Table className="table table-bordered">
                      <thead>
                        <tr>
                          <th class="fw-normal">S. no</th>
                          <th class="fw-normal"> Licence No / year and date of grant of licence </th>
                          <th class="fw-normal">Name of developer *</th>
                          <th class="fw-normal">Purpose of colony </th>
                          <th class="fw-normal">Sector and development plan </th>
                          <th class="fw-normal">Validity of licence including renewals if any</th>
                          {/* <th>Remove</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {/* {capacityDevelopColonyHdruAct.length > 0
                          ? capacityDevelopColonyHdruAct.map((elementInArray, input) => {
                              return ( */}
                        <tr>
                          <td>{/* {input + 1} */}</td>
                          <td>
                            <input
                              type="text"
                              // value={elementInArray.licenceNumber}
                              // placeholder={elementInArray.licenceNumber}
                              class="employee-card-input"
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              // value={elementInArray.nameOfDeveloper}
                              // placeholder={elementInArray.nameOfDeveloper}
                              class="employee-card-input"
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              // value={elementInArray.purposeOfColony}
                              // placeholder={elementInArray.purposeOfColony}
                              class="employee-card-input"
                              disabled
                            />
                          </td>
                          <td>
                            <div className="row">
                              <button className="btn btn-sm col-md-6">
                                <VisibilityIcon color="info" className="icon" />
                              </button>
                              <button className="btn btn-sm col-md-6">
                                <FileDownloadIcon color="primary" />
                              </button>
                            </div>
                          </td>
                          <td>
                            <div className="row">
                              <button className="btn btn-sm col-md-6">
                                <VisibilityIcon color="info" className="icon" />
                              </button>
                              <button className="btn btn-sm col-md-6">
                                <FileDownloadIcon color="primary" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <div>
                      {/* <div>
                        <Modal size="lg" isOpen={modal} toggle={() => setmodal(!modal)}>
                          <ModalHeader toggle={() => setmodal(!modal)}></ModalHeader>

                          <ModalBody>
                            <div className="card2">
                              <div className="popupcard">
                                <form className="text1">
                                  <Row>
                                    <Col md={4} xxl lg="4">
                                      <label htmlFor="name" className="text">
                                        Licence No / year of licence
                                      </label>
                                      <input type="text" onChange={(e) => setModalLcNo(e.target.value)} placeholder="" class="employee-card-input" />
                                    </Col>
                                    <Col md={4} xxl lg="4">
                                      <label htmlFor="name" className="text">
                                        Name of developer *
                                      </label>
                                      <input
                                        type="text"
                                        onChange={(e) => setModalDevName(e.target.value)}
                                        placeholder=""
                                        class="employee-card-input"
                                      />
                                    </Col>
                                    <Col md={4} xxl lg="4">
                                      <label htmlFor="name" className="text">
                                        Purpose of colony
                                      </label>
                                      <input
                                        type="text"
                                        onChange={(e) => setModalPurposeCol(e.target.value)}
                                        placeholder=""
                                        class="employee-card-input"
                                      />
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col md={4} xxl lg="4">
                                      <label htmlFor="name" className="text">
                                        Sector and development plan
                                      </label>
                                      <input
                                        type="file"
                                        onChange={(e) => setModalDevPlan(e.target.value)}
                                        placeholder=""
                                        class="employee-card-input"
                                      />
                                    </Col>
                                    <Col md={4} xxl lg="4">
                                      <label htmlFor="name" className="text">
                                        Validity of licence{" "}
                                      </label>
                                      <input
                                        type="file"
                                        onChange={(e) => setModalDevValidity(e.target.value)}
                                        placeholder=""
                                        class="employee-card-input"
                                      />
                                    </Col>
                                  </Row>
                                </form>
                              </div>
                              <div className="submit-btn">
                                <div className="form-group col-md6 mt-6">
                                  <button type="button" onClick={handleArrayValues} style={{ float: "right" }} className="btn btn-success">
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </div>
                          </ModalBody>
                          <ModalFooter toggle={() => setmodal(!modal)}></ModalFooter>
                        </Modal>
                      </div> */}
                    </div>

                    <br></br>
                    <br></br>
                  </div>
                </div>
                {/* )} */}
              </div>

              <div className="hl"></div>
              <p>
                &nbsp;&nbsp;&nbsp;(ii) Licences/permissions granted to Developer/ group company for development of colony under any other law/Act as .
              </p>
              <div style={{ display: "flex" }}>
                {/* <Form.Control
              style={{ maxWidth: 200, marginRight: 5, height: 30 }}
              placeholder={personalinfo !== null ? personalinfo.authorizedmobile : null}
              disabled
            ></Form.Control> */}
                &nbsp;&nbsp;
                <ReportProblemIcon
                  style={{
                    color:
                      developerInputFiledColor3.length > 0
                        ? developerInputFiledColor3[0].color.data
                        : developerInputCheckedFiledColor3.length > 0
                        ? developerInputCheckedFiledColor3[0].color.data
                        : "#FFB602",
                  }}
                  onClick={() => {
                    setLabelValue("Licences/permissions granted to Developer/ group company for development of colony under any other law/Act as"),
                      setSmShow(true),
                      console.log("modal open");
                    // setFieldValue(personalinfo !== null ? personalinfo.authorizedmobile : null);
                  }}
                ></ReportProblemIcon>
              </div>
              <div>
                <div className="card-body">
                  {/* <h5 className="card-h">Add/Remove Authorized Users</h5> */}
                  <div className="table-bd">
                    <Table className="table table-bordered">
                      <thead>
                        <tr>
                          {/* <th>Add More</th> */}
                          <th class="fw-normal">S.No</th>
                          <th class="fw-normal">Colonies developed</th>
                          <th class="fw-normal">Area</th>
                          <th class="fw-normal">Purpose</th>
                          <th class="fw-normal">Status of development</th>
                          <th class="fw-normal">Outstanding Dues</th>
                          {/* <th>Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {/* {capacityDevelopColonyLawAct.length > 0 ? (
                          capacityDevelopColonyLawAct.map((elementInArray, input) => {
                            return ( */}
                        <tr>
                          <td>{/* {input + 1} */}</td>
                          <td>
                            <input
                              type="text"
                              // value={elementInArray.licenceNumber}
                              // placeholder={elementInArray.licenceNumber}
                              class="employee-card-input"
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              // value={elementInArray.area} placeholder={elementInArray.area}
                              class="employee-card-input"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              // value={elementInArray.licenceNumber}
                              // placeholder={elementInArray.licenceNumber}
                              class="employee-card-input"
                              disabled
                            />
                          </td>
                          <td>
                            <div className="row">
                              <button className="btn btn-sm col-md-6">
                                <VisibilityIcon color="info" className="icon" />
                              </button>
                              <button className="btn btn-sm col-md-6">
                                <FileDownloadIcon color="primary" />
                              </button>
                            </div>
                          </td>
                          <td>
                            <div className="row">
                              <button className="btn btn-sm col-md-6">
                                <VisibilityIcon color="info" className="icon" />
                              </button>
                              <button className="btn btn-sm col-md-6">
                                <FileDownloadIcon color="primary" />
                              </button>
                            </div>
                          </td>
                        </tr>
                        {/* );
                          })
                        ) : (
                          <p>Click on add more</p>
                        )} */}
                      </tbody>
                    </Table>
                    {/* <div>
                      <button
                        type="button"
                        style={{
                          float: "left",
                          backgroundColor: "#0b3629",
                          color: "white",
                        }}
                        className="btn mt-3"
                        onClick={() => setmodalColony(true)}
                      >
                        Add More
                      </button>

                      <div> */}
                    {/* <Modal size="lg" isOpen={modalColony} toggle={() => setmodalColony(!modalColony)}>
                          <ModalHeader toggle={() => setmodalColony(!modalColony)}></ModalHeader>

                          <ModalBody>
                            <div className="card2">
                              <div className="popupcard">
                                <form className="text1">
                                  <Row>
                                    <Col md={4} xxl lg="4">
                                      <label htmlFor="name" className="text">
                                        Colonies developed
                                      </label>
                                      <input type="text" onChange={(e) => setColonyDev(e.target.value)} placeholder="" class="employee-card-input" />
                                    </Col>
                                    <Col md={4} xxl lg="4">
                                      <label htmlFor="name" className="text">
                                        Area
                                      </label>
                                      <input
                                        type="number"
                                        onChange={(e) => setColonyArea(e.target.value)}
                                        placeholder=""
                                        class="employee-card-input"
                                      />
                                    </Col>
                                    <Col md={4} xxl lg="4">
                                      <label htmlFor="name" className="text">
                                        Purpose
                                      </label>
                                      <input
                                        type="text"
                                        onChange={(e) => setColonyPurpose(e.target.value)}
                                        placeholder=""
                                        class="employee-card-input"
                                      />
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col md={4} xxl lg="4">
                                      <label htmlFor="name" className="text">
                                        Status of development
                                      </label>
                                      <input
                                        type="file"
                                        onChange={(e) => setColonyStatusDev(e.target.value)}
                                        placeholder=""
                                        class="employee-card-input"
                                      />
                                    </Col>
                                    <Col md={4} xxl lg="4">
                                      <label htmlFor="name" className="text">
                                        Outstanding Dues
                                      </label>
                                      <input
                                        type="file"
                                        onChange={(e) => setColonyoutstandingDue(e.target.value)}
                                        placeholder=""
                                        class="employee-card-input"
                                      />
                                    </Col>
                                  </Row>
                                </form>
                              </div>
                              <div className="submit-btn">
                                <div className="form-group col-md6 mt-6">
                                  <button type="button" style={{ float: "right" }} className="btn btn-success" onClick={handleColonyDevGrp}>
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </div>
                          </ModalBody>
                          <ModalFooter toggle={() => setmodalColony(!modalColony)}></ModalFooter>
                        </Modal> */}
                    {/* </div>
                    </div> */}
                    <br></br>
                    <br></br>
                  </div>
                </div>
              </div>

              <div className="hl"></div>
              <p>&nbsp;&nbsp;&nbsp;(iii) Whether any technical expert(s) engaged</p>

              <div>
                {/* <input type="radio" value="Yes" id="Yes" className="mx-2 mt-1" onChange={handleChange} name="Yes" onClick={handleshow1} />
                <label for="Yes">Yes</label>

                <input type="radio" value="No" id="No" className="mx-2 mt-1" onChange={handleChange} name="Yes" onClick={handleshow1} />
                <label for="No">No</label> */}

                <div style={{ display: "flex" }}>
                  <input type="radio" value="Yes" id="Yes" className="mx-2 mt-1" disabled />
                  <label for="Yes">Yes</label>
                  <input type="radio" value="No" id="No" className="mx-2 mt-1" disabled />
                  <label for="No">No</label>
                  &nbsp;&nbsp;
                  <ReportProblemIcon
                    style={{
                      color:
                        developerInputFiledColor1.length > 0
                          ? developerInputFiledColor1[0].color.data
                          : developerInputCheckedFiledColor1.length > 0
                          ? developerInputCheckedFiledColor1[0].color.data
                          : "#FFB602",
                    }}
                    onClick={() => {
                      setLabelValue("Whether any technical expert(s) engaged"), setSmShow(true), console.log("modal open");
                    }}
                  ></ReportProblemIcon>
                </div>
                {/* {showhide1 === "Yes" && ( */}
                <div className="row ">
                  <div className="form-group row">
                    <div className="col-sm-12">
                      <div className="table-bd">
                        <Table className="table table-bordered">
                          <thead>
                            <tr>
                              <th class="fw-normal">S.No</th>
                              <th class="fw-normal">Professional </th>
                              <th class="fw-normal">Qualification</th>
                              <th class="fw-normal">Signature</th>
                              <th class="fw-normal">Annexure</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>
                                <input
                                  type="text"
                                  // value={elementInArray.licenceNumber}
                                  // placeholder={elementInArray.licenceNumber}
                                  class="employee-card-input"
                                  disabled
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  // value={elementInArray.licenceNumber}
                                  // placeholder={elementInArray.licenceNumber}
                                  class="employee-card-input"
                                  disabled
                                />
                              </td>

                              <td>
                                <div className="row">
                                  <button className="btn btn-sm col-md-6">
                                    <VisibilityIcon color="info" className="icon" />
                                  </button>
                                  <button className="btn btn-sm col-md-6">
                                    <FileDownloadIcon color="primary" />
                                  </button>
                                </div>
                              </td>
                              <td align="center" size="large">
                                <div className="row">
                                  <button className="btn btn-sm col-md-6">
                                    <VisibilityIcon color="info" className="icon" />
                                  </button>
                                  <button className="btn btn-sm col-md-6">
                                    <FileDownloadIcon color="primary" />
                                  </button>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td>2</td>
                              <td>
                                <input
                                  type="text"
                                  // value={elementInArray.licenceNumber}
                                  // placeholder={elementInArray.licenceNumber}
                                  class="employee-card-input"
                                  disabled
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  // value={elementInArray.licenceNumber}
                                  // placeholder={elementInArray.licenceNumber}
                                  class="employee-card-input"
                                  disabled
                                />
                              </td>

                              <td>
                                <div className="row">
                                  <button className="btn btn-sm col-md-6">
                                    <VisibilityIcon color="info" className="icon" />
                                  </button>
                                  <button className="btn btn-sm col-md-6">
                                    <FileDownloadIcon color="primary" />
                                  </button>
                                </div>
                              </td>
                              <td align="center" size="large">
                                <div className="row">
                                  <button className="btn btn-sm col-md-6">
                                    <VisibilityIcon color="info" className="icon" />
                                  </button>
                                  <button className="btn btn-sm col-md-6">
                                    <FileDownloadIcon color="primary" />
                                  </button>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td>3</td>
                              <td>
                                <input
                                  type="text"
                                  // value={elementInArray.licenceNumber}
                                  // placeholder={elementInArray.licenceNumber}
                                  class="employee-card-input"
                                  disabled
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  // value={elementInArray.licenceNumber}
                                  // placeholder={elementInArray.licenceNumber}
                                  class="employee-card-input"
                                  disabled
                                />
                              </td>

                              <td>
                                <div className="row">
                                  <button className="btn btn-sm col-md-6">
                                    <VisibilityIcon color="info" className="icon" />
                                  </button>
                                  <button className="btn btn-sm col-md-6">
                                    <FileDownloadIcon color="primary" />
                                  </button>
                                </div>
                              </td>
                              <td align="center" size="large">
                                <div className="row">
                                  <button className="btn btn-sm col-md-6">
                                    <VisibilityIcon color="info" className="icon" />
                                  </button>
                                  <button className="btn btn-sm col-md-6">
                                    <FileDownloadIcon color="primary" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
                {/* )} */}
                {showhide1 === "No" && (
                  <div className="row ">
                    <div className="form-group row">
                      <div className="col-sm-12">
                        <div className="table-bd">
                          <Table className="table table-bordered" size="sm">
                            <thead>
                              <tr>
                                <th>S.No.</th>
                                <th>Professional </th>
                                <th> Annexure</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td> 1 &nbsp;&nbsp;</td>
                                <td>Agreement with existing colonizer/developer who has already developed a colony</td>
                                <td align="center" size="large">
                                  <input type="file" onChange={(e) => setExistingDevDoc(e.target.value)} placeholder="" class="employee-card-input" />
                                </td>
                              </tr>
                              <tr>
                                <td> 2&nbsp;&nbsp; </td>
                                <td>
                                  <input
                                    type="text"
                                    onChange={(e) => setTechnicalCapacity(e.target.value)}
                                    placeholder="Technical Capacity"
                                    class="employee-card-input"
                                  />
                                </td>
                                <td align="center" size="large">
                                  <input
                                    type="file"
                                    onChange={(e) => setTechnicalCapacityDoc(e.target.value)}
                                    placeholder=""
                                    class="employee-card-input"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td> 3 &nbsp;&nbsp;</td>
                                {/* <td colSpan={2}>Larry the Bird</td> */}
                                <td>
                                  <input
                                    type="text"
                                    placeholder="Name of Engineer"
                                    onChange={(e) => setengineerNameN(e.target.value)}
                                    class="employee-card-input"
                                  />
                                </td>
                                <td align="center" size="large">
                                  <input type="file" onChange={(e) => setEngineerDocN(e.target.value)} placeholder="" class="employee-card-input" />
                                </td>
                              </tr>
                              <tr>
                                <td> 4&nbsp;&nbsp; </td>
                                <td>
                                  <input
                                    type="text"
                                    placeholder="Name of Architect"
                                    onChange={(e) => setArchitectNameN(e.target.value)}
                                    class="employee-card-input"
                                  />
                                </td>
                                <td align="center" size="large">
                                  <input type="file" onChange={(e) => setArchitectDocN(e.target.value)} placeholder="" class="employee-card-input" />
                                </td>
                              </tr>
                              <tr>
                                <td> 5&nbsp;&nbsp; </td>
                                <td>Upload SPA/GPA/ Board Resolution to sign collaboration agreement on behalf of land owner(s)</td>
                                <td align="center" size="large">
                                  <input type="file" class="employee-card-input" onChange={(e) => setUplaodSpaBoardDoc(e.target.value)} />
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="hl"></div>
              <p>
                &nbsp;&nbsp;&nbsp;(iv) If director/partner of the proposed developer company/firm also holds designation of director/partner in any
                other company/firm who has already obtained license(s) under act of 1975:
              </p>
              <div style={{ display: "flex" }}>
                &nbsp;&nbsp;
                <ReportProblemIcon
                  style={{
                    color:
                      developerInputFiledColor4.length > 0
                        ? developerInputFiledColor4[0].color.data
                        : developerInputCheckedFiledColor4.length > 0
                        ? developerInputCheckedFiledColor4[0].color.data
                        : "#FFB602",
                  }}
                  onClick={() => {
                    setLabelValue("the proposed developer company/firm "), setSmShow(true), console.log("modal open");
                  }}
                ></ReportProblemIcon>
              </div>

              <div>
                <input
                  type="radio"
                  value="Yes"
                  id="Yes"
                  className="mx-2 mt-1"
                  // onChange={(e) => handleChange(e.target.value)}
                  // name="Yes"
                  // onClick={handleshow}
                  disabled
                />
                <label for="Yes">Yes</label>

                <input
                  type="radio"
                  value="No"
                  id="No"
                  className="mx-2 mt-1"
                  // onChange={(e) => handleChange(e.target.value)}
                  // name="Yes"
                  // onClick={handleshow}
                  disabled
                />
                <label for="No">No</label>
                {/* {showhide === "Yes" && ( */}
                <div className="row ">
                  <div className="form-group row">
                    <div className="col-sm-12">
                      <Col xs="12" md="12" sm="12">
                        <Table className="table table-bordered" size="sm">
                          <thead>
                            <tr>
                              <th class="fw-normal">S.No.</th>
                              <th class="fw-normal">Professional </th>
                              <th class="fw-normal"> Annexure</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td> 1 &nbsp;&nbsp;</td>
                              <td> Agreement between the entities to provide technical assistance</td>
                              <td align="center" size="large">
                                <div className="row">
                                  <button className="btn btn-sm col-md-6">
                                    <VisibilityIcon color="info" className="icon" />
                                  </button>
                                  <button className="btn btn-sm col-md-6">
                                    <FileDownloadIcon color="primary" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td> 2&nbsp;&nbsp; </td>
                              <td>Board resolutions of authorized signatory of firm/company provided technical assistance</td>
                              <td align="center" size="large">
                                <div className="row">
                                  <button className="btn btn-sm col-md-6">
                                    <VisibilityIcon color="info" className="icon" />
                                  </button>
                                  <button className="btn btn-sm col-md-6">
                                    <FileDownloadIcon color="primary" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                    </div>
                  </div>
                </div>
                {/* )} */}
              </div>

              <div className="hl"></div>
              <p>
                2. In case of technical capacity sought from another company/firm who has already obtained license(s) under act of 1975 or outside
                Haryana:
              </p>
              <div>
                {/* <input type="radio" value="Yes" id="Yes" className="mx-2 mt-1" disabled />
                <label for="Yes">Yes</label>

                <input type="radio" value="No" id="No" className="mx-2 mt-1" disabled />
                <label for="No">No</label> */}
                <div style={{ display: "flex" }}>
                  <input type="radio" value="Yes" id="Yes" className="mx-2 mt-1" disabled />
                  <label for="Yes">Yes</label>
                  <input type="radio" value="No" id="No" className="mx-2 mt-1" disabled />
                  <label for="No">No</label>
                  &nbsp;&nbsp;
                  <ReportProblemIcon
                    style={{
                      color:
                        developerInputFiledColor2.length > 0
                          ? developerInputFiledColor2[0].color.data
                          : developerInputCheckedFiledColor2.length > 0
                          ? developerInputCheckedFiledColor2[0].color.data
                          : "#FFB602",
                    }}
                    onClick={() => {
                      setLabelValue("technical capacity sought"), setSmShow(true), console.log("modal open");
                    }}
                  ></ReportProblemIcon>
                </div>
                {showhide6 === "Yes" && (
                  <div className="row ">
                    <div className="form-group row">
                      <div className="col-sm-12">
                        <Col xs="12" md="12" sm="12">
                          <div>
                            <Table className="table table-bordered" size="sm">
                              <thead>
                                <tr>
                                  <th class="fw-normal">S.No.</th>
                                  <th class="fw-normal">Agreement*</th>
                                  <th class="fw-normal">Annexure </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td> 1 </td>
                                  <td> Registered and Irrevocable Agreement</td>
                                  <td align="center" size="large">
                                    <div className="row">
                                      <button className="btn btn-sm col-md-6">
                                        <VisibilityIcon color="info" className="icon" />
                                      </button>
                                      <button className="btn btn-sm col-md-6">
                                        <FileDownloadIcon color="primary" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td> 2 </td>
                                  <td>Board resolutions of authorized signatory of firm/company provided technical assistance</td>
                                  <td align="center" size="large">
                                    <div className="row">
                                      <button className="btn btn-sm col-md-6">
                                        <VisibilityIcon color="info" className="icon" />
                                      </button>
                                      <button className="btn btn-sm col-md-6">
                                        <FileDownloadIcon color="primary" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td> 3 </td>

                                  <td>
                                    Auto populate details of earlier license(s) granted to existing developer company/firm to set up a colony under
                                    act of 1975.
                                  </td>
                                  <td align="center" size="large">
                                    <div className="row">
                                      <button className="btn btn-sm col-md-6">
                                        <VisibilityIcon color="info" className="icon" />
                                      </button>
                                      <button className="btn btn-sm col-md-6">
                                        <FileDownloadIcon color="primary" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>{" "}
                            </Table>
                          </div>
                        </Col>
                      </div>
                    </div>
                  </div>
                )}
                {showhide6 === "No" && (
                  <div className="row ">
                    <div className="form-group row">
                      <div className="col-sm-12">
                        <div>
                          <Table className="table table-bordered" size="sm">
                            <thead>
                              <tr>
                                <th class="fw-normal">S.No.</th>
                                <th class="fw-normal">Agreement*</th>
                                <th class="fw-normal">Annexure </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td> 1 </td>
                                <td>Agreement between the entities to provide technical assistance</td>
                                <td align="center" size="large">
                                  <div className="row">
                                    <button className="btn btn-sm col-md-6">
                                      <VisibilityIcon color="info" className="icon" />
                                    </button>
                                    <button className="btn btn-sm col-md-6">
                                      <FileDownloadIcon color="primary" />
                                    </button>
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td> 2 </td>
                                <td>Board resolutions of authorized signatory of firm/company provided technical assistance</td>
                                <td align="center" size="large">
                                  <div className="row">
                                    <button className="btn btn-sm col-md-6">
                                      <VisibilityIcon color="info" className="icon" />
                                    </button>
                                    <button className="btn btn-sm col-md-6">
                                      <FileDownloadIcon color="primary" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td> 3 </td>

                                <td>
                                  Auto populate details of earlier license(s) granted to existing developer company/firm to set up a colony under act
                                  of 1975.
                                </td>
                                <td align="center" size="large">
                                  <div className="row">
                                    <button className="btn btn-sm col-md-6">
                                      <VisibilityIcon color="info" className="icon" />
                                    </button>
                                    <button className="btn btn-sm col-md-6">
                                      <FileDownloadIcon color="primary" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </FormStep>
        </div>
      </Collapse>
    </div>
  );
};
export default DeveloperCapacity;
