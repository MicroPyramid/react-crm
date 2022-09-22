import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  TextField,
  TextareaAutosize,
  AccordionDetails,
  Select,
  Accordion,
  AccordionSummary,
  Typography,
  Box,
  MenuItem,
  Chip,
  Autocomplete,
  InputLabel
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from '@mui/styles';
import Cancel from "@mui/icons-material/Cancel";
import { useTheme } from '@mui/material/styles';

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

export const EditOpportunities = (props) => {
  const { state } = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState("");
  const [msg, setMsg] = useState("");
  const [currency, setCurrency] = useState([state.opportunities.opportunity_obj.currency]);
  const [responceError, setResponceError] = useState(false);
  const textFieldClasses = textFieldStyled();
  const [personName, setPersonName] = useState([]);

  const handleChange = (target, key) => {
    if (target.name === "teams") {
      val.teams = target.value
    }
    else if (target.name === "currency") {
      val.currency = target.value
      setCurrency(target.value);
    }
    else if (target.name === "stage") {
      val.stage = target.value
    }
    else if (target.name === "contacts") {
      val.contacts = target.value
    }
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
    return flag
  }

  const submitCallBack = () => {

    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "jwt " + localStorage.getItem('Token'),
      org: 3
    };

    fetchData(`${OpportunitiesUrl}/${state.opportunities.opportunity_obj ? state.opportunities.opportunity_obj.id : ""}/`, "PUT", JSON.stringify(val), headers)
    .then((data) => {
      if (!data.error) {
        setResponceError(data.error);
        navigate('/opportunities');
      }
      if (data.error) {
        setResponceError(data.error);
        setErrors(data.errors);
      }
    })
    .catch((error) => {
    });
  };

  const backbtnHandle = () => {
    navigate('/opportunities');
  }
  const [val, onChange, onSubmit] = UseForm(submitCallBack);
  const module = "Opportunities";
  const crntPage = "Edit Opportunities";
  const backBtn = "Back To Opportunities";

  return (
    <div>
      <form
        onSubmit={onSubmit}>
         <Appbar backbtnHandle={ backbtnHandle } module={ module } backBtn={ backBtn } crntPage={ crntPage }/>
        {/* opportunities details */}
        <div style={{ padding: "10px" }}>
          <div className="leadContainer">
            <Accordion style={{ width: "98%", color: "#1A3353" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <div className="typography">
                  <Typography style={{
                    marginBottom: "15px",
                    fontWeight: "bold", 
                    color: "#1A3353"
                    }}>
                    Opportunity Information
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ width: '98%' }}
                  component="form"
                  noValidate
                  autoComplete="off">
                  <div className="fieldContainer">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Name</div>
                      <TextField
                        name="name"
                        id="outlined-error-helper-text"
                        defaultValue={ state.opportunities && state.opportunities.opportunity_obj ? state.opportunities.opportunity_obj.name : "" }
                        onChange={ onChange }
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small">
                      </TextField>
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Lead Source</div>
                      <TextField
                        name="lead_source"
                        select
                        defaultValue={ state.opportunities && state.opportunities.opportunity_obj ? state.opportunities.opportunity_obj.lead_source : "" }
                        onChange={ onChange }
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "70%" }}
                      >
                        {
                          state.lead_source && state.lead_source.map((option) => (
                          <MenuItem key={ option[1] } value={ option[0] }>
                            { option[0] }
                          </MenuItem>
                          ))
                        }
                      </TextField>
                    </div>
                  </div>
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Account</div>
                      <FormControl sx={{ width: 330 }}>
                        <InputLabel id="demo-multiple-name-label"></InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          name="account"
                          // defaultValue= {state.opportunities && state.opportunities.account ? state.opportunities.account.map((v) => v.name):""}
                          size="small"
                          onChange={ onChange }
                          MenuProps={ MenuProps }
                        >
                          {
                            state.accounts_list && state.accounts_list.map((name) => (
                            <MenuItem
                              key={ name }
                              value={ name.id }>
                              { name.name }
                            </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Probability</div>
                      <TextField
                        name="probability"
                        defaultValue={ state.opportunities && state.opportunities.opportunity_obj ? state.opportunities.opportunity_obj.probability : "" }
                        id="outlined-error-helper-text"
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        type="number"
                        onChange={onChange}
                        style={{ width: "70%" }}
                        size="small"
                      />
                    </div>
                  </div>
                  <div className="fieldContainer2">
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Ammount</div>
                      <TextField
                        name="amount"
                        id="outlined-error-helper-text"
                        defaultValue={ state.opportunities && state.opportunities.opportunity_obj ? state.opportunities.opportunity_obj.amount : "" }
                        onChange={ onChange }
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        type="number"
                        style={{ width: "70%" }}
                        size="small"
                      />
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Teams</div>
                      <TextField
                        name="teams"
                        id="outlined-error-helper-text"
                        // defaultValue={state.opportunities.team}
                        onChange={ onChange }
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
                      <div className="fieldTitle">Currency</div>
                      <FormControl sx={{ width: 330 }}>
                        <InputLabel id="demo-multiple-name-label"></InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          // defautValue={state.opportunities && state.opportunities.opportunity_obj ? state.opportunities.opportunity_obj.currency:""}
                          value={ currency }
                          name="currency"
                          size="small"
                          onChange={ onChange }
                          MenuProps={ MenuProps }
                        >
                          {
                            state.currency.length > 0 && state.currency.map((name) => (
                            <MenuItem
                              key={ name[1] }
                              value={ name[0] }>
                              { name[0] }
                            </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Users</div>
                      <TextField
                        id="outlined-error-helper-text"
                        name="users"
                        // defaultValue={state.opportunities.users.id}
                        onChange={ onChange }
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
                      <div className="fieldTitle">Stage</div>
                      <TextField
                        name="stage"
                        select
                        id="outlined-error-helper-text"
                        defaultValue={ state.opportunities && state.opportunities.opportunity_obj ? state.opportunities.opportunity_obj.stage : "" }
                        onChange={ (e) => handleChange(e.target) }
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: "70%" }}
                        size="small"
                      >
                        {
                          state.stage && state.stage.map((option) => (
                          <MenuItem key={ option[1] } value={ option[0] }>
                            { option[0] }
                          </MenuItem>
                          ))
                        }
                      </TextField>
                    </div>
                    <div className="fieldSubContainer">
                      <div className="fieldTitle">Assigned users</div>
                      <TextField
                        name="assigned_to"
                        id="outlined-error-helper-text"
                        // defaultValue={state.opportunities && state.opportunities.opportunity_obj ? state.opportunities.opportunity_obj.assigned_users:""}
                        onChange={ onChange }
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
                      <div className="fieldTitle">Contact</div>
                      <FormControl sx={{ width: 330 }}>
                        <InputLabel id="demo-multiple-name-label"></InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          name="contacts"
                          defaultValue={ state.opportunities && state.opportunities.opportunity_obj ? state.opportunities.opportunity_obj.contacts.name : "" }
                          size="small"
                          onChange={ (e) => handleChange(e.target) }
                          MenuProps={ MenuProps }>
                          {
                            state.contacts_list.map((name) => (
                            <MenuItem
                              key={ name.id }
                              value={ name }
                              style={ getStyles(name, personName, theme) }>
                              { name.id }
                            </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </div>
                    <div className="fieldSubContainer" style={{ paddingTop: "4px" }}>
                      <div className="fieldTitle">Tags</div>
                      <Autocomplete
                        multiple
                        id="tags-filled"
                        name="tags"
                        options={ state.tags ? state.tags.map((option) => option.name) : [""] }
                        // defaultValue={state.opportunities && state.opportunities.opportunity_obj ? state.opportunities.opportunity_obj.tags.map((v) => v.name):"--"}
                        onChange={ (event, value) => tagsHandle(event, value) }
                        style={{ width: "70%", display: "flex", flexDirection: "column", }}
                        size="small"
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              deleteIcon={<Cancel color="primary" />}
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.08)",
                              }}
                              variant="outlined"
                              label={ option }
                              { ...getTagProps({ index }) }
                              
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField style={{ display: "flex", flexDirection: "column" }}
                            sx={{ maxHeight: 70, overflow: "auto" }}
                            { ...params }
                            placeholder="add Tags"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="fieldContainer2" style={{ marginLeft: "95px", justifyContent: "left" }} >
                    <div className="fieldSubContainer" >
                      <div className="fieldTitle">Closed Date</div>
                      <TextField
                        name="closed_on"
                        id="outlined-error-helper-text"
                        defaultValue={ state.opportunities && state.opportunities.opportunity_obj ? state.opportunities.opportunity_obj.closed_on : "" }
                        onChange={ onChange }
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: "100%" }}
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
                expandIcon={ <ExpandMoreIcon /> }
                aria-controls="panel1a-content"
                id="panel1a-header">
                <div className="typography">
                  <Typography style={{
                    marginBottom: "15px",
                    fontWeight: "bold", 
                    color: "#1A3353"
                    }}>
                    Description 
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ width: '100%', color: "#1A3353", }}
                  component="form"
                  noValidate
                  autoComplete="off">
                  <div className="DescriptionDetail">
                    <div className="descriptionSubContainer">
                      <div className="descriptionTitle">Description</div>
                      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                        <div style={{
                          display: "flex",
                          flexDirection: "row", 
                          justifyContent: "space-between"
                          }}>
                        </div>
                        <TextareaAutosize
                          aria-label="minimum height"
                          name="description"
                          minRows={ 6 }
                          onChange={ onChange }
                          style={{ width: "70%", padding: "5px", justifyContent: "center", marginTop: "6px" }}
                          defaultValue={ state.opportunities && state.opportunities.opportunity_obj ? state.opportunities.opportunity_obj.description : "" }
                        />
                      </div>
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