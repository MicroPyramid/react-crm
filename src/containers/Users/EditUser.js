import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  TextField,
  TextareaAutosize,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Typography,
  Box
  // Button,
  // MenuItem,
  // Autocomplete
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import isEmail from 'validator/lib/isEmail'

import '../Leads/lead_css.css'
import { UseForm } from '../../components/UseForm'
import { UserUrl } from '../../components/ApiUrls'
import { fetchData } from '../../components/FetchData'
import { Appbar } from '../../components/Appbar'

const textFieldStyled = makeStyles(() => ({
  root: {
    borderLeft: '2px solid red',
    height: '35px'
  },
  fieldHeight: {
    height: '35px'
  }
}))

export function EditUser () {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [error, setError] = useState(false)
  const [errors, setErrors] = useState('')
  const [msg, setMsg] = useState('')
  // const [setAssignTo] = useState('')
  // const [setSource] = useState('')
  // const [setStatus] = useState('')
  const [responceError, setResponceError] = useState(false)
  const textFieldClasses = textFieldStyled()

  // const handleChange = (target, key) => {
  //   if (target.name === 'assign_to') {
  //     const newKey = []
  //     newKey.push((key.key).replace(/[^0-9]/g, '', '$'))
  //     val.assigned_to = JSON.stringify(newKey)
  //     setAssignTo(target.value)
  //   } else if (target.name === 'status') {
  //     val.status = target.value
  //     setStatus(target.value)
  //   } else if (target.name === 'source') {
  //     val.source = target.value
  //     setSource(target.value)
  //   } else if (target.name === 'industry') {
  //     val.industry = target.value
  //   } else if (target.name === 'organization') {
  //     val.organization = target.value
  //   } else if (target.name === 'first_name') {
  //     val.first_name = target.value
  //   } else if (target.name === 'last_name') {
  //     val.last_name = target.value
  //   } else if (target.name === 'date_of_birth') {
  //     val.date_of_birth = target.value
  //   } else if (target.name === 'title') {
  //     val.title = target.value
  //   } else if (target.name === 'primary_email') {
  //     val.primary_email = target.value
  //   } else if (target.name === 'secondary_email') {
  //     val.secondary_email = target.value
  //   } else if (target.name === 'mobile_number') {
  //     val.mobile_number = target.value
  //   } else if (target.name === 'secondary_number') {
  //     val.secondary_number = target.value
  //   } else if (target.name === 'department') {
  //     val.department = target.value
  //   } else if (target.name === 'language') {
  //     val.language = target.value
  //   } else if (target.name === 'language') {
  //     val.language = target.value
  //   } else if (target.name === 'postcode') {
  //     val.postcode = target.value
  //   } else if (target.name === 'facebook_url') {
  //     val.facebook_url = target.value
  //   } else if (target.name === 'twitter_username') {
  //     val.twitter_username = target.value
  //   } else if (target.name === 'linked_in_url') {
  //     val.linked_in_url = target.value
  //   }
  // }

  // const tagsHandle = (event, value) => {
  //   val.tags = JSON.stringify(value)
  // }

  // const assignToHandle = (event, value) => {
  //   const newKey = []
  //   let stringVal = ''
  //   value.map((item) => {
  //     stringVal =
  //       newKey.push(item.id.toString())
  //   })
  //   val.assigned_to = JSON.stringify(newKey)
  // }

  const validatation = () => {
    let flag = true
    if (!(Object.prototype.hasOwnProperty.call(val, 'salutation')) || val.title === '') {
      flag = false
      setError('*required  field')
      setMsg('salutation')
    } else if (!(Object.prototype.hasOwnProperty.call(val, 'first_name')) || val.opportunity_amount === '') {
      flag = false
      setError('*required field')
      setMsg('first_name')
    } else if (!(Object.prototype.hasOwnProperty.call(val, 'last_name')) || val.first_name === '') {
      setError('*required field')
      setMsg('last_name')
      flag = false
    } else if (!(Object.prototype.hasOwnProperty.call(val, 'title')) || val.first_name === '') {
      setError('*required field')
      setMsg('title')
      flag = false
    } else if ((Object.prototype.hasOwnProperty.call(val, 'primary_email'))) {
      const validEmail = isEmail(val.primary_email)
      if (validEmail === false) {
        setError('*email is not valid')
        setMsg('primary_email')
        flag = false
      }
    } else if ((Object.prototype.hasOwnProperty.call(val, 'secondary_email'))) {
      const validEmail = isEmail(val.secondary_email)
      if (validEmail === false) {
        setError('*email is not valid')
        setMsg('secondary_email')
        flag = false
      }
    } else if (!(Object.prototype.hasOwnProperty.call(val, 'address_line')) || val.address_line === '') {
      setError('*required address field')
      setMsg('address_line')
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
      fetchData(`${UserUrl}/`, 'POST', JSON.stringify(val), headers)
        .then((data) => {
          if (!data.error) {
            setResponceError(data.error)
            navigate('/Contact')
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
    navigate('/users')
  }

  const [val, onChange, onSubmit] = UseForm(submitCallBack)
  const module = 'Users'
  const crntPage = 'Edit Users'
  const backBtn = 'Back To Users'

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
                  <Typography style={{ marginBottom: '15px', fontWeight: 'bold' }}>
                    User Information
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{ width: '98%', color: '#1A3353' }}
                  component='form'
                  noValidate
                  autoComplete='off'
                >
                  <div className='fieldContainer'>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>User Name</div>
                      <TextField
                        error={!!(msg === 'salutation' || errors.title)}
                        name='salutation'
                        id='outlined-error-helper-text'
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: '70%' }}
                        size='small'
                        required={!!(msg === 'salutation' || msg === 'required')}
                        helperText={
                          (error && msg === 'salutation') || msg === 'required' || responceError
                            ? errors ? errors.title ? errors.title : '' : error
                            : ''
                        }
                      />
                    </div>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>User Type</div>
                      <TextField
                        name='lead_source'
                        select
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: '70%' }}
                      />
                    </div>
                  </div>
                  <div className='fieldContainer2'>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Role</div>
                      <TextField
                        name='lead_source'
                        select
                        defaultValue={state.editData && state.editData ? state.editData.role : '--'}
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: '70%' }}
                      />
                    </div>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Reports To</div>
                      <TextField
                        error={!!(msg === 'title' || msg === 'required')}
                        name='title'
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
                          (error && msg === 'title') || msg === 'required'
                            ? error
                            : ''
                        }
                      />
                    </div>
                  </div>
                  <div className='fieldContainer2'>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Password</div>
                      <TextField
                        error={!!(msg === 'organization' || msg === 'required')}
                        name='organization'
                        id='outlined-error-helper-text'
                        onChange={onChange}
                        style={{ width: '70%' }}
                        size='small'
                        helperText={
                          (error && msg === 'organization') || msg === 'required'
                            ? error
                            : ''
                        }
                      />
                    </div>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Change Password</div>
                      <TextField
                        error={!!(msg === 'title' || msg === 'required')}
                        name='title'
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
                          (error && msg === 'title') || msg === 'required'
                            ? error
                            : ''
                        }
                      />
                    </div>
                  </div>
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
          {/* Email Information */}
          <div className='leadContainer'>
            <Accordion style={{ width: '98%' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <div
                  className='typography'
                >
                  <Typography style={{ marginBottom: '15px', fontWeight: 'bold' }}>Email Information</Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{ width: '98%', color: '#1A3353' }}
                  component='form'
                  noValidate
                  autoComplete='off'
                >
                  <div className='fieldContainer'>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>First Name</div>
                      <TextField
                        error={msg === 'address_line'}
                        name='address_line'
                        id='outlined-error-helper-text'
                        defaultValue={state.editData.user_details ? state.editData.user_details.first_name : ''}
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: '70%' }}
                        required={!!(msg === 'address_line' || msg === 'required')}
                        helperText={
                          msg === 'address_line' || msg === 'required'
                            ? error
                            : ''
                        }
                      />
                    </div>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Last Name</div>
                      <TextField
                        name='city'
                        error={!!(msg === 'city' || msg === 'required')}
                        id='outlined-error-helper-text'
                        defaultValue={state.editData.user_details ? state.editData.user_details.last_name : ''}
                        onChange={onChange}
                        style={{ width: '70%' }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        size='small'
                        helperText={
                          (error && msg === 'city') || msg === 'required'
                            ? error
                            : ''
                        }
                      />
                    </div>
                  </div>
                  <div className='fieldContainer2'>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Title</div>
                      <TextField
                        id='outlined-error-helper-text'
                        error={!!(msg === 'street' || msg === 'required')}
                        name='street'
                        onChange={onChange} style={{ width: '70%' }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        helperText={
                          (error && msg === 'street') || msg === 'required'
                            ? error
                            : ''
                        }
                      />
                    </div>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Primary Email</div>
                      <TextField
                        name='state'
                        error={!!(msg === 'state' || msg === 'required')}
                        id='outlined-error-helper-text'
                        onChange={onChange} style={{ width: '70%' }}
                        defaultValue={state.editData.user_details ? state.editData.user_details.email : ''}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        size='small'
                        helperText={
                          (error && msg === 'state') || msg === 'required'
                            ? error
                            : ''
                        }
                      />
                    </div>
                  </div>
                  <div className='fieldContainer2'>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Secondary Email</div>
                      <TextField
                        id='outlined-error-helper-text'
                        error={!!(msg === 'street' || msg === 'required')}
                        name='street'
                        onChange={onChange} style={{ width: '70%' }}
                        defaultValue={state.editData.user_details ? state.editData.user_details.alternate_email : ''}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        size='small'
                        helperText={
                          (error && msg === 'street') || msg === 'required'
                            ? error
                            : ''
                        }
                      />
                    </div>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Mobile Number</div>
                      <TextField
                        name='state'
                        error={!!(msg === 'state' || msg === 'required')}
                        id='outlined-error-helper-text'
                        onChange={onChange} style={{ width: '70%' }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        size='small'
                        helperText={
                          (error && msg === 'state') || msg === 'required'
                            ? error
                            : ''
                        }
                      />
                    </div>
                  </div>
                  <div className='fieldContainer2'>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Secondary Number</div>
                      <TextField
                        id='outlined-error-helper-text'
                        error={!!(msg === 'street' || msg === 'required')}
                        name='street'
                        onChange={onChange} style={{ width: '70%' }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        size='small'
                        helperText={
                          (error && msg === 'street') || msg === 'required'
                            ? error
                            : ''
                        }
                      />
                    </div>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Fax</div>
                      <TextField
                        name='state'
                        error={!!(msg === 'state' || msg === 'required')}
                        id='outlined-error-helper-text'
                        onChange={onChange} style={{ width: '70%' }}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        size='small'
                        helperText={
                          (error && msg === 'state') || msg === 'required'
                            ? error
                            : ''
                        }
                      />
                    </div>
                  </div>
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
          {/* Address Details */}
          <div className='leadContainer'>
            <Accordion style={{ width: '98%' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <div className='typography'>
                  <Typography
                    style={{ marginBottom: '15px', fontWeight: 'bold' }}
                  >
                    Address Details
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{ width: '98%', color: '#1A3353' }}
                  component='form'
                  noValidate
                  autoComplete='off'
                >
                  <div className='fieldContainer'>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Address Lane</div>
                      <TextField
                        error={!!(msg === 'salutation' || errors.title)}
                        name='salutation'
                        id='outlined-error-helper-text'
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        defaultValue={state.editData.address ? state.editData.address.address_line : ''}
                        style={{ width: '70%' }}
                        size='small'
                        required={!!(msg === 'salutation' || msg === 'required')}
                        helperText={
                          (error && msg === 'salutation') || msg === 'required' || responceError
                            ? errors ? errors.title ? errors.title : '' : error
                            : ''
                        }
                      />
                    </div>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Street</div>
                      <TextField
                        error={msg === 'first_name'}
                        name='first_name'
                        id='outlined-error-helper-text'
                        onChange={onChange}
                        defaultValue={state.editData.address ? state.editData.address.street : ''}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: '70%' }}
                        size='small'
                        required={!!(msg === 'first_name' || msg === 'required')}
                        helperText={
                          msg === 'first_name' || msg === 'required'
                            ? error
                            : ''
                        }
                      />
                    </div>
                  </div>
                  <div className='fieldContainer2'>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>City</div>
                      <TextField
                        error={!!(msg === 'role' || msg === 'required')}
                        required={msg === 'role'}
                        name='role'
                        defaultValue={state.editData.address ? state.editData.address.city : ''}
                        id='outlined-error-helper-text'
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        onChange={onChange}
                        style={{ width: '70%' }}
                        size='small'
                        helperText={
                          (error && msg === 'role') || msg === 'required'
                            ? error
                            : ''
                        }
                      />
                    </div>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>State</div>
                      <TextField
                        error={!!(msg === 'date_of_birth' || msg === 'required')}
                        name='date_of_birth'
                        id='outlined-error-helper-text'
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        defaultValue={state.editData.address ? state.editData.address.state : ''}
                        required={!!(msg === 'date_of_birth' || msg === 'required')}
                        onChange={onChange} style={{ width: '70%' }}
                        size='small'
                        helperText={
                          (error && msg === 'date_of_birth') || msg === 'required'
                            ? error
                            : ''
                        }
                      />
                    </div>
                  </div>
                  <div className='fieldContainer2'>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Pincode</div>
                      <TextField
                        error={!!(msg === 'salutation' || errors.title)}
                        name='salutation'
                        defaultValue={state.editData.address ? state.editData.address.postcode : ''}
                        id='outlined-error-helper-text'
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.fieldHeight
                          }
                        }}
                        style={{ width: '70%' }}
                        size='small'
                        required={!!(msg === 'salutation' || msg === 'required')}
                        helperText={
                          (error && msg === 'salutation') || msg === 'required' || responceError
                            ? errors ? errors.title ? errors.title : '' : error
                            : ''
                        }
                      />
                    </div>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Country</div>
                      <TextField
                        error={!!(msg === 'title' || msg === 'required')}
                        name='title'
                        defaultValue={state.editData.address ? state.editData.address.country : ''}
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
                          (error && msg === 'title') || msg === 'required'
                            ? error
                            : ''
                        }
                      />
                    </div>
                  </div>
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
          {/* Business Hours */}
          <div className='leadContainer'>
            <Accordion style={{ width: '98%' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <div className='typography'>
                  <Typography
                    style={{ marginBottom: '15px', fontWeight: 'bold' }}
                  >
                    Business Hours
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{ width: '98%', color: '#1A3353' }}
                  component='form'
                  noValidate
                  autoComplete='off'
                >
                  <div>
                    <div className='fieldSubContainer' style={{ marginLeft: '4.8%' }}>
                      <div className='fieldTitle'>Business Hours</div>
                      <TextField
                        name='lead_source'
                        select
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: '70%' }}
                      />
                    </div>
                  </div>
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
          {/* Preferences */}
          <div className='leadContainer'>
            <Accordion style={{ width: '98%' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <div className='typography'>
                  <Typography
                    style={{ marginBottom: '15px', fontWeight: 'bold' }}
                  >
                    Preferences
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{ width: '98%', color: '#1A3353' }}
                  component='form'
                  noValidate
                  autoComplete='off'
                >
                  <div className='fieldContainer'>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Default Page After Login</div>
                      <TextField
                        name='lead_source'
                        select
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: '70%' }}
                      />
                    </div>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Persone Name Format</div>
                      <TextField
                        name='lead_source'
                        select
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: '70%' }}
                      />
                    </div>
                  </div>
                  <div className='fieldContainer2'>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Prefferred Currency</div>
                      <TextField
                        name='lead_source'
                        select
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: '70%' }}
                      />
                    </div>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Digit Grouping Pattern</div>
                      <TextField
                        name='lead_source'
                        select
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: '70%' }}
                      />
                    </div>
                  </div>
                  <div className='fieldContainer2'>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Digit Grouping Seperator</div>
                      <TextField
                        name='lead_source'
                        select
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: '70%' }}
                      />
                    </div>
                    <div className='fieldSubContainer'>
                      <div className='fieldTitle'>Number of Currency Decimals</div>
                      <TextField
                        name='lead_source'
                        select
                        onChange={onChange}
                        InputProps={{
                          classes: {
                            root: textFieldClasses.root
                          }
                        }}
                        style={{ width: '70%' }}
                      />
                    </div>
                  </div>
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
          {/* Signature Block */}
          <div className='leadContainer'>
            <Accordion style={{ width: '98%' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <div className='typography'>
                  <Typography style={{ marginBottom: '15px', fontWeight: 'bold' }}>Signature Block</Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{ width: '100%', color: '#1A3353' }}
                  component='form'
                  noValidate
                  autoComplete='off'
                >
                  <div className='DescriptionDetail'>
                    <div className='descriptionSubContainer'>
                      <div className='descriptionTitle'>Description</div>
                      <TextareaAutosize
                        aria-label='minimum height'
                        name='description'
                        minRows={8}
                        defaultValue={state.editData && state.editData.description ? state.editData.description : ''}
                        onChange={onChange}
                        style={{ width: '70%', padding: '5px' }}
                        placeholder='Add Description'
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
