import { BackButton, CardLabel, FormStep, Loader, MobileNumber, RadioButtons, TextInput, ViewsIcon, DownloadIcon } from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Timeline from "../components/Timeline";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useForm } from "react-hook-form";
// import Select from 'react-bootstrap/Select';
import { Button } from 'react-bootstrap';
import Popup from "reactjs-popup";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import axios from "axios";
import ReactMultiSelct from "../../../../react-components/src/atoms/ReactMultiSelect";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const LicenseAddInfo = ({ t, config, onSelect, userType, formData,formTab, ownerIndex }) => {
  const { pathname: url } = useLocation();
  const userInfo = Digit.UserService.getUser();
  let validation = {};
  let isOpenLinkFlow = window.location.href.includes("openlink");
  
  const [name, setName] = useState((!isOpenLinkFlow ? userInfo?.info?.name: "") || formData?.LicneseDetails?.name || formData?.formData?.LicneseDetails?.name || "");
  const [mobileNumberUser, setMobileNumber] = useState((!isOpenLinkFlow ? userInfo?.info?.mobileNumber: "") ||
    formData?.LicneseDetails?.mobileNumberUser || formData?.formData?.LicneseDetails?.mobileNumberUser || ""
  );
  
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();

  
  const isCitizenUrl = Digit.Utils.browser.isMobile() ? true : false;

  if(isOpenLinkFlow)  
    window.onunload = function () {
      sessionStorage.removeItem("Digit.BUILDING_PERMIT");
    }
    const { isLoading, data: genderTypeData } = Digit.Hooks.obps.useMDMS(stateId, "common-masters", ["GenderType"]);

    let menu = [];
    genderTypeData &&
    genderTypeData["common-masters"].GenderType.filter(data => data.active).map((genderDetails) => {
      menu.push({ i18nKey: `COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });
    
    const [modal, setmodal] = useState(false);
    const [data, setData] = useState([])
    const [devDetail, setdevDetail] = useState([])
    // useEffect(() => {
    //   fetch("https://apisetu.gov.in/mca/v1/companies/U72200CH1998PTC022006").then((result) => {
    //     result.json().then((resp) => {
    //       setData(resp)
    //     })
    //   })
    // }, [])
    // console.warn(data)
    
    const {
      control
    } = useForm();

    
    const optionsArrList = [
      {
        label: "Individual",
        value: "01",
        id: "0",
      },
      {
        label: "Company",
        value: "02",
        id: "1",
      },
      {
        label: "LLP",
        value: "03",
        id: "2",
      },
      {
        label: "Society",
        value: "04",
        id: "3",
      },
    ]
    // onchange = (e) => {
    //   this.setState({ value: e.target.value });
    // };
    const handleChange = (e) => {
      this.setState({ isRadioSelected: true });
    };
    const [showhide0, setShowhide0] = useState("No");
    const [showDevTypeFields, setShowDevTypeFields] = useState("00");
    const [FormSubmitted, setFormSubmitted] = useState(false);
    const [showhide, setShowhide] = useState("No");
    const [cin_Number, setCinNo] = useState(formTab?.LicneseDetails?.cin_Number || formTab?.LicneseDetails?.cin_Number || "");
    const [companyName, setCompanyName] = useState(formTab?.LicneseDetails?.companyName || formTab?.LicneseDetails?.companyName || "");
    const [incorporationDate, setIncorporation] = useState(formTab?.LicneseDetails?.incorporationDate || formTab?.LicneseDetails?.incorporationDate || "");
    const [registeredAddress, setRegistered] = useState(formTab?.LicneseDetails?.registeredAddress || formTab?.LicneseDetails?.registeredAddress || "");
    const [email, setEmail] = useState(formTab?.LicneseDetails?.email || formTab?.LicneseDetails?.email || "");
    const [emailUser, setUserEmail] = useState(formTab?.LicneseDetails?.email || formTab?.LicneseDetails?.email || "");
    const [registeredContactNo, setMobile] = useState(formTab?.LicneseDetails?.registeredContactNo || formTab?.LicneseDetails?.registeredContactNo || "");
    const [gst_Number, setGST] = useState("");
    const [sharName, setTbName] = useState("");
    const [designition, setDesignition] = useState("");
    const [percentage, setPercetage] = useState("");
    const [uploadPdf, setUploadPDF] = useState("");
    const [serialNumber, setSerialNumber] = useState("");
    const [DirectorData,setDirectorData]=useState([]);
    const [modalNAme,setModalNAme]=useState("");
    const [modaldesignition,setModaldesignition]=useState("");
    const [modalPercentage,setModalPercentage]=useState("");
    // const dispatch = useDispatch();
    
    const [modalValuesArray,setModalValuesArray]= useState([]);
    const [financialCapacity,setFinancialCapacity]= useState([]);
    const handleshow = (e) => {
      const getshow = e.target.value;
      setShowhide(getshow);
    };

    function SelectName(e) {
      setName(e.target.value);
    }
    function setMobileNo(e) {
      setMobileNumber(e.target.value);
    }
    // function setUserEmail(e) {
    //   setUserEmailId(e.target.value);
    // }
    
    const handleshow0 = (e) => {
      const getshow = e.target.value;
      setShowhide0(getshow);
      localStorage.setItem('devTypeFlag',getshow)
    };

    const devType = (data) => {
      const getDevTypeValue = data.data;
      setShowDevTypeFields(getDevTypeValue);
      localStorage.setItem('devTypeValueFlag',getDevTypeValue)
    }
  
    const HandleGetMCNdata=async()=>{
      try{
        if (cin_Number.length===21) {
          const Resp = await axios.get(`/mca/v1/companies/${cin_Number}`, {headers:{
            'Content-Type': 'application/json',
            'X-APISETU-APIKEY':'PDSHazinoV47E18bhNuBVCSEm90pYjEF',
            'X-APISETU-CLIENTID':'in.gov.tcpharyana',
            'Access-Control-Allow-Origin':"*",
          }})
  
          const Directory = await axios.get(`/mca-directors/v1/companies/${cin_Number}`, {headers:{
            'Content-Type': 'application/json',
            'X-APISETU-APIKEY':'PDSHazinoV47E18bhNuBVCSEm90pYjEF',
            'X-APISETU-CLIENTID':'in.gov.tcpharyana',
            'Access-Control-Allow-Origin':"*",
          }})
  
          console.log("CIN",Resp.data)
          console.log(Directory.data);
          setDirectorData(Directory.data);
          setCompanyName(Resp.data.companyName)
          setIncorporation(Resp.data.incorporationDate)
          setEmail(Resp.data.email)
          //console.log(Resp.data.Email)
       setRegistered(Resp.data.registeredAddress)
       setMobile(Resp.data.registeredContactNo)
     //  setGST(Resp.data.GST)
  
        }
      }catch(error){
  
        console.log(error.message);
  
      }
  }
  const handleArrayValues=()=>{
    
    if (modalNAme!=="" && modaldesignition!=="" && modalPercentage!=="") {
      
      const values ={
        "name":modalNAme,
        "designition":modaldesignition,
        "percentage":modalPercentage,
        "uploadPdf": null,
        "serialNumber": null
      }
      setModalValuesArray((prev)=>[...prev,values]);
      setmodal(!modal)
    }
  }
  console.log("FORMARRAYVAL",modalValuesArray);
  useEffect(()=>{
    HandleGetMCNdata();
  },[cin_Number])
  
  // const postAddInfo=async()=>{
  
  //   try{
  //     const Resp =  await axios.post("http://localhost:8081/user/developer/_registration",
  //     {headers:{
  //         'Content-Type': 'application/json',
  //         'Access-Control-Allow-origin':"*",
  //     }})
  //     .then((Resp)=>{
  //         console.log("FORMDATA",Resp.devDetail)
  //         return Resp;
  //     })
  
  //   }catch(error){
  //     console.log(error)
  //   }
  // }
  
    const [noofRows, setNoOfRows] = useState(1);
    const [aoofRows, setAoOfRows] = useState(1);
 

    
    
  // if (isLoading) return <Loader />;
  const AddInfoForm = async (e) => {

    if (!(formTab?.result && formTab?.result?.Licenses[0]?.id)) {
      let licenseDet = { 
        cin_Number: cin_Number,
        companyName: companyName,
        incorporationDate: incorporationDate,
        registeredAddress: registeredAddress,
        email: email,
        registeredContactNo: registeredContactNo,
        gst_Number: gst_Number,
        directorsInformation: DirectorData,
        shareHoldingPatterens:modalValuesArray,
        financialCapacity:financialCapacity
      }
      onSelect(config.key, licenseDet);
      console.log("DATALICDET",licenseDet);
      localStorage.setItem("addInfo",JSON.stringify(licenseDet));
    }
    else {
      let data = formTab?.formTab;
      data.LicneseAddInfo.cin_Number = cin_Number;
      data.LicneseAddInfo.companyName = companyName;
      data.LicneseAddInfo.incorporationDate = incorporationDate;
      data.LicneseAddInfo.registeredAddress = registeredAddress;
      data.LicneseAddInfo.registeredContactNo = registeredContactNo;
      onSelect("", formTab)
    }

  };


const onSkip = () => onSelect();

  return (
    <div>
      <div className={isOpenLinkFlow ? "OpenlinkContainer" : ""}>

        {isOpenLinkFlow && <BackButton style={{ border: "none" }}>{t("CS_COMMON_BACK")}</BackButton>}
        <Timeline currentStep={2} flow="STAKEHOLDER" />
        {!isLoading ? 
        <FormStep 
          // onSubmit={AddInfoForm}
          config={config}
          onSelect={AddInfoForm}
          onSkip={onSkip}
          t={t}
        >
          <div className="happy">
            <div className="card mb-3">
              <h5 className="card-title fw-bold">Developer's type</h5>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group row">
                      <div className="col-sm-3">

                        <ReactMultiSelct
                          listOfData={optionsArrList}
                          labels="Selct Type"
                          getSelectedValue={devType}
                        />
                        {/* <MuiDropdown 
                          listOfData={optionsArrList}
                          labels="text"
                        /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FOR INDIVIDUAL */}
            {showDevTypeFields === "01" && (
            <div className="card mb-3">
              {/* <div className="card-header">
              <h5 className="card-title"> Developer</h5>
            </div> */}
              <h5 className="card-title fw-bold">Developer Details</h5>
              <div className="card-body">
                <div className="row">
                  <div className="col col-4">
                    <div className="form-group">

                      <label htmlFor="name">Name</label>

                      <input
                        type="text"
                        value={name}
                        name="name"
                        // onChange={SelectName}
                        onChange={(e) => SelectName(e.target.value)}
                        disabled="disabled"
                        className="employee-card-input"
                      // placeholder=""
                      // {...register("name", {
                      //   required: "Name is required",
                      //   pattern: {
                      //     value: /^[a-zA-Z]+$/,
                      //     message: "Name must be a valid string",
                      //   },
                      //   minLength: {
                      //     value: 3,
                      //     message:
                      //       "Name should be greater than 3 characters",
                      //   },
                      //   maxLength: {
                      //     value: 20,
                      //     message:
                      //       "Name shouldn't be greater than 20 characters",
                      //   },
                      // })}
                      />
                    </div>
                  </div>
                  {/* <div className="col col-4">
                    <div className="form-group">
                      <label htmlFor="name">Registered Address</label>
                      <input
                        type="text"
                        value={registeredAddress}
                      placeholder={registeredAddress}
                        className="employee-card-input"
                      name="name"
                      className={`employee-card-input`}
                      placeholder=""
                      {...register("name", {
                        required: "Name is required",
                        pattern: {
                          value: /^[a-zA-Z]+$/,
                          message: "Name must be a valid string",
                        },
                        minLength: {
                          value: 3,
                          message:
                            "Name should be greater than 3 characters",
                        },
                        maxLength: {
                          value: 20,
                          message:
                            "Name shouldn't be greater than 20 characters",
                        },
                      })}
                      />
                    </div>
                  </div> */}
                  <div className="col col-4">
                    <div className="form-group ">
                      <label htmlFor="email"> Email </label>
                      <input
                        type="text"
                        value={emailUser}
                        placeholder={emailUser}
                        disabled="disabled"
                        className="employee-card-input"
                      // name="email"
                      // className={`employee-card-input`}
                      // placeholder=""
                      // {...register("email", {
                      //   required: "Email is required",
                      //   pattern: {
                      //     value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                      //     message: "Email must be a valid email address",
                      //   },
                      // })}
                      />
                      {/* <div className="invalid-feedback">
                        {errors?.email?.message}
                      </div> */}
                    </div>
                  </div>
                  <div className="col col-4">
                    <div className="form-group">
                      <label htmlFor="name">Mobile No.</label>
                      <input
                        value={mobileNumberUser}
                        name="mobileNumberUser"
                        onChange={(value) => setMobileNo({ target: { value } })}
                        disabled="disabled"
                        className="employee-card-input"
                      // name="name"
                      // className={`employee-card-input`}
                      // placeholder=""
                      // {...register("name", {
                      //   required: "Name is required",
                      //   pattern: {
                      //     value: /^[a-zA-Z]+$/,
                      //     message: "Name must be a valid string",
                      //   },
                      //   minLength: {
                      //     value: 3,
                      //     message:
                      //       "Name should be greater than 3 characters",
                      //   },
                      //   maxLength: {
                      //     value: 20,
                      //     message:
                      //       "Name shouldn't be greater than 20 characters",
                      //   },
                      // })}
                      />
                      {/* <div className="invalid-feedback">
                        {errors?.name?.message}
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}
          
            {/* FOR COMPANY */}
            {showDevTypeFields === "02" && (
            <div className="card mb-3">
              {/* <div className="card-header">
              <h5 className="card-title"> Developer</h5>
            </div> */}
              <h5 className="card-title fw-bold">Developer Details</h5>
              <div className="card-body">
                <div className="row">
                  <div className="col col-4">
                    <div className="form-group">
                      <label htmlFor="name">CIN Number</label>
                      <input
                        type="text"
                        onChange={(e) => setCinNo(e.target.value)}
                        value={cin_Number}
                        className="employee-card-input"
                      // placeholder=""
                      // {...register("name", {
                      //   required: "Name is required",
                      //   pattern: {
                      //     value: /^[a-zA-Z]+$/,
                      //     message: "Name must be a valid string",
                      //   },
                      //   minLength: {
                      //     value: 3,
                      //     message:
                      //       "Name should be greater than 3 characters",
                      //   },
                      //   maxLength: {
                      //     value: 20,
                      //     message:
                      //       "Name shouldn't be greater than 20 characters",
                      //   },
                      // })}
                      />
                    </div>
                  </div>
                  <div className="col col-4">
                    <div className="form-group">

                      <label htmlFor="name">Company Name</label>

                      <input
                        type="text"
                        value={companyName}
                        placeholder={companyName}
                        disabled="disabled"
                        className="employee-card-input"
                      // placeholder=""
                      // {...register("name", {
                      //   required: "Name is required",
                      //   pattern: {
                      //     value: /^[a-zA-Z]+$/,
                      //     message: "Name must be a valid string",
                      //   },
                      //   minLength: {
                      //     value: 3,
                      //     message:
                      //       "Name should be greater than 3 characters",
                      //   },
                      //   maxLength: {
                      //     value: 20,
                      //     message:
                      //       "Name shouldn't be greater than 20 characters",
                      //   },
                      // })}
                      />
                    </div>
                  </div>
                  <div className="col col-4">
                    <div className="form-group">
                      <label htmlFor="name">Date of Incorporation</label>
                      <input
                        type="text"
                        value={incorporationDate}
                        placeholder={incorporationDate}
                        disabled="disabled"
                        className="employee-card-input"
                      // placeholder=""
                      // {...register("name", {
                      //   required: "Name is required",
                      //   pattern: {
                      //     value: /^[a-zA-Z]+$/,
                      //     message: "Name must be a valid string",
                      //   },
                      //   minLength: {
                      //     value: 3,
                      //     message:
                      //       "Name should be greater than 3 characters",
                      //   },
                      //   maxLength: {
                      //     value: 20,
                      //     message:
                      //       "Name shouldn't be greater than 20 characters",
                      //   },
                      // })}
                      />
                    </div>
                  </div>
                  <div className="col col-4">
                    <div className="form-group">
                      <label htmlFor="name">Registered Address</label>
                      <input
                        type="text"
                        value={registeredAddress}
                        placeholder={registeredAddress}
                        disabled="disabled"
                        className="employee-card-input"
                      // name="name"
                      // className={`employee-card-input`}
                      // placeholder=""
                      // {...register("name", {
                      //   required: "Name is required",
                      //   pattern: {
                      //     value: /^[a-zA-Z]+$/,
                      //     message: "Name must be a valid string",
                      //   },
                      //   minLength: {
                      //     value: 3,
                      //     message:
                      //       "Name should be greater than 3 characters",
                      //   },
                      //   maxLength: {
                      //     value: 20,
                      //     message:
                      //       "Name shouldn't be greater than 20 characters",
                      //   },
                      // })}
                      />
                    </div>
                  </div>
                  <div className="col col-4">
                    <div className="form-group ">
                      <label htmlFor="email"> Email </label>
                      <input
                        type="text"
                        value={email}
                        placeholder={email}
                        disabled="disabled"
                        className="employee-card-input"
                      // name="email"
                      // className={`employee-card-input`}
                      // placeholder=""
                      // {...register("email", {
                      //   required: "Email is required",
                      //   pattern: {
                      //     value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                      //     message: "Email must be a valid email address",
                      //   },
                      // })}
                      />
                      {/* <div className="invalid-feedback">
                        {errors?.email?.message}
                      </div> */}
                    </div>
                  </div>
                  <div className="col col-4">
                    <div className="form-group">
                      <label htmlFor="name">Mobile No.</label>
                      <input
                        type="text"
                        value={registeredContactNo}
                        placeholder={registeredContactNo}
                        disabled="disabled"
                        className="employee-card-input"
                      // name="name"
                      // className={`employee-card-input`}
                      // placeholder=""
                      // {...register("name", {
                      //   required: "Name is required",
                      //   pattern: {
                      //     value: /^[a-zA-Z]+$/,
                      //     message: "Name must be a valid string",
                      //   },
                      //   minLength: {
                      //     value: 3,
                      //     message:
                      //       "Name should be greater than 3 characters",
                      //   },
                      //   maxLength: {
                      //     value: 20,
                      //     message:
                      //       "Name shouldn't be greater than 20 characters",
                      //   },
                      // })}
                      />
                      {/* <div className="invalid-feedback">
                        {errors?.name?.message}
                      </div> */}
                    </div>
                  </div>
                  <div className="col col-4">
                    <div className="form-group">
                      <label htmlFor="name">GST No.</label>
                      <input
                        type="text"
                        value={gst_Number}
                      placeholder={gst_Number}
                        className="employee-card-input"
                      // className={`employee-card-input`}
                      // placeholder=""
                      // {...register("name", {
                      //   required: "Name is required",
                      //   pattern: {
                      //     value: /^[a-zA-Z]+$/,
                      //     message: "Name must be a valid string",
                      //   },
                      //   minLength: {
                      //     value: 3,
                      //     message:
                      //       "Name should be greater than 3 characters",
                      //   },
                      //   maxLength: {
                      //     value: 20,
                      //     message:
                      //       "Name shouldn't be greater than 20 characters",
                      //   },
                      // })}
                      />
                      {/* <div className="invalid-feedback">
                        {errors?.name?.message}
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}
            {showDevTypeFields === "02" && (
            <div className="card mb-3">
            <h5 className="card-title fw-bold">Shareholding Patterns</h5>
              <div className="card-body">
                <div className="table-bd">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Sr. No</th>
                        <th>Name</th>
                        <th>Designition</th>
                        <th>Percentage</th>
                        <th>View PDF</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        (modalValuesArray.length>0)?
                        modalValuesArray.map((elementInArray, input) => {
                          return (
                            <tr>
                              <td>{input+ 1}</td>
                              <td>
                                <input
                                  type="text"
                                  value={elementInArray.name}
                                  placeholder={elementInArray.name}
                                  readOnly
                                  disabled="disabled"
                                  class="employee-card-input"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  value={elementInArray.designition}
                                  placeholder={elementInArray.designition}
                                  readOnly
                                  disabled="disabled"
                                  class="employee-card-input"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  value={elementInArray.percentage}
                                  placeholder={elementInArray.percentage}
                                  readOnly
                                  disabled="disabled"
                                  class="employee-card-input"
                                />
                              </td>
                              <td>
                                <div className="row">
                                  <button className="btn btn-sm col-md-6">
                                    <VisibilityIcon color="info" className="icon" />
                                  </button>
                                  <button className="btn btn-sm col-md-6">
                                    <FileDownloadIcon color="primary"  />
                                  </button>
                                
                                </div>
                              </td>
                            </tr>
                          );
                        })
                        :
                        <p>Click on the Add More Button</p>
                      }
                    </tbody>
                  </table>
                </div>
                {/* <div className="form-group col-md2 mt-4">
                      <button  className="btn btn-success" >Add More
                        
                      </button>
                    </div> */}

                {/* <button
                    type="button"
                    style={{ float: "left" }}
                    className="btn btn-primary"
                    onClick={() => setNoOfRows(noofRows + 1)}
                  >
                    Add More
                  </button> */}
                <div>
                  <button
                    type="button"
                    style={{
                      color: "white",
                    }}
                    className="btn btn-primary mt-3"
                    // onClick={() => setNoOfRows(noofRows + 1)}
                    onClick={() => setmodal(true)}
                  >
                    Add More
                  </button>

                  <div>
                    <Modal
                      size="lg"
                      isOpen={modal}
                      toggle={() => setmodal(!modal)}
                    >
                      <ModalHeader
                        toggle={() => setmodal(!modal)}
                      ></ModalHeader>

                      <ModalBody>
                        <div className="card2">
                          <div className="popupcard">
                            
                            <form className="text1">
                              <Row>
                                <Col md={3} xxl lg="4">
                                  <label htmlFor="name" className="text">Name</label>
                                  <input
                                    type="text"
                                    
                                    onChange={(e)=>setModalNAme(e.target.value)}
                                    placeholder=""
                                    class="employee-card-input"
                                  />
                                </Col>
                                <Col md={3} xxl lg="4">
                                  <label htmlFor="name" className="text">	Designition</label>
                                  <input
                                    type="text"
                                    
                                    onChange={(e)=>setModaldesignition(e.target.value)}
                                    placeholder=""
                                    class="employee-card-input"
                                  />
                                </Col>

                                <Col md={3} xxl lg="4">
                                  <label htmlFor="name" className="text">Percentage</label>
                                  <input
                                    type="flot"
                                    
                                    onChange={(e)=>setModalPercentage(e.target.value)}
                                    placeholder=""
                                    class="employee-card-input"
                                  />
                                </Col>
                                <Col md={3} xxl lg="4">
                                  <label htmlFor="name" className="text">Upload PDF</label>
                                  <input
                                    type="file"
                                    value={uploadPdf}
                                    placeholder=""
                                    class="employee-card-input"
                                  />
                                </Col>

                              </Row>
                            </form>

                          </div>
                          <div className="submit-btn">
                            <div className="form-group col-md6 mt-6">
                              <button
                                type="button"
                                style={{ float: "right" }}
                                className="btn btn-success"
                                onClick={handleArrayValues}
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </ModalBody>
                      <ModalFooter
                        toggle={() => setmodal(!modal)}
                      ></ModalFooter>
                    </Modal>
                  </div>
                </div>
                {/* <button
                    type="button"
                    style={{ float: "right" }}
                    className="btn btn-danger"
                    onClick={() => setNoOfRows(noofRows - 1)}
                  >
                    Remove
                  </button> */}

                {/* <div className="form-group">
                      <button type="submit" className="btn btn-success">
                        {" "}
                        Save{" "}
                      </button>
                    </div> */}
              </div>
            </div>
             )}
            {showDevTypeFields === "02" && (
            <div className="card mb-3">
            <h5 className="card-title fw-bold">Directors Information</h5>
              <div className="card-body">
                <div className="table-bd">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Sr. No</th>
                        <th>DIN Number</th>
                        <th>Name</th>
                        <th>PAN Number</th>
                        <th>Upload PDF</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DirectorData.map((elementInArray, input) => {
                        return (
                          <tr key={input}>
                            <td>{input+1}</td>
                            <td>
                              <input
                                type="text"
                                disabled="disabled"
                                value={elementInArray.din}
                                placeholder={elementInArray.din}
                                class="employee-card-input"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                disabled="disabled"
                                value={elementInArray.name}
                                placeholder={elementInArray.name}
                                class="employee-card-input"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                value={elementInArray.contactNumber}
                                placeholder={elementInArray.contactNumber}
                                class="employee-card-input"
                              />
                            </td>
                            <td>
                              <input
                                type="file"
                                value={uploadPdf}
                                placeholder=""
                                class="employee-card-input"
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                
              </div>
            </div>
            )}

            {/* FOR COMPANY */}
            {showDevTypeFields === "03" && (
            <div className="card mb-3">
              {/* <div className="card-header">
              <h5 className="card-title"> Developer</h5>
            </div> */}
              <h5 className="card-title fw-bold">Developer Details</h5>
              <div className="card-body">
                <div className="row">
                  <div className="col col-4">
                    <div className="form-group">
                      <label htmlFor="name">CIN Number</label>
                      <input
                        type="text"
                        onChange={(e) => setCinNo(e.target.value)}
                        value={cin_Number}
                        className="employee-card-input"
                      // placeholder=""
                      // {...register("name", {
                      //   required: "Name is required",
                      //   pattern: {
                      //     value: /^[a-zA-Z]+$/,
                      //     message: "Name must be a valid string",
                      //   },
                      //   minLength: {
                      //     value: 3,
                      //     message:
                      //       "Name should be greater than 3 characters",
                      //   },
                      //   maxLength: {
                      //     value: 20,
                      //     message:
                      //       "Name shouldn't be greater than 20 characters",
                      //   },
                      // })}
                      />
                    </div>
                  </div>
                  <div className="col col-4">
                    <div className="form-group">

                      <label htmlFor="name">LLP Pin</label>

                      <input
                        type="text"
                        disabled="disabled"
                        value={companyName}
                        placeholder={companyName}
                        className="employee-card-input"
                      // placeholder=""
                      // {...register("name", {
                      //   required: "Name is required",
                      //   pattern: {
                      //     value: /^[a-zA-Z]+$/,
                      //     message: "Name must be a valid string",
                      //   },
                      //   minLength: {
                      //     value: 3,
                      //     message:
                      //       "Name should be greater than 3 characters",
                      //   },
                      //   maxLength: {
                      //     value: 20,
                      //     message:
                      //       "Name shouldn't be greater than 20 characters",
                      //   },
                      // })}
                      />
                    </div>
                  </div>
                  <div className="col col-4">
                    <div className="form-group">
                      <label htmlFor="name">Date of Incorporation</label>
                      <input
                        type="text"
                        disabled="disabled"
                        value={incorporationDate}
                        placeholder={incorporationDate}
                        className="employee-card-input"
                      // placeholder=""
                      // {...register("name", {
                      //   required: "Name is required",
                      //   pattern: {
                      //     value: /^[a-zA-Z]+$/,
                      //     message: "Name must be a valid string",
                      //   },
                      //   minLength: {
                      //     value: 3,
                      //     message:
                      //       "Name should be greater than 3 characters",
                      //   },
                      //   maxLength: {
                      //     value: 20,
                      //     message:
                      //       "Name shouldn't be greater than 20 characters",
                      //   },
                      // })}
                      />
                    </div>
                  </div>
                  <div className="col col-4">
                    <div className="form-group">
                      <label htmlFor="name">Registered Address</label>
                      <input
                        type="text"
                        disabled="disabled"
                        value={registeredAddress}
                        placeholder={registeredAddress}
                        className="employee-card-input"
                      // name="name"
                      // className={`employee-card-input`}
                      // placeholder=""
                      // {...register("name", {
                      //   required: "Name is required",
                      //   pattern: {
                      //     value: /^[a-zA-Z]+$/,
                      //     message: "Name must be a valid string",
                      //   },
                      //   minLength: {
                      //     value: 3,
                      //     message:
                      //       "Name should be greater than 3 characters",
                      //   },
                      //   maxLength: {
                      //     value: 20,
                      //     message:
                      //       "Name shouldn't be greater than 20 characters",
                      //   },
                      // })}
                      />
                    </div>
                  </div>
                  <div className="col col-4">
                    <div className="form-group ">
                      <label htmlFor="email"> Email </label>
                      <input
                        type="text"
                        disabled="disabled"
                        value={email}
                        placeholder={email}
                        className="employee-card-input"
                      // name="email"
                      // className={`employee-card-input`}
                      // placeholder=""
                      // {...register("email", {
                      //   required: "Email is required",
                      //   pattern: {
                      //     value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                      //     message: "Email must be a valid email address",
                      //   },
                      // })}
                      />
                      {/* <div className="invalid-feedback">
                        {errors?.email?.message}
                      </div> */}
                    </div>
                  </div>
                  <div className="col col-4">
                    <div className="form-group">
                      <label htmlFor="name">Mobile No.</label>
                      <input
                        type="text"
                        disabled="disabled"
                        value={registeredContactNo}
                        placeholder={registeredContactNo}
                        className="employee-card-input"
                      // name="name"
                      // className={`employee-card-input`}
                      // placeholder=""
                      // {...register("name", {
                      //   required: "Name is required",
                      //   pattern: {
                      //     value: /^[a-zA-Z]+$/,
                      //     message: "Name must be a valid string",
                      //   },
                      //   minLength: {
                      //     value: 3,
                      //     message:
                      //       "Name should be greater than 3 characters",
                      //   },
                      //   maxLength: {
                      //     value: 20,
                      //     message:
                      //       "Name shouldn't be greater than 20 characters",
                      //   },
                      // })}
                      />
                      {/* <div className="invalid-feedback">
                        {errors?.name?.message}
                      </div> */}
                    </div>
                  </div>
                  <div className="col col-4">
                    <div className="form-group">
                      <label htmlFor="name">GST No.</label>
                      <input
                        type="text"
                        value={gst_Number}
                      placeholder={gst_Number}
                        className="employee-card-input"
                      // className={`employee-card-input`}
                      // placeholder=""
                      // {...register("name", {
                      //   required: "Name is required",
                      //   pattern: {
                      //     value: /^[a-zA-Z]+$/,
                      //     message: "Name must be a valid string",
                      //   },
                      //   minLength: {
                      //     value: 3,
                      //     message:
                      //       "Name should be greater than 3 characters",
                      //   },
                      //   maxLength: {
                      //     value: 20,
                      //     message:
                      //       "Name shouldn't be greater than 20 characters",
                      //   },
                      // })}
                      />
                      {/* <div className="invalid-feedback">
                        {errors?.name?.message}
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}
            {showDevTypeFields === "03" && (
            <div className="card mb-3">
            <h5 className="card-title fw-bold">Shareholding Patterns</h5>
              <div className="card-body">
                <div className="table-bd">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Sr. No</th>
                        <th>Name</th>
                        <th>Designition</th>
                        <th>Percentage</th>
                        <th>View PDF</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        (modalValuesArray.length>0)?
                        modalValuesArray.map((elementInArray, input) => {
                          return (
                            <tr>
                              <td>{input+ 1}</td>
                              <td>
                                <input
                                  type="text"
                                  value={elementInArray.name}
                                  placeholder={elementInArray.name}
                                  readOnly
                                  disabled="disabled"
                                  class="employee-card-input"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  value={elementInArray.designition}
                                  placeholder={elementInArray.designition}
                                  readOnly
                                  disabled="disabled"
                                  class="employee-card-input"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  value={elementInArray.percentage}
                                  placeholder={elementInArray.percentage}
                                  readOnly
                                  disabled="disabled"
                                  class="employee-card-input"
                                />
                              </td>
                              <td>
                                <div className="text-center">
                                  <button className="btn btn-success btn-sm">View</button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                        :
                        <p>Click on the Add More Button</p>
                      }
                    </tbody>
                  </table>
                </div>
                {/* <div className="form-group col-md2 mt-4">
                      <button  className="btn btn-success" >Add More
                        
                      </button>
                    </div> */}

                {/* <button
                    type="button"
                    style={{ float: "left" }}
                    className="btn btn-primary"
                    onClick={() => setNoOfRows(noofRows + 1)}
                  >
                    Add More
                  </button> */}
                <div>
                  <button
                    type="button"
                    style={{
                      color: "white",
                    }}
                    className="btn btn-primary mt-3"
                    // onClick={() => setNoOfRows(noofRows + 1)}
                    onClick={() => setmodal(true)}
                  >
                    Add More
                  </button>

                  <div>
                    <Modal
                      size="lg"
                      isOpen={modal}
                      toggle={() => setmodal(!modal)}
                    >
                      <ModalHeader
                        toggle={() => setmodal(!modal)}
                      ></ModalHeader>

                      <ModalBody>
                        <div className="card2">
                          <div className="popupcard">
                            
                            <form className="text1">
                              <Row>
                                <Col md={3} xxl lg="4">
                                  <label htmlFor="name" className="text">Name</label>
                                  <input
                                    type="text"
                                    
                                    onChange={(e)=>setModalNAme(e.target.value)}
                                    placeholder=""
                                    class="employee-card-input"
                                  />
                                </Col>
                                <Col md={3} xxl lg="4">
                                  <label htmlFor="name" className="text">	Designition</label>
                                  <input
                                    type="text"
                                    
                                    onChange={(e)=>setModaldesignition(e.target.value)}
                                    placeholder=""
                                    class="employee-card-input"
                                  />
                                </Col>

                                <Col md={3} xxl lg="4">
                                  <label htmlFor="name" className="text">Percentage</label>
                                  <input
                                    type="flot"
                                    
                                    onChange={(e)=>setModalPercentage(e.target.value)}
                                    placeholder=""
                                    class="employee-card-input"
                                  />
                                </Col>
                                <Col md={3} xxl lg="4">
                                  <label htmlFor="name" className="text">Upload PDF</label>
                                  <input
                                    type="file"
                                    value={uploadPdf}
                                    placeholder=""
                                    class="employee-card-input"
                                  />
                                </Col>

                              </Row>
                            </form>

                          </div>
                          <div className="submit-btn">
                            <div className="form-group col-md6 mt-6">
                              <button
                                type="button"
                                style={{ float: "right" }}
                                className="btn btn-success"
                                onClick={handleArrayValues}
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </ModalBody>
                      <ModalFooter
                        toggle={() => setmodal(!modal)}
                      ></ModalFooter>
                    </Modal>
                  </div>
                </div>
                {/* <button
                    type="button"
                    style={{ float: "right" }}
                    className="btn btn-danger"
                    onClick={() => setNoOfRows(noofRows - 1)}
                  >
                    Remove
                  </button> */}

                {/* <div className="form-group">
                      <button type="submit" className="btn btn-success">
                        {" "}
                        Save{" "}
                      </button>
                    </div> */}
              </div>
            </div>
             )}
            {showDevTypeFields === "03" && (
            <div className="card mb-3">
            <h5 className="card-title fw-bold">Directors Information</h5>
              <div className="card-body">
                <div className="table-bd">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Sr. No</th>
                        <th>DIN Number</th>
                        <th>Name</th>
                        <th>PAN Number</th>
                        <th>Upload PDF</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DirectorData.map((elementInArray, input) => {
                        return (
                          <tr key={input}>
                            <td>{input}</td>
                            <td>
                              <input
                                type="text"
                                disabled="disabled"
                                value={elementInArray.din}
                                placeholder={elementInArray.din}
                                class="employee-card-input"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                disabled="disabled"
                                value={elementInArray.name}
                                placeholder={elementInArray.name}
                                class="employee-card-input"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                disabled="disabled"
                                value={elementInArray.contactNumber}
                                placeholder={elementInArray.contactNumber}
                                class="employee-card-input"
                              />
                            </td>
                            <td>
                              <input
                                type="file"
                                value={uploadPdf}
                                placeholder=""
                                class="employee-card-input"
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                
              </div>
            </div>
            )}
            {/* <div className="col-md-12 text-end">
              <button
                className="btn btn-success"
              >
                Save and Continue
              </button>
            </div> */}
          </div>

        </FormStep>:<Loader />}
      </div>
    </div>
  );
};

export default LicenseAddInfo;