import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
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
import PercentIcon from '@mui/icons-material/Percent';
import { useTheme } from '@mui/material/styles';

import '../Leads/lead_css.css';
import { UseForm } from "../../components/UseForm";
import { LeadUrl } from '../../components/ApiUrls'
import { fetchData } from "../../components/FetchData";
import { Appbar } from "../../components/Appbar";

const useStyles = makeStyles({
  btnIcon: {
    height: "14px",
    color: "#5B5C63"
  },
  breadcrumbs: {
    color: "white"
  },
  fields: {
    height: "5px"
  },
  chipStyle: {
    backgroundColor: "red",
  },
  icon: {
    "&.MuiChip-deleteIcon": {
      color: "darkgray"
    }
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

export function AddLeads() {
  const [assignTo, setAssignTo] = useState([]);
  const [status, setStatus] = useState([]);
  const [source, setSource] = useState([]);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState("");
  const [msg, setMsg] = useState("");
  const [responceError, setResponceError] = useState(false);
  const [imgData, setImgData] = useState([]);
  const [logot, setLogot] = useState(false);
  const [logo, setLogo] = useState([]);
  const [personName, setPersonName] = useState([]);
  const classes = useStyles();
  const navigate = useNavigate();
  const { state } = useLocation();
  const textFieldClasses = textFieldStyled();
  const theme = useTheme();

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
    } else if (target.name === "website") {
      val.website = target.value
    } else if (target.name === "contacts") {
      val.contacts = target.value
    } else if (target.name === "company") {
      val.company = target.value
    } else if (target.name === "skype_ID") {
      val.skype_ID = target.value
    } else if (target.name === "account_name") {
      val.account_name = target.value
    } else if (target.name === "first_name") {
      val.first_name = target.value
    } else if (target.name === "last_name") {
      val.last_name = target.value
    } else if (target.name === "phone") {
      val.phone = target.value
    } else if (target.name === "email") {
      val.email = target.value
    } else if (target.name === "city") {
      val.city = target.value
    } else if (target.name === "email") {
      val.email = target.value
    } else if (target.name === "street") {
      val.street = target.value
    } else if (target.name === "state") {
      val.state = target.value
    } else if (target.name === "postcode") {
      val.postcode = target.value
    } else if (target.name === "description") {
      val.description = target.value
    } else if (target.name === "title") {
      val.title = target.value
    } else if (target.name === "expected_close_date") {
      val.expected_close_date = target.value
    } else if (target.name === "address_line") {
      val.address_line = target.value
    } else if (target.name === "country") {
      val.country = target.value
    }
  }

  const tagsHandle = (event, value) => {
    val.tags = JSON.stringify(value)
  }

  const contactHandle = (event, value) => {
    val.contacts = JSON.stringify(value)
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

  const assignToHandle = (event, value) => {
    let newKey = []
    let stringVal = ""
    value.map((item) => {
      stringVal = newKey.push(item.id.toString())
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
    }
    else if (!(val.hasOwnProperty('first_name')) || val.first_name === "") {
      setError("*required first name field")
      setMsg('first_name')
      flag = false
    } else if (!(val.hasOwnProperty('address_line')) || val.address_line === "") {
      setError("*required address field")
      setMsg('address_line')
      flag = false
    }
    else if ((val.hasOwnProperty('email')) || val.email === "") {
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
      fetchData(`${LeadUrl}/`, "POST", JSON.stringify(val), headers)
        .then((data) => {
          if (!data.error) {
            setResponceError(data.error);
            navigate('/leads')
          }
          if (data.error) {
            setResponceError(data.error);
            setErrors(data.errors);
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
  const crntPage = "Add Leads";
  const backBtn = "Back To Leads";

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Appbar backbtnHandle={backbtnHandle} module={module} backBtn={backBtn} crntPage={crntPage} />
        {/* lead details */}
        <div style={{ padding: "10px" }}>
          <div className="leadContainer">
            <Accordion style={{ width: "98%" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header" >
                <div className="typography">
                  <Typography style={{ marginBottom: "15px", fontWeight: "bold", color: "#1A3353" }}>Leads Details</Typography>
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
                        error={msg == "title" || errors.title ? true : false}
                        name="title"
                        id="outlined-error-helper-text"
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: "80%" }}
                        size="small"
                        required={msg == "title" || msg === "required" ? true : false}
                        helperText={
                          (error && msg === "title") || msg === "required" || responceError
                            ? errors ? errors.title ? errors.title : "" : error : ""
                        }>
                      </TextField>
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Amount</div>
                      <TextField
                        error={msg == "opportunity_amount" ? true : false}
                        name="opportunity_amount"
                        id="outlined-error-helper-text"
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: "80%" }}
                        size="small"
                        required={msg == "opportunity_amount" || msg === "required" ? true : false}
                        helperText={
                          msg === "opportunity_amount" || msg === "required"
                            ? error : ""
                        }>
                      </TextField>
                    </div>
                  </div>
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Website</div>
                      <TextField
                        error={msg == "website" || msg === "required" ? true : false}
                        required={msg == "website" ? true : false}
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
                        helperText={
                          (error && msg === "website") || msg === "required"
                            ? error : ""
                        }
                      />
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Contact Name</div>
                      <Autocomplete
                        select
                        id="tags-filled"
                        name="contacts"
                        error={msg == "contacts" || msg === "required" ? true : false}
                        options={state.contacts ? state.contacts.map((option) => option.first_name) : [""]}
                        onChange={onChange}
                        style={{ width: "80%" }}
                        size="small"
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              className={{ deleteIcon: classes.chipIcon }}
                              deleteIcon={<Cancel className={classes.icon} color="primary" />}
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
                            placeholder="Add Contacts"
                          />
                        )}
                        helperText={
                          (error && msg === "contacts") || msg === "required"
                            ? error : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Assign To</div>
                      <Autocomplete
                        multiple
                        id="assigned-filled"
                        name="assigned_to"
                        options={state.users ? state.users : ""}
                        getOptionLabel={(option) => option.user__email}
                        onChange={(object, option) => assignToHandle(object, option)}
                        // defaultValue={[state.users[1].user__email]}
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
                              className={{ deleteIcon: classes.chipIcon }}
                              deleteIcon={<Cancel className={classes.icon} color="primary" />}
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.08)"
                              }}
                              variant="outlined"
                              label={option.user__email}
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
                      <div className="fieldTitle">Organization</div>
                      <TextField
                        error={msg == "company" || msg === "required" ? true : false}
                        name="company"
                        id="outlined-error-helper-text"
                        onChange={onChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <AddIcon />
                            </InputAdornment>
                          ),
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "80%" }}
                        size="small"
                        helperText={
                          (error && msg === "company") || msg === "company"
                            ? error : ""
                        }
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
                          state.status && state.status.map((option) =>
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
                        error={msg === "skype_ID" || msg === "required" ? true : false}
                        name="skype_ID"
                        id="outlined-error-helper-text"
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        onChange={onChange} style={{ width: "80%" }}
                        size="small"
                        helperText={
                          (error && msg === "skype_ID") || msg === "required"
                            ? error : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Source</div>
                      <TextField
                        name="source"
                        select
                        value={source}
                        onChange={(e) => handleChange(e.target)}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "80%" }} >
                        {
                          state.source && state.source.map((option) => (
                            <MenuItem key={option[1]} value={option[0]}>
                              {option[0]}
                            </MenuItem>
                          ))
                        }
                      </TextField>
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Attachment</div>
                      <TextField
                        name="lead_attachment"
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
                        options={state.tags ? state.tags.map((option) => option.name) : [""]}
                        onChange={(event, value) => tagsHandle(event, value)}
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
                              className={{ deleteIcon: classes.chipIcon }}
                              deleteIcon={<Cancel className={classes.icon} color="primary" />}
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.08)"
                              }}
                              variant="outlined"
                              label={option}
                              {...getTagProps({ index })}
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="add Tags"
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
                          required={msg == "industry" || msg === "required" ? true : false}
                          helperText={
                            (error && msg === "industry") || msg === "required"
                              ? error : ""
                          }
                          onChange={onChange}
                          MenuProps={MenuProps}
                        >
                          {
                            state.industry && state.industry.map((option) => (
                              <MenuItem key={option[1]} value={option[0]} >
                                {option[0]}
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
                        error={msg == "account_name" || msg === "required" ? true : false}
                        name="account_name"
                        id="outlined-error-helper-text"
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        required={msg == "account_name" || msg === "required" ? true : false}
                        onChange={onChange} style={{ width: "80%" }}
                        size="small"
                        helperText={
                          (error && msg === "account_name") || msg === "required"
                            ? error : ""
                        }
                      />
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle"> Close Date</div>
                      <TextField
                        error={msg == "expected_close_date" || msg === "required" ? true : false}
                        name="expected_close_date"
                        id="outlined-error-helper-text"
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        type="date"
                        onChange={onChange} style={{ width: "80%" }}
                        size="small"
                        helperText={
                          (error && msg === "expected_close_date") || msg === "required"
                            ? error : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Pipeline</div>
                      <TextField
                        error={msg == "pipeline" || msg === "required" ? true : false}
                        name="pipeline"
                        id="outlined-error-helper-text"
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        onChange={onChange} style={{ width: "80%" }}
                        size="small"
                        helperText={
                          (error && msg === "pipeline") || msg === "required"
                            ? error : ""
                        }
                      />
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Lost Reason </div>
                      <TextareaAutosize
                        aria-label="minimum height"
                        name="lost_reason"
                        minRows={2}
                        onChange={onChange} style={{ width: "80%", }}
                      />
                    </div>
                  </div>
                  <div className="fieldSubContainer" style={{ marginLeft: "5%" }}>
                    <div className="fieldTitle">Probability</div>
                    <TextField
                      error={msg == "probability" || msg === "required" ? true : false}
                      name="probability"
                      id="outlined-error-helper-text"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <PercentIcon className={classes.plusIcon} color="primary" />
                          </InputAdornment>
                        ),
                        classes: {
                          root: textFieldClasses.fieldHeight
                        }
                      }}
                      onChange={onChange} style={{ width: "80%" }}
                      size="small"
                      helperText={
                        (error && msg === "probability") || msg === "required"
                          ? error : ""
                      }
                    />
                  </div>
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
          {/* contact details */}
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "20px" }}>
            <Accordion style={{ width: "98%" }}>
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
                  autoComplete="off" >
                  <div className="fieldContainer">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">First Name</div>
                      <TextField
                        name="first_name"
                        error={msg == "first_name" || msg === "required" ? true : false}
                        id="outlined-error-helper-text"
                        onChange={onChange} style={{ width: "80%" }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        size="small"
                        helperText={
                          (error && msg === "first_name") || msg === "required"
                            ? error : ""
                        }
                      />
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Last Name</div>
                      <TextField
                        id="outlined-error-helper-text"
                        name="last_name"
                        error={msg == "last_name" || msg === "required" ? true : false}
                        onChange={onChange} style={{ width: "80%" }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        size="small"
                        helperText={
                          (error && msg === "last_name") || msg === "required"
                            ? error : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Job Title</div>
                      <TextField
                        name="job_title"
                        error={msg == "job_title" || msg === "required" ? true : false}
                        id="outlined-error-helper-text"
                        onChange={onChange}
                        style={{ width: "80%" }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        size="small"
                        helperText={
                          (error && msg === "job_title") || msg === "required"
                            ? error : ""
                        }
                      />
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Phone Number</div>
                      <TextField
                        name="phone"
                        error={msg == "phone" || msg === "required" || errors.phone ? true : false}
                        id="outlined-error-helper-text"
                        onChange={onChange}
                        style={{ width: "80%" }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        display={"none"}
                        size="small"
                        helperText={
                          (error && msg === "phone") || msg === "required" || responceError
                            ? errors ? errors.phone ? errors.phone : "" : error : ""
                        }
                      />
                    </div>
                  </div>
                  <div style={{ width: "40%", display: "flex", flexDirection: "row", marginTop: "19px", marginLeft: "6.6%" }}>
                    <div style={{ marginRight: "10px", fontSize: "13px", width: "22%", textAlign: "right", fontWeight: "bold" }}>Email Address</div>
                    <TextField
                      name="email"
                      error={msg == "email" || msg === "required" ? true : false}
                      id="outlined-error-helper-text"
                      onChange={onChange} style={{ width: "72.6%" }}
                      InputProps={{
                        classes: {
                          root: textFieldClasses.fieldHeight
                        }
                      }}
                      size="small"
                      helperText={
                        (error && msg === "email") || msg === "required"
                          ? error : ""
                      }
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
                id="panel1a-header"  >
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
                        error={msg == "address_line" ? true : false}
                        name="address_line"
                        id="outlined-error-helper-text"
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: "80%" }}
                        size="small"
                        required={msg == "address_line" || msg === "required" ? true : false}
                        helperText={
                          msg === "address_line" || msg === "required"
                            ? error : ""
                        }
                      />
                    </div>
                    <div style={{ width: "40%", display: "flex", flexDirection: "row" }}>
                      <div style={{ marginRight: "10px", fontSize: "13px", width: "22%", textAlign: "right", fontWeight: "bold" }}>City</div>
                      <TextField
                        name="city"
                        error={msg == "city" || msg === "required" ? true : false}
                        id="outlined-error-helper-text"
                        onChange={onChange} style={{ width: "80%" }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        size="small"
                        helperText={
                          (error && msg === "city") || msg === "required"
                            ? error : ""
                        }
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: "20px" }}>
                    <div style={{ width: "40%", display: "flex", flexDirection: "row" }}>
                      <div style={{ marginRight: "10px", fontSize: "13px", width: "22%", textAlign: "right", fontWeight: "bold" }}>Street</div>
                      <TextField
                        id="outlined-error-helper-text"
                        error={msg == "street" || msg === "required" ? true : false}
                        name="street"
                        onChange={onChange} style={{ width: "80%" }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        size="small"
                        helperText={
                          (error && msg === "street") || msg === "required"
                            ? error : ""
                        }
                      />
                    </div>
                    <div style={{ width: "40%", display: "flex", flexDirection: "row" }}>
                      <div style={{ marginRight: "10px", fontSize: "13px", width: "22%", textAlign: "right", fontWeight: "bold" }}>State</div>
                      <TextField
                        name="state"
                        error={msg == "state" || msg === "required" ? true : false}
                        id="outlined-error-helper-text"
                        onChange={onChange} style={{ width: "80%" }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        size="small"
                        helperText={
                          (error && msg === "state") || msg === "required"
                            ? error : ""
                        }
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: "20px" }}>
                    <div style={{ width: "40%", display: "flex", flexDirection: "row" }}>
                      <div style={{ marginRight: "10px", fontSize: "13px", width: "22%", textAlign: "right", fontWeight: "bold" }}>Pincode</div>
                      <TextField
                        error={msg == "postcode" || msg === "required" ? true : false}
                        name="postcode"
                        type="number"
                        id="outlined-error-helper-text"
                        onChange={onChange} style={{ width: "80%" }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        size="small"
                        helperText={
                          (error && msg === "postcode") || msg === "required"
                            ? error : ""
                        }
                      />
                    </div>
                    <div style={{ width: "40%", display: "flex", flexDirection: "row" }}>
                      <div style={{ marginRight: "10px", fontSize: "13px", width: "22%", textAlign: "right", fontWeight: "bold" }}>Country</div>
                      <TextField
                        error={msg == "country" || msg === "required" ? true : false}
                        name="country"
                        id="outlined-error-helper-text"
                        onChange={onChange} style={{ width: "80%" }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        size="small"
                        helperText={
                          (error && msg === "country") || msg === "required"
                            ? error : ""
                        }
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
                id="panel1a-header"  >
                <div className="typography">
                  <Typography style={{ marginBottom: "15px", fontWeight: "bold" }}>Description Details</Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ width: '100%' }}
                  component="form"
                  noValidate
                  autoComplete="off">
                  <div className="DescriptionDetail">
                    <div className="descriptionSubContainer">
                      <div className="descriptionTitle">Description</div>
                      <TextareaAutosize
                        aria-label="minimum height"
                        name="description"
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

