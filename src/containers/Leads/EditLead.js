import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PercentIcon from '@mui/icons-material/Percent';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  TextareaAutosize,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Typography,
  Box,
  MenuItem,
  InputAdornment,
  Chip,
  Autocomplete
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import PublishIcon from '@mui/icons-material/Publish';
import isEmail from 'validator/lib/isEmail';
import Cancel from "@mui/icons-material/Cancel";

import '../Leads/lead_css.css';
import { UseForm } from "../../components/UseForm";
import { LeadUrl } from '../../components/ApiUrls';
import { fetchData } from "../../components/FetchData";
import { Appbar } from "../../components/Appbar";

const useStyles = makeStyles({
  cancelIcon: {
    height: "14px",
    color: "white"
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
}));
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      theme.typography.fontWeightRegular
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 310,
    },
  },
};

export function EditLead() {
  const { state } = useLocation();
  const [assignTo, setAssignTo] = useState([]);
  const [status, setStatus] = useState([state.data.status]);
  const [source, setSource] = useState([state.data.source]);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const [leads, SetLeads] = useState([]);
  const [logo, setLogo] = useState([]);
  const [logot, setLogot] = useState(null);
  const [imgData, setImgData] = useState([]);
  const [openLeads, SetOpenLeads] = useState([state.editLead])
  const [responceError, setResponceError] = useState(false)
  const classes = useStyles();
  const navigate = useNavigate();
  const textFieldClasses = textFieldStyled();

  useEffect(() => {
    SetLeads({
      ...openLeads,
      leadSource: state.editLead.source,
      leadStatus: state.editLead.status,
      leadTags: state.editLead.tags,
      leadIndustries: state.editLead.industries,
      leadContacts: state.editLead.contacts,
      leadAssign: state.editLead.users
    })
  }, [])

  const handleChange = (target, key) => {
    if (target.name === "assigned_to") {
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
    } else if (target.name === "opportunity_amount") {
      val.opportunity_amount = target.value
    } else if (target.name === "contacts") {
      val.contacts = target.value
    } else if (target.name === "company") {
      val.company = target.value
    } else if (target.name === "lead_attachment") {
      val.lead_attachment = target.value
    } else if (target.name === "email") {
      val.email = target.value
    } else if (target.name === "title") {
      val.title = target.value
    }
  }

  const changeHandler = (event) => {
    if (event.target.files[0]) {
      setLogo(event.target.files[0])
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
        setLogot(true);
      })
      val.lead_attachment = event.target.files[0]
    }
  };

  const tagsHandle = (event, value) => {
    val.tags = JSON.stringify(value)
  }

  const contactHandle = (event, value) => {
    val.contacts = JSON.stringify(value)
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
    if (!(val.hasOwnProperty('title')) || val.title === "") {
      flag = false
      setError("*required lead title field")
      setMsg('title')
    } else if (!(val.hasOwnProperty('opportunity_amount')) || val.opportunity_amount === "") {
      flag = false
      setError("*required amount field")
      setMsg('opportunity_amount')
    } else if (!(val.hasOwnProperty('first_name')) || val.first_name === "") {
      setError("*required first name field")
      setMsg('first_name')
      flag = false
    } else if (!(val.hasOwnProperty('address_line')) || val.address_line === "") {
      setError("*required address field")
      setMsg('address_line')
      flag = false
    } else if ((val.hasOwnProperty('email')) || val.email === "") {
      let validEmail = isEmail(val.email)
      if (validEmail === false) {
        setError("*email is not valid")
        setMsg('email')
        flag = false
      }
    } else {
      setError("")
      setMsg('')
    }
    return flag
  }

  const submitCallBack = () => {

    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Jwt ${localStorage.getItem("Token")}`,
      org: 'localStorage.getItem("org")'
    };

    if (validatation()) {
      fetchData(`${LeadUrl}/${state.data.id}/`, "PUT", JSON.stringify(val), headers)
        .then((data) => {
          if (!data.error) {
            setResponceError(data.error);
            navigate('/leads')
          }
        })
        .catch((error) => {
        });
    }
  };

  const backbtnHandle = () => {
    navigate('/leads')
  }

  const [val, onChange, onSubmit] = UseForm(submitCallBack);
  const module = "Leads";
  const backBtn = "Back To Leads";
  const crntPage = "Edit Leads";
  return (
    <div>
      <form onSubmit={onSubmit}>
        <Appbar backbtnHandle={backbtnHandle} module={module} backBtn={backBtn} crntPage={crntPage} />
        {/* lead details */}
        <div style={{ padding: "10px" }}>
          <div className="leadContainer">
            <Accordion style={{ width: "98%" }} >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header" >
                <div className="typography">
                  <Typography style={{ marginBottom: "15px", fontWeight: "bold" }}>Leads Details</Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ width: '98%', color: "#1A3353" }}
                  component="form"
                  noValidate
                  autoComplete="off" >
                  <div className="fieldContainer">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Lead Name</div>
                      <TextField
                        name="title"
                        id="outlined-error-helper-text"
                        defaultValue={state.data && state.data.title}
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: "80%" }}
                        size="small">
                      </TextField>
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Amount</div>
                      <TextField
                        name="opportunity_amount"
                        id="outlined-error-helper-text"
                        defaultValue={state.data && state.data.opportunity_amount ? state.data.opportunity_amount : "--"}
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: "80%" }}
                        size="small"
                      >
                      </TextField>
                    </div>
                  </div>
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Website</div>
                      <TextField
                        defaultValue={state.data && state.data.website}
                        name="website"
                        id="outlined-error-helper-text"
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        onChange={onChange}
                        style={{ width: "80%" }}
                        size="small"
                      />
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Contact Name</div>
                      <Autocomplete
                        id="free-solo-demo"
                        select
                        name="contacts"
                        options={leads.leadContacts ? leads.leadContacts.map((option) => option.first_name) : [""]}
                        onChange={(e) => handleChange(e.target)}
                        style={{ width: "80%" }}
                        size="small"
                        renderTags={(value, getContactProps) =>
                          value.map((option, index) => (
                            <Chip
                              deleteIcon={<Cancel color="primary" />}
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.08)"
                              }}
                              variant="outlined"
                              label={option}
                              {...getContactProps({ index })}
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <AddIcon color="primary" />
                                </InputAdornment>
                              )
                            }}
                            {...params}
                          />
                        )}
                      />
                    </div>
                  </div>
                  {/* state.data */}
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Assign To</div>
                      <Autocomplete
                        select
                        id="assigned-filled"
                        name="assignTo"
                        options={leads.leadAssign ? leads.leadAssign : ""}
                        // defaultValue={state.data && state.data.industry}
                        getOptionLabel={(option) => option.user__email}
                        onChange={(object, option) => assignToHandle(object, option)}
                        style={{ width: "80%" }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        size="small"
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              deleteIcon={<Cancel color="primary" />}
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.08)"
                              }}
                              variant="outlined"
                              label={option.user__email}
                              {...getTagProps({ index })}
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                          />
                        )}
                      />
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Organization</div>
                      <TextField
                        name="company"
                        id="outlined-error-helper-text"
                        onChange={onChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <AddIcon color="primary" />
                            </InputAdornment>
                          ),
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "80%" }}
                        size="small"
                      />
                    </div>
                  </div>
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Status</div>
                      <TextField
                        name="status"
                        select
                        value={status}
                        onChange={(e) => handleChange(e.target)}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "80%" }} >
                        {
                          leads.leadStatus && leads.leadStatus.length && leads.leadStatus.map((option) =>
                          (
                            <MenuItem key={option[1]} value={option[0]}>
                              {option[0]}
                            </MenuItem>
                          ))
                        }
                      </TextField>
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">SkypeID</div>
                      <TextField
                        name="skype_ID"
                        defaultValue={state.data && state.data.skype_ID ? state.data.skype_ID : ""}
                        id="outlined-error-helper-text"
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        onChange={onChange}
                        style={{ width: "80%" }}
                        size="small"
                      />
                    </div>
                  </div>
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Source</div>
                      <TextField
                        name="source"
                        defaultValue={state.data.source ? state.data.source : "--"}
                        select
                        onChange={(e) => handleChange(e.target)}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "80%", }}>
                        {
                          leads.leadSource && leads.leadSource.length && leads.leadSource.map((option, index) =>
                          (
                            <MenuItem key={option[1]} value={option[1]} >
                              {option[1]}
                            </MenuItem>
                          ))
                        }
                      </TextField>
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Attachment</div>
                      <TextField
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <label htmlFor="icon-button-file">
                                <input
                                  hidden
                                  accept="image/*"
                                  id="icon-button-file"
                                  type="file"
                                  name="lead_attachment"
                                  onChange={changeHandler}
                                />
                                <PublishIcon color="primary" />
                              </label>
                            </InputAdornment>
                          ),
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        name="attachment"
                        id="outlined-error-helper-text"
                        onChange={onChange} style={{ width: "80%" }}
                        size="small"
                      />
                    </div>
                  </div>
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Tags</div>
                      <Autocomplete
                        multiple
                        id="tags-filled"
                        name="tags"
                        defaultValue={state.data && state.data.tags ? state.data.tags.map((v) => v.name) : "--"}
                        options={leads.leadTags ? leads.leadTags.map((option) => option.name) : [""]}
                        onChange={(event, value) => tagsHandle(event, value)}
                        style={{ width: "80%" }}
                        size="small"
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              deleteIcon={<Cancel color="primary" />}
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.08)"
                              }}
                              variant="outlined"
                              label={option}
                              {...getTagProps({ index })
                              }
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                          />
                        )}
                      />
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Industry</div>
                      <FormControl sx={{ width: "80%" }}
                        error={msg == "industry" || msg === "required" ? true : false}
                        name="industry">
                        <InputLabel id="demo-multiple-name-label"></InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          name="industry"
                          size="small"
                          defaultValue={state.data && state.data.industry}
                          required={msg == "industry" || msg === "required" ? true : false}
                          helperText={
                            (error && msg === "industry") || msg === "required"
                              ? error : ""
                          }
                          onChange={onChange}
                          MenuProps={MenuProps}>
                          {
                            leads.leadIndustries && leads.leadIndustries.length && leads.leadIndustries.map((option) => (
                              <MenuItem key={option[1]} value={option[0]}>
                                {option[1]}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Account Name</div>
                      <TextField
                        name="account_name"
                        defaultValue={state.data.account_name && state.data.account_name}
                        id="outlined-error-helper-text"
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        required={msg == "account_name" || msg === "required" ? true : false}
                        onChange={onChange} style={{ width: "80%" }}
                        size="small"
                      />
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Close Date </div>
                      <TextField
                        name="expected_close_date"
                        defaultValue={state.data.expected_close_date}
                        id="outlined-error-helper-text"
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        type="date"
                        onChange={onChange} style={{ width: "80%" }}
                        size="small"
                      />
                    </div>
                  </div>
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Pipeline</div>
                      <TextField
                        name="pipeline"
                        id="outlined-error-helper-text"
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        onChange={onChange} style={{ width: "80%" }}
                        size="small"
                      />
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Lost Reason </div>
                      <TextareaAutosize
                        aria-label="minimum height"
                        name="lost_reason"
                        minRows={2}
                        onChange={onChange} style={{ width: "80%" }}
                      />
                    </div>
                  </div>
                  <div style={{ paddingLeft: "48px", marginLeft: "5%" }}>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Probability</div>
                      <TextField
                        name="probability"
                        id="outlined-error-helper-text"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <PercentIcon color="primary" />
                            </InputAdornment>
                          ),
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        onChange={onChange} style={{ width: "80%" }}
                        size="small"
                      />
                    </div>
                  </div>
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
          {/* contact details */}
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "20px" }}>
            <Accordion style={{ width: "98%" }}  >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header" >
                <div style={{ borderBottom: "1px solid lightgray", width: "100%" }}>
                  <Typography style={{ marginBottom: "15px", fontWeight: "bold", color: "#1A3353" }}>Contact Details</Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ width: '98%', color: "#1A3353" }}
                  component="form"
                  noValidate
                  autoComplete="off">
                  <div className="fieldContainer">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">First Name</div>
                      <TextField
                        name="first_name"
                        id="outlined-error-helper-text"
                        defaultValue={state.data && state.data.first_name}
                        onChange={onChange}
                        style={{ width: "80%" }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        size="small"
                      />
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Last Name</div>
                      <TextField
                        id="outlined-error-helper-text"
                        name="last_name"
                        defaultValue={state.data && state.data.last_name}
                        onChange={onChange} style={{ width: "80%" }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        size="small"
                      />
                    </div>
                  </div>
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Job Title</div>
                      <TextField
                        name="job_title"
                        defaultValue={state.data && state.data.title}
                        id="outlined-error-helper-text"
                        onChange={onChange} style={{ width: "80%" }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        size="small"
                      />
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Phone Number</div>
                      <TextField
                        name="phone"
                        defaultValue={state.data && state.data.phone}
                        id="outlined-error-helper-text"
                        onChange={onChange}
                        helperText=""
                        style={{ width: "80%" }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        display={"none"}
                        size="small"
                      />
                    </div>
                  </div>
                  <div style={{ width: "40%", display: "flex", flexDirection: "row", marginTop: "19px", marginLeft: "6.6%" }}>
                    <div style={{ marginRight: "10px", fontSize: "13px", width: "22%", textAlign: "right", fontWeight: "bold" }}>Email</div>
                    <TextField
                      name="email"
                      id="outlined-error-helper-text"
                      defaultValue={state.data && state.data.email}
                      onChange={onChange} style={{ width: "72.6%" }}
                      InputProps={{
                        classes: {
                          root: textFieldClasses.fieldHeight
                        }
                      }}
                      size="small"
                    />
                  </div>
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
          {/* address details */}
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "20px" }}>
            <Accordion style={{ width: "98%" }} >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header" >
                <div style={{ borderBottom: "1px solid lightgray", width: "100%" }}>
                  <Typography style={{ marginBottom: "15px", fontWeight: "bold", color: "#1A3353" }}>Address Details</Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ width: '98%', color: "#1A3353" }}
                  component="form"
                  noValidate
                  autoComplete="off" >
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                    <div style={{ width: "40%", display: "flex", flexDirection: "row" }}>
                      <div style={{ marginRight: "10px", fontSize: "13px", width: "22%", textAlign: "right", fontWeight: "bold" }}>Address Lane</div>
                      <TextField
                        name="address_line"
                        id="outlined-error-helper-text"
                        defaultValue={state.data && state.data.address_line}
                        onChange={onChange}
                        style={{ width: "80%" }}
                        size="small"
                      />
                    </div>
                    <div style={{ width: "40%", display: "flex", flexDirection: "row" }}>
                      <div style={{ marginRight: "10px", fontSize: "13px", width: "22%", textAlign: "right", fontWeight: "bold" }}>City</div>
                      <TextField
                        name="city"
                        id="outlined-error-helper-text"
                        defaultValue={state.data && state.data.city}
                        onChange={onChange} style={{ width: "80%" }}
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
                        defaultValue={state.data && state.data.street}
                        onChange={onChange} style={{ width: "80%" }}
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
                        defaultValue={state.data && state.data.state}
                        onChange={onChange} style={{ width: "80%" }}
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
                        defaultValue={state.data && state.data.postcode}
                        error={msg == "country" || msg === "required" ? true : false}
                        name="postcode"
                        type="number"
                        id="outlined-error-helper-text"
                        onChange={onChange} style={{ width: "80%" }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        helperText={
                          (error && msg === "country") || msg === "required"
                            ? error : ""
                        }
                        size="small"
                      />
                    </div>
                    <div style={{ width: "40%", display: "flex", flexDirection: "row" }}>
                      <div style={{ marginRight: "10px", fontSize: "13px", width: "22%", textAlign: "right", fontWeight: "bold" }}>Country</div>
                      <TextField
                        defaultValue={state.data && state.data.country}
                        name="country"
                        id="outlined-error-helper-text"
                        onChange={onChange} style={{ width: "80%" }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
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
                <Box sx={{ width: '100%', color: "#1A3353" }}
                  component="form"
                  noValidate
                  autoComplete="off">
                  <div className="DescriptionDetail">
                    <div className="descriptionSubContainer">
                      <div className="descriptionTitle">Description</div>
                      <TextareaAutosize
                        aria-label="minimum height"
                        name="description"
                        defaultValue={state.data && state.data.description}
                        minRows={8}
                        onChange={onChange} style={{ width: "80%", padding: "5px" }}
                        placeholder="Add Description"
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

