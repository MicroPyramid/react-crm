import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  TextField,
  FormControl,
  Select,
  TextareaAutosize,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Typography,
  Box,
  MenuItem,
  Chip,
  Autocomplete,
  InputLabel
} from '@mui/material';
import Cancel from "@mui/icons-material/Cancel";
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import '../Leads/lead_css.css';
import { UseForm } from "../../components/UseForm";
import { fetchData } from "../../components/FetchData";
import { OpportunitiesUrl } from "../../components/ApiUrls";
import { Appbar } from "../../components/Appbar";


const textFieldStyled = makeStyles(() => ({
  root: {
    borderLeft: "2px solid red",
    height: "40px"
  },
  fieldHeight: {
    height: "40px"
  }
}))

function getStyles(name, personName, theme) {
  return {
    fontWeight: theme.typography.fontWeightRegular
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

export const AddOpportunity = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState("");
  const [msg, setMsg] = useState("");
  const [assignTo, setAssignTo] = useState([]);
  const [source, setSource] = useState([]);
  const [responceError, setResponceError] = useState(false);
  const [age, setAge] = useState('');
  const [personName, setPersonName] = useState([]);
  const textFieldClasses = textFieldStyled();
  const theme = useTheme();

  // const handleFormat = (event, newFormats) => {
  //   setFormats(newFormats);
  // };

  const handleChangeSmile = (event) => {
    setAge(event.target.value);
  };

  const handleChange = (target, key) => {
    if (target.name === "assigned_users") {
      let newKey = []
      newKey.push((key.key).replace(/[^0-9]/g, "", '$'))
      val.assigned_users = JSON.stringify(newKey)
      setAssignTo(target.value)
    } else if (target.name === "lead_source") {
      val.lead_source = target.value
      setSource(target.value)
    } else if (target.name === "name") {
      val.name = target.value
    } else if (target.name === "probability") {
      val.probability = target.value
    }
    else if (target.name === "amount") {
      val.amount = target.value
    }
    else if (target.name === "teams") {
      val.teams = target.value
    }
    else if (target.name === "currency") {
      val.currency = target.value
    }
    else if (target.name === "stage") {
      val.stage = target.value
    } else if (target.name === "contacts") {
      val.contacts = target.value
    }
    else if (target.name === "closed_on") {
      val.closed_on = target.value
    }
    else if (target.name === "users") {
      val.users = target.value
    }
    else if (target.name === "description") {
      val.description = target.value
    }
    else if (target.name === "account") {
      val.account = target.value
    }
  }

  const acoountHandle = (event, value) => {
    val.account = JSON.stringify(value)
  }

  const tagsHandle = (event, value) => {
    val.tags = JSON.stringify(value)
  }

  const validatation = () => {
    let flag = true
    if (!(val.hasOwnProperty('name')) || val.name === "") {
      flag = false
      setError("*required  field")
      setMsg('name')
    }
    else if (!(val.hasOwnProperty('probability')) || val.probability === "") {
      setError("*required field")
      setMsg('probability')
      flag = false
    } else if (!(val.hasOwnProperty('stage')) || val.stage === "") {
      setError("*required field")
      setMsg('stage')
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
      fetchData(`${OpportunitiesUrl}/`, "POST", JSON.stringify(val), headers)
        .then((data) => {
          if (!data.error) {
            setResponceError(data.error);
            navigate('/opportunities')
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
    navigate('/opportunities')
  }

  const [val, onChange, onSubmit] = UseForm(submitCallBack);
  const module = "Opportunities";
  const crntPage = "Add Opportunities";
  const backBtn = "Back To Opportunities";

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Appbar backbtnHandle={backbtnHandle} module={module} backBtn={backBtn} crntPage={crntPage} />
        {/* contact details */}
        <div style={{ padding: "10px" }}>
          <div className="leadContainer">
            <Accordion style={{ width: "98%" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header" >
                <div className="typography">
                  <Typography
                    style={{
                      marginBottom: "15px",
                      fontWeight: "bold",
                      color: "#1A3353"
                    }}>
                    Opportunity Information
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ width: '98%', color: "#1A3353", }}
                  component="form"
                  noValidate
                  autoComplete="off" >
                  <div className="fieldContainer">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Name</div>
                      <TextField
                        error={msg == "name" || errors.name ? true : false}
                        name="name"
                        id="outlined-error-helper-text"
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                        required={msg == "name" || msg === "required" ? true : false}
                        helperText={
                          (error && msg === "name") || msg === "required" || responceError
                            ? errors ? errors.name ? errors.name : "" : error : ""
                        }
                      >
                      </TextField>
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Lead Source</div>
                      <TextField
                        name="lead_source"
                        select
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "70%" }}>
                        {
                          state.lead_source && state.lead_source.map((option) => (
                            <MenuItem key={option[1]} value={option[0]}>
                              {option[0]}
                            </MenuItem>
                          ))
                        }
                      </TextField>
                    </div>
                  </div>
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Account</div>
                      <FormControl sx={{ width: "70%" }}>
                        <InputLabel id="demo-multiple-name-label"></InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name "
                          name="account"
                          size="small"
                          onChange={onChange}
                          MenuProps={MenuProps}>
                          {/* {
                            state.accounts_list ?
                            state.accounts_list && state.accounts_list.length > 0 && state.accounts_list.map((name) => (
                              <MenuItem
                                key={name}
                                value={name.id} >
                                {name.name}
                              </MenuItem>
                            ))
                            : null
                          } */}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Probability</div>
                      <TextField
                        name="probability"
                        id="outlined-error-helper-text"
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        type="number"
                        onChange={onChange} style={{ width: "70%" }}
                        size="small"
                      />
                    </div>
                  </div>
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Ammount</div>
                      <TextField
                        error={msg == "amount" || msg === "required" ? true : false}
                        name="amount"
                        id="outlined-error-helper-text"
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        type="number"
                        style={{ width: "70%" }}
                        size="small"
                        helperText={
                          (error && msg === "amount") || msg === "required"
                            ? error : ""
                        }
                      />
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Teams</div>
                      <TextField
                        error={msg == "teams" || msg === "required" ? true : false}
                        name="teams"
                        id="outlined-error-helper-text"
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                        helperText={
                          (error && msg === "teams") || msg === "required"
                            ? error : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Currency</div>
                      <FormControl sx={{ width: "70%" }}>
                        <InputLabel id="demo-multiple-name-label"></InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          name="currency"
                          size="small"
                          onChange={onChange}
                          MenuProps={MenuProps} >
                          {
                            state.currency && state.currency.length > 0 && state.currency.map((name) => (
                              <MenuItem
                                key={name[1]}
                                value={name[0]}
                                style={getStyles(name, personName, theme)}>
                                {name[0]}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Users</div>
                      <TextField
                        error={msg == "users" || msg === "required" ? true : false}
                        name="users"
                        id="outlined-error-helper-text"
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                        helperText={
                          (error && msg === "users") || msg === "required"
                            ? error : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Stage</div>
                      <TextField
                        error={msg == "stage" || msg === "required" ? true : false}
                        name="stage"
                        select
                        id="outlined-error-helper-text"
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                        helperText={
                          (error && msg === "stage") || msg === "required"
                            ? error : ""
                        }>
                        {
                          state.stage && state.stage.map((option) => (
                            <MenuItem key={option[1]} value={option[0]}>
                              {option[0]}
                            </MenuItem>
                          ))
                        }
                      </TextField>
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Assigned users</div>
                      <TextField
                        error={msg == "assigned_to" || msg === "required" ? true : false}
                        name="assigned_to"
                        id="outlined-error-helper-text"
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                        helperText={
                          (error && msg === "assigned_to") || msg === "required"
                            ? error : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Contact</div>
                      <FormControl sx={{ width: "70%" }}>
                        <InputLabel id="demo-multiple-name-label"></InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          name="contacts"
                          size="small"
                          onChange={(e) => handleChange(e.target)}
                          MenuProps={MenuProps}
                          type="number">
                          {/* {
                            state.contacts_list ?
                            state.contacts_list && state.contacts_list.length && state.contacts_list.map((name) => (
                              <MenuItem
                                key={name.id}
                                value={name.id}>
                                {name.id}
                              </MenuItem>
                            ))
                            : null
                          } */}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="fieldSubContainer" style={{ paddingTop: "4px" }}>
                      <div className="fieldTitle">Tags</div>
                      <Autocomplete
                        multiple
                        id="tags-filled"
                        name="tags"
                        sx={{ maxHeight: 70, overFlow: "hidden" }}
                        options={state.tags && state.tags.length ? state.tags.map((option) => option.name) : [""]}
                        onChange={(event, value) => tagsHandle(event, value)}
                        style={{ width: "70%", display: "flex", flexDirection: "column" }}
                        size="small"
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <div style={{ overFlow: "scroll" }}>
                              <Chip
                                deleteIcon={<Cancel color="primary" />}
                                style={{
                                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                                }}
                                variant="outlined"
                                label={option}
                                {...getTagProps({ index })}
                              />
                            </div>
                          ))}
                        renderInput={(params) => (
                          <TextField style={{ display: "flex", flexDirection: "column" }}
                            sx={{ maxHeight: 60, display: "flex", flexDirection: "column", overflow: "auto" }}
                            {...params}
                            placeholder="add Tags"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="fieldContainer2"
                    style={{
                      marginLeft: "8.5%",
                      justifyContent: "left"
                    }} >
                    <div className="fieldSubContainer" >
                      <div className="fieldTitle">Closed Date</div>
                      <TextField
                        error={msg == "closed_on" || msg === "required" ? true : false}
                        name="closed_on"
                        id="outlined-error-helper-text"
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        sx={{ width: "100%" }}
                        helperText={
                          (error && msg === "closed_on") || msg === "required"
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
            <Accordion style={{ width: "98%", color: "#1A3353", }} >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <div className="typography">
                  <Typography style={{ marginBottom: "15px", fontWeight: "bold", color: "#1A3353" }}>Description </Typography>
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
                        onChange={onChange}
                        style={{ width: "80%", padding: "5px" }}
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