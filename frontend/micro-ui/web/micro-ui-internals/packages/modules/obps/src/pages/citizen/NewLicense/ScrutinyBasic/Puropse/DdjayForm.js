import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { useForm } from "react-hook-form";
// import { tr, thead, TableContainer, td, tbody, Table, Paper } from '@material-ui/core';
// import AddIcon from "@material-ui/icons/Add";
// import DeleteIcon from "@material-ui/icons/Delete";
import { Button, Form } from "react-bootstrap";
import { Card, Row, Col } from "react-bootstrap";
// import CalculateIcon from '@mui/icons-material/Calculate';

const DDJAYForm = (props) => {

  const { register, handleSubmit, formState: { errors } } = useForm([{ XLongitude: '', YLatitude: '' }]);
  const formSubmit = (data) => {
    console.log("data", data);
  };
  const [DdjayFormSubmitted, SetDdjayFormSubmitted] = useState(false);
  const DDJAYFormSubmitHandler = (e) => {
    e.preventDefault();
    SetDdjayFormSubmitted(true);
  }
  const [showhide, setShowhide] = useState("No");
  const [showhide1, setShowhide1] = useState("No");
  const [showhide0, setShowhide0] = useState("No");
  const [showhide2, setShowhide2] = useState("No");
  const [showhide3, setShowhide3] = useState("No");
  const [showhide4, setShowhide4] = useState("No");
  const [showhide5, setShowhide5] = useState("No");
  const [showhide6, setShowhide6] = useState("No");
  const [showhide7, setShowhide7] = useState("No");
  const [showhide8, setShowhide8] = useState("No");
  const [showhide9, setShowhide9] = useState("No");
  const [showhide10, setShowhide10] = useState("No");
  const [showhide11, setShowhide11] = useState("No");
  const [showhide12, setShowhide12] = useState("No");
  const [showhide13, setShowhide13] = useState("No");
  const [showhide14, setShowhide14] = useState("No");
  const [showhide18, setShowhide18] = useState("2");

  const handleshow = e => {
    const getshow = e.target.value;
    setShowhide(getshow);
  }
  const handleshow0 = e => {
    const getshow = e.target.value;
    setShowhide0(getshow);
  }
  const handleshow1 = e => {
    const getshow = e.target.value;
    setShowhide1(getshow);
  }
  const handleshow2 = e => {
    const getshow = e.target.value;
    setShowhide2(getshow);
  }
  const handleshow3 = e => {
    const getshow = e.target.value;
    setShowhide3(getshow);
  }
  const handleshow4 = e => {
    const getshow = e.target.value;
    setShowhide4(getshow);
  }
  const handleshow5 = e => {
    const getshow = e.target.value;
    setShowhide5(getshow);
  }
  const handleshow6 = e => {
    const getshow = e.target.value;
    setShowhide6(getshow);
  }
  const handleshow7 = e => {
    const getshow = e.target.value;
    setShowhide7(getshow);
  }
  const handleshow8 = e => {
    const getshow = e.target.value;
    setShowhide8(getshow);
  }
  const handleshow9 = e => {
    const getshow = e.target.value;
    setShowhide9(getshow);
  }
  const handleshow10 = e => {
    const getshow = e.target.value;
    setShowhide10(getshow);
  }
  const handleshow11 = e => {
    const getshow = e.target.value;
    setShowhide11(getshow);
  }
  const handleshow12 = e => {
    const getshow = e.target.value;
    setShowhide12(getshow);
  }
  const handleshow13 = e => {
    const getshow = e.target.value;
    setShowhide13(getshow);
  }
  const handleshow14 = e => {
    const getshow = e.target.value;
    setShowhide14(getshow);
  }
  const handleshow18 = e => {
    const getshow = e.target.value;
    setShowhide18(getshow);
  }

  const handleChange = (e) => {
    this.setState({ isRadioSelected: true });

  }
  useEffect(() => {
    if (DdjayFormSubmitted) {
      props.DdjayFormSubmit(true);
    }
  }, [DdjayFormSubmitted]);

  return (
    <Form onSubmit={DDJAYFormSubmitHandler} style={{ display: props.displayDdjay }}>
      <Form.Group className="justify-content-center" controlId="formBasicEmail">
        <Row className="ml-auto" style={{ marginBottom: 5 }}>
          <Col col-12>
            <h5 className="text-black"><b>Deen Dayal Jan Awas Yojna (DDJAY):-</b></h5>

            <div className="table table-bordered table-responsive">
              <thead>
                <tr>
                  <td><b>Detail of plots</b></td>
                  <td ><b>No.</b></td>
                  <td ><b>Area</b></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td >
                    <div className="px-2">
                      <p className="mb-2" ><b>Details of frozen plots (50%)
                      </b></p>
                    </div>
                  </td>
                  <td align="right">  <input type="number" className="form-control" /></td>
                  <td component="th" scope="row">
                    <input type="number" className="form-control" />
                  </td>
                </tr>
              </tbody>
            </div>

            <br></br>
            <div className="row">
              <div className="col col-12">
                <h6><b> Whether one organizes open space/pocket of min area 0.3 acre proposed in the layout plan (Yes/No)</b>&nbsp;&nbsp;


                  <input type="radio" value="Yes" id="Yes"
                    onChange1={handleChange} name="Yes" onClick={handleshow12} />&nbsp;&nbsp;
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;

                  <input type="radio" value="No" id="No"
                    onChange1={handleChange} name="Yes" onClick={handleshow12} />&nbsp;&nbsp;
                  <label className="m-0 mx-2" for="No">No</label></h6>
                {
                  showhide12 === "Yes" && (
                    <div className="row " >
                      <div className="col col-6">
                        <label for="parentLicense" className="font-weight-bold">Area of such Pocket (in acres)</label>
                        <input type="text" className="form-control" />
                      </div>

                    </div>

                  )
                }
              </div>
            </div>
          </Col>
        </Row>
      </Form.Group>
    </Form>)
};
export default DDJAYForm;
