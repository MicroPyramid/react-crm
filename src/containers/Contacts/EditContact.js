import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  TextField,
  TextareaAutosize,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Typography,
  Box,
  Switch,
  styled
} from '@mui/material';
import '../Leads/lead_css.css';
import { makeStyles } from '@mui/styles';
import isEmail from 'validator/lib/isEmail';

import { UseContactForm } from "../../components/UseContactForm";
import { ContactUrl } from '../../components/ApiUrls'
import { fetchData } from "../../components/FetchData";
import { Appbar } from "../../components/Appbar";

const useStyles = makeStyles({
  chipStyle: {
    backgroundColor: "red",
  }
})
const textFieldStyled = makeStyles(() => ({
  root: {
    borderLeft: "2px solid red",
    height: "35px"
  },
  fieldHeight: {
    height: "35px"
  }
}))

export function EditContact(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [assignTo, setAssignTo] = useState([]);
  const [status, setStatus] = useState([]);
  const [source, setSource] = useState([]);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const [checked, setChecked] = useState(state.newvalue.do_not_call);
  const [responceError, setResponceError] = useState(false);
  const classes = useStyles();
  const textFieldClasses = textFieldStyled();

  const handleChange = (target, key) => {
    if (target.name === "assign_to") {
      let newKey = []
      newKey.push((key.key).replace(/[^0-9]/g, "", '$'))
      val.assigned_to = JSON.stringify(newKey)
      setAssignTo(target.value)
    } else if (target.name === "status") {
      val.status = target.value
      setStatus(target.value)
    } else if (target.name === "source") {
      val.source = target.value
      setSource(target.value)
    } else if (target.name === "industry") {
      val.industry = target.value
    } else if (target.name === "do_not_call") {
      setChecked(target.checked);
      val.do_not_call = !checked
    }
  }

  const tagsHandle = (event, value) => {
    val.tags = JSON.stringify(value)
  }

  const assignToHandle = (event, value) => {
    let newKey = []
    let stringVal = ""
    value.map((item) => {
      stringVal =
        newKey.push(item.id.toString())
    })
    val.assigned_to = JSON.stringify(newKey)
  }

  const validatation = () => {
    let flag = true
    if (!(val.hasOwnProperty('salutation')) || val.title === "") {
      flag = false
      setError("*required  field")
      setMsg('salutation')
    } else if (!(val.hasOwnProperty('first_name')) || val.opportunity_amount === "") {
      flag = false
      setError("*required field")
      setMsg('first_name')
    }
    else if (!(val.hasOwnProperty('last_name')) || val.first_name === "") {
      setError("*required field")
      setMsg('last_name')
      flag = false
    } else if (!(val.hasOwnProperty('title')) || val.first_name === "") {
      setError("*required field")
      setMsg('title')
      flag = false
    }
    else if ((val.hasOwnProperty('primary_email'))) {
      let validEmail = isEmail(val.primary_email)
      if (validEmail === false) {
        setError("*email is not valid")
        setMsg('primary_email')
        flag = false
      }
    } else if ((val.hasOwnProperty('secondary_email'))) {
      let validEmail = isEmail(val.secondary_email)
      if (validEmail === false) {
        setError("*email is not valid")
        setMsg('secondary_email')
        flag = false
      }
    } else if (!(val.hasOwnProperty('address_line')) || val.address_line === "") {
      setError("*required address field")
      setMsg('address_line')
      flag = false
    }
    else {
      setError("")
      setMsg('')
    }
    return flag
  }

  const submitCallBack = () => {

    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `jwt ${localStorage.getItem("Token")}`,
      org: 'localStorage.getItem("org")'
    };

    if (validatation()) {
      fetchData(`${ContactUrl}/${state.newvalue.id}/`, "PUT", JSON.stringify(val), headers)
        .then((data) => {
          if (!data.error) {
            setResponceError(data.error);
            navigate('/contacts')
          }
        })
        .catch((error) => {
        });
    }
  };

  const backbtnHandle = () => {
    navigate('/contacts');
  }

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));

  const [val, onChange, onSubmit] = UseContactForm(submitCallBack);

  const module = "Contacts";
  const backBtn = "Back To Contact";
  const crntPage = "Edit Contact";

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Appbar module={module} backBtn={backBtn} crntPage={crntPage} backbtnHandle={backbtnHandle} />
        {/* contact details */}
        <div style={{ padding: "10px" }}>
          <div className="leadContainer">
            <Accordion style={{ width: "98%" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <div className="typography">
                  <Typography style={{ marginBottom: "15px", fontWeight: "bold" }}>Basic Information</Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ width: '98%', color: "#1A3353" }}
                  component="form"
                  noValidate
                  autoComplete="off">
                  <div className="fieldContainer">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Salution</div>
                      <TextField
                        name="salutation"
                        id="outlined-error-helper-text"
                        defaultValue={state.newvalue && state.newvalue.salutation}
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                      >
                      </TextField>
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">First Name</div>
                      <TextField
                        defaultValue={state.newvalue && state.newvalue.first_name}
                        name="first_name"
                        id="outlined-error-helper-text"
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small">
                      </TextField>
                    </div>
                  </div>
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Last Name</div>
                      <TextField
                        name="last_name"
                        defaultValue={state.newvalue && state.newvalue.last_name}
                        id="outlined-error-helper-text"
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        onChange={onChange}
                        style={{ width: "70%" }}
                        size="small"
                      />
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Date Of Birth</div>
                      <TextField
                        name="date_of_birth"
                        id="outlined-error-helper-text"
                        type="date"
                        defaultValue={state.newvalue && state.newvalue.date_of_birth}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        onChange={onChange} style={{ width: "70%" }}
                        size="small"
                      />
                    </div>
                  </div>
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Organization</div>
                      <TextField
                        name="organization"
                        id="outlined-error-helper-text"
                        defaultValue={state.newvalue && state.newvalue.organization}
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                      />
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Title</div>
                      <TextField
                        name="title"
                        id="outlined-error-helper-text"
                        defaultValue={state.newvalue && state.newvalue.title}
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                      />
                    </div>
                  </div>
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Primary Email</div>
                      <TextField
                        name="primary_email"
                        id="outlined-error-helper-text"
                        defaultValue={state.newvalue && state.newvalue.primary_email}
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                      />
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Secondary Email</div>
                      <TextField
                        name="secondary_email"
                        id="outlined-error-helper-text"
                        defaultValue={state.newvalue && state.newvalue.secondary_email}
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                      />
                    </div>
                  </div>
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Secondary Number</div>
                      <TextField
                        name="secondary_number"
                        id="outlined-error-helper-text"
                        defaultValue={state.newvalue && state.newvalue.secondary_number}
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                      />
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Mobile Number</div>
                      <TextField
                        name="mobile_number"
                        id="outlined-error-helper-text"
                        defaultValue={state.newvalue && state.newvalue.mobile_number}
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                      />
                    </div>
                  </div>
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Department</div>
                      <TextField
                        name="department"
                        id="outlined-error-helper-text"
                        defaultValue={state.newvalue && state.newvalue.department}
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                      />
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Language</div>
                      <TextField
                        name="language"
                        id="outlined-error-helper-text"
                        defaultValue={state.newvalue && state.newvalue.language}
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                      />
                    </div>
                  </div>
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Do Not Call</div>
                      <AntSwitch
                        defaultChecked={state.newvalue.do_not_call}
                        inputProps={{ 'aria-label': 'ant design' }}
                        name="do_not_call"
                        checked={checked}
                        onChange={(e) => handleChange(e.target)} />
                    </div>
                    <div className="fieldSubContainer">
                      &nbsp;
                    </div>
                  </div>
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
          {/* address details */}
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "20px" }}>
            <Accordion style={{ width: "98%" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <div style={{ borderBottom: "1px solid lightgray", width: "100%" }}>
                  <Typography style={{ marginBottom: "15px", fontWeight: "bold", color: "#1A3353" }}>Address Details</Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ width: '98%', color: "#1A3353" }}
                  component="form"
                  noValidate
                  autoComplete="off">
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                    <div style={{ width: "40%", display: "flex", flexDirection: "row" }}>
                      <div style={{ marginRight: "10px", fontSize: "13px", width: "22%", textAlign: "right", fontWeight: "bold" }}>Address Lane</div>
                      <TextField
                        name="address_line"
                        id="outlined-error-helper-text"
                        defaultValue={state.address && state.address.addreslane}
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                      />
                    </div>
                    <div style={{ width: "40%", display: "flex", flexDirection: "row" }}>
                      <div style={{ marginRight: "10px", fontSize: "13px", width: "22%", textAlign: "right", fontWeight: "bold" }}>City</div>
                      <TextField
                        name="city"
                        id="outlined-error-helper-text"
                        defaultValue={state.address && state.address.city}
                        onChange={onChange} style={{ width: "70%" }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        size="small"
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: "20px" }}>
                    <div style={{ width: "40%", display: "flex", flexDirection: "row" }}>
                      <div style={{ marginRight: "10px", fontSize: "13px", width: "22%", textAlign: "right", fontWeight: "bold" }}>Street</div>
                      <TextField
                        id="outlined-error-helper-text"
                        name="street"
                        onChange={onChange} style={{ width: "70%" }}
                        defaultValue={state.address && state.address.street}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        size="small"
                      />
                    </div>
                    <div style={{ width: "40%", display: "flex", flexDirection: "row" }}>
                      <div style={{ marginRight: "10px", fontSize: "13px", width: "22%", textAlign: "right", fontWeight: "bold" }}>State</div>
                      <TextField
                        name="state"
                        id="outlined-error-helper-text"
                        defaultValue={state.address && state.address.state}
                        onChange={onChange} style={{ width: "70%" }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        size="small"
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: "20px" }}>
                    <div style={{ width: "40%", display: "flex", flexDirection: "row" }}>
                      <div style={{ marginRight: "10px", fontSize: "13px", width: "22%", textAlign: "right", fontWeight: "bold" }}>Pincode</div>
                      <TextField
                        name="pincode"
                        id="outlined-error-helper-text"
                        defaultValue={state.address && state.address.postcode}
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                      />
                    </div>
                    <div style={{ width: "40%", display: "flex", flexDirection: "row" }}>
                      <div style={{ marginRight: "10px", fontSize: "13px", width: "22%", textAlign: "right", fontWeight: "bold" }}>Country</div>
                      <TextField
                        name="country"
                        id="outlined-error-helper-text"
                        defaultValue={state.address && state.address.country}
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                      />
                    </div>
                  </div>
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
          {/* Description details  */}
          <div className="leadContainer">
            <Accordion style={{ width: "98%" }} >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <div className="typography">
                  <Typography style={{ marginBottom: "15px", fontWeight: "bold" }}>Description Details</Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ width: '98%', color: "#1A3353" }}
                  component="form"
                  noValidate
                  autoComplete="off">
                  <div className="DescriptionDetail">
                    <div className="descriptionSubContainer">
                      <div className="descriptionTitle">Description </div>
                      <TextareaAutosize
                        aria-label="minimum height"
                        name="description"
                        minRows={8}
                        defaultValue={state.newvalue && state.newvalue.description}
                        onChange={onChange} style={{ width: "70%" }}
                        placeholder="Add Description"
                      />
                    </div>
                  </div>
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
          {/* Socials */}
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "20px" }}>
            <Accordion style={{ width: "98%" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <div style={{ borderBottom: "1px solid lightgray", width: "100%" }}>
                  <Typography style={{ marginBottom: "15px", fontWeight: "bold", color: "#1A3353" }} >Socials</Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ width: '100%', color: "#1A3353" }}
                  component="form"
                  noValidate
                  autoComplete="off">
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                    <div style={{ width: "40%", display: "flex", flexDirection: "row" }}>
                      <div style={{ marginRight: "10px", fontSize: "13px", width: "22%", textAlign: "right", fontWeight: "bold" }}>Linkedin Url</div>
                      <TextField
                        error={msg == "linked_in_url" ? true : false}
                        name="linked_in_url"
                        defaultValue={state.newvalue.linked_in_url ? state.newvalue.linked_in_url : ""}
                        id="outlined-error-helper-text"
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                        required={msg == "linked_in_url" || msg === "required" ? true : false}
                        helperText={
                          msg === "linked_in_url" || msg === "required"
                            ? error : ""
                        }
                      />
                    </div>
                    <div style={{ width: "40%", display: "flex", flexDirection: "row" }}>
                      <div style={{ marginRight: "10px", fontSize: "13px", width: "22%", textAlign: "right", fontWeight: "bold" }}>Facebook Url</div>
                      <TextField
                        name="facebook_url"
                        defaultValue={state.newvalue.facebook_url ? state.newvalue.facebook_url : ""}
                        error={msg == "facebook_url" || msg === "required" ? true : false}
                        id="outlined-error-helper-text"
                        onChange={onChange} style={{ width: "70%" }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        size="small"
                        helperText={
                          (error && msg === "facebook_url") || msg === "required"
                            ? error : ""
                        }
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <div style={{ width: "40%", display: "flex", flexDirection: "row", marginLeft: "7.5%" }}>
                      <div style={{ marginRight: "10px", fontSize: "13px", textAlign: "right", fontWeight: "bold" }}>Twitter Username</div>
                      <TextField
                        id="outlined-error-helper-text"
                        defaultValue={state.newvalue.twitter_username ? state.newvalue.twitter_username : ""}
                        error={msg == "twitter_username" || msg === "required" ? true : false}
                        name="twitter_username"
                        onChange={onChange} style={{ width: "70%" }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        size="small"
                        helperText={
                          (error && msg === "twitter_username") || msg === "required"
                            ? error : ""
                        }
                      />
                    </div>
                  </div>
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </form>
    </div>
  )
}

