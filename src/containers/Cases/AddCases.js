import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  TextField,
  Select,
  FormControl,
  TextareaAutosize,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Typography,
  Box,
  MenuItem
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import InputLabel from '@mui/material/InputLabel'
// import { useTheme } from '@mui/material/styles'

import '../Leads/lead_css.css'
import { CasesUrl } from '../../components/ApiUrls'
import { UseForm } from '../../components/UseForm'
import { fetchData } from '../../components/FetchData'
import { Appbar } from '../../components/Appbar'

const textFieldStyled = makeStyles(() => ({
  root: {
    borderLeft: '2px solid red',
    height: '40px'
  },
  fieldHeight: {
    height: '40px'
  },
  rootBox: {
    borderLeft: '2px solid red',
    height: '38px'
  }
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 310
    }
  }
}

export const AddCases = (props) => {
  const textFieldClasses = textFieldStyled()
  // const [errorMessage, setErrorMessage] = useState('')
  const [error, setError] = useState(false)
  const [errors, setErrors] = useState('')
  const [msg, setMsg] = useState('')
  const [responceError, setResponceError] = useState(false)
  const navigate = useNavigate()
  const { state } = useLocation()

  // const tagsHandle = (event, value) => {
  //   val.tags = JSON.stringify(value)
  // }

  const validatation = () => {
    let flag = true
    if (!(hasOwnProperty.call(val, 'name')) || val.name === '') {
      flag = false
      setError('*required  field')
      setMsg('name')
    } else if (!(Object.prototype.hasOwnProperty.call(val, 'status')) || val.website === '') {
      setError('*required field')
      setMsg('status')
      flag = false
    } else if (!(Object.prototype.hasOwnProperty.call(val, 'priority')) || val.phone === '') {
      setError('*required field')
      setMsg('priority')
      flag = false
    } else if (!(Object.prototype.hasOwnProperty.call(val, 'closed_on')) || val.email === '') {
      setError('*required field')
      setMsg('closed_on')
      flag = false
    } else {
      setError('')
      setMsg('')
    }
    return flag
  }

  const submitCallBack = () => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `jwt ${localStorage.getItem('Token')}`,
      org: localStorage.getItem('org')
    }
    if (validatation()) {
      fetchData(`${CasesUrl}/`, 'POST', JSON.stringify(val), headers)
        .then((data) => {
          if (!data.error) {
            setResponceError(data.error)
            navigate('/cases')
          }
          if (data.error) {
            setResponceError(data.error)
            setErrors(data.errors)
          }
        })
        .catch(() => {
        })
    }
  }

  const backbtnHandle = () => {
    navigate('/cases')
  }

  const [val, onChange, onSubmit] = UseForm(submitCallBack)
  const module = 'Cases'
  const crntPage = 'Add Cases'
  const backBtn = 'Back To Cases'

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Appbar backbtnHandle={backbtnHandle} module={module} backBtn={backBtn} crntPage={crntPage} />
        {/* contact details */}
        <div style={{ padding: '10px' }}>
          <div className='leadContainer'>
            <Accordion style={{ width: '98%' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <div className='typography'>
                  <Typography style={{
                    marginBottom: '15px',
                    fontWeight: 'bold',
                    color: '#1A3353'
                  }}
                  >
                    Cases Information
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{ width: '98%' }}
                  component='form'
                  noValidate
                  autoComplete='off'
                >
                  <div
                    className='fieldContainer'
                    style={{ color: '#1A3353', fontWeight: 'normal' }}
                  >
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Name</div>
                      <TextField
                        error={!!(msg === 'name' || errors.name)}
                        name='name'
                        id='outlined-error-helper-text'
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: '70%' }}
                        size='small'
                        required={!!(msg === 'name' || msg === 'required')}
                        helperText={
                          (error && msg === 'name') || msg === 'required' || responceError
                            ? errors ? errors.name ? errors.name : '' : error
                            : ''
                        }
                      />
                    </div>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Contacts</div>
                      <TextField
                        error={!!(msg === 'contacts' || errors.contacts)}
                        name='contacts'
                        id='outlined-error-helper-text'
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: '70%' }}
                        size='small'
                        helperText={
                          (error && msg === 'contacts') || msg === 'required' || responceError
                            ? errors ? errors.contacts ? errors.contacts : '' : error
                            : ''
                        }
                      />
                    </div>
                  </div>
                  <div
                    className='fieldContainer'
                    style={{ color: '#1A3353', fontWeight: 'normal' }}
                  >
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Status</div>
                      <TextField
                        error={!!(msg === 'status' || errors.status)}
                        name='status'
                        select
                        id='outlined-error-helper-text'
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: '70%' }}
                        size='small'
                        helperText={
                          (error && msg === 'status') || msg === 'required' || responceError
                            ? errors ? errors.status ? errors.status : '' : error
                            : ''
                        }
                      >
                        {state.status && state.status.map((option) => (
                          <MenuItem key={option[1]} value={option[0]}>
                            {option[0]}
                          </MenuItem>))}
                      </TextField>
                    </div>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Teams</div>
                      <TextField
                        error={!!(msg === 'teams' || errors.teams)}
                        name='teams'
                        id='outlined-error-helper-text'
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: '70%' }}
                        size='small'
                        helperText={
                          (error && msg === 'teams') || msg === 'required' || responceError
                            ? errors ? errors.teams ? errors.teams : '' : error
                            : ''
                        }
                      />
                    </div>
                  </div>
                  <div
                    className='fieldContainer'
                    style={{ color: '#1A3353', fontWeight: 'normal' }}
                  >
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Priority</div>
                      <FormControl sx={{ width: '70%' }}>
                        <InputLabel id='demo-multiple-name-label' />
                        <Select
                          labelId='demo-multiple-name-label'
                          id='demo-multiple-name'
                          name='priority'
                          size='small'
                          onChange={onChange}
                          MenuProps={MenuProps}
                        >
                          {
                            state.priority && state.priority.map((option) => (
                              <MenuItem key={option[1]} value={option[0]}>
                                {option[0]}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </div>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Users</div>
                      <TextField
                        error={!!(msg === 'users_mention' || errors.users_mention)}
                        name='users_mention'
                        id='outlined-error-helper-text'
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: '70%' }}
                        size='small'
                        required={!!(msg === 'users_mention' || msg === 'required')}
                        helperText={
                          (error && msg === 'users_mention') || msg === 'required' || responceError
                            ? errors ? errors.users_mention ? errors.users_mention : '' : error
                            : ''
                        }
                      />
                    </div>
                  </div>
                  <div
                    className='fieldContainer'
                    style={{ color: '#1A3353', fontWeight: 'normal' }}
                  >
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Type Of Case</div>
                      <FormControl sx={{ width: '70%' }}>
                        <InputLabel id='demo-multiple-name-label' />
                        <Select
                          labelId='demo-multiple-name-label'
                          id='demo-multiple-name'
                          name='case_type'
                          size='small'
                          onChange={onChange}
                          MenuProps={MenuProps}
                        >
                          {
                            state.type_of_case && state.type_of_case.map((option) => (
                              <MenuItem key={option[1]} value={option[0]}>
                                {option[0]}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </div>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Assigned Users</div>
                      <TextField
                        error={!!(msg === 'assigned_to' || errors.assigned_to)}
                        name='assigned_to'
                        id='outlined-error-helper-text'
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: '70%' }}
                        size='small'
                        helperText={
                          (error && msg === 'assigned_to') || msg === 'required' || responceError
                            ? errors ? errors.assigned_to ? errors.assigned_to : '' : error
                            : ''
                        }
                      />
                    </div>
                  </div>
                  <div
                    className='fieldContainer2'
                    style={{ color: '#1A3353', fontWeight: 'normal' }}
                  >
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Account</div>
                      <TextField
                        error={!!(msg === 'account' || errors.account)}
                        name='account'
                        id='outlined-error-helper-text'
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: '70%' }}
                        size='small'
                        required={!!(msg === 'account' || msg === 'required')}
                        helperText={
                          (error && msg === 'account') || msg === 'required' || responceError
                            ? errors ? errors.account ? errors.account : '' : error
                            : ''
                        }
                      />
                    </div>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Closed Date</div>
                      <TextField
                        error={!!(msg === 'closed_on' || errors.closed_on)}
                        name='closed_on'
                        id='outlined-error-helper-text'
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: '70%' }}
                        size='small'
                        required={!!(msg === 'closed_on' || msg === 'required')}
                        helperText={
                          (error && msg === 'closed_on') || msg === 'required' || responceError
                            ? errors ? errors.closed_on ? errors.closed_on : '' : error
                            : ''
                        }
                      />
                    </div>
                  </div>
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
          {/* Description details  */}
          <div className='leadContainer'>
            <Accordion style={{ width: '98%' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <div className='typography'>
                  <Typography style={{
                    marginBottom: '15px',
                    fontWeight: 'bold',
                    color: '#1A3353'
                  }}
                  >
                    Description
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{ width: '100%' }}
                  component='form'
                  noValidate
                  autoComplete='off'
                >
                  <div
                    className='DescriptionDetail'
                    style={{ color: '#1A3353', fontWeight: 'normal' }}
                  >
                    <div className='descriptionSubContainer'>
                      <div className='descriptionTitle'>Description</div>
                      <TextareaAutosize
                        aria-label='minimum height'
                        name='description'
                        minRows={8}
                        onChange={onChange} style={{ width: '80%', padding: '5px' }}
                        placeholder='Add Description'
                      />
                    </div>
                    <div />
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
