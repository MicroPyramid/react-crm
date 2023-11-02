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
  Autocomplete,
  Tooltip,
  Divider
} from '@mui/material'

import React, { useEffect, useState } from 'react'
import { FaArrowDown, FaPlus, FaTimes } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContactUrl, Header } from '../../services/ApiUrls';
import { CustomAppBar } from '../../components/CustomAppBar';
import { fetchData } from '../../components/FetchData';
// import { ContactUrl } from '../../components/ApiUrls';
// import { CustomAppBar } from '../../components/CustomAppBar';
// import { fetchData } from '../../components/FetchData';
import { useForm } from '../../components/UseForm';
import { AntSwitch } from '../../styles/CssStyled';
// import { AntSwitch } from '../../../../react-crm-2.0/src/styles/CssStyled';
// import { ContactUrl, LeadUrl } from '../../../../components/ApiUrls';
// import { Appbar } from '../../../../components/CustomAppBar'
// import { fetchData } from '../../../../components/FetchData';
// import { useForm } from '../../../../components/UseForm';
// import { AntSwitch } from '../../../../styles/CssStyled';
import '../../styles/style.css'
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown';

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
// interface FormErrors {
//   [key: string]: string;
// }
type FormErrors = {
  salutation?: string[];
  first_name?: string[];
  last_name?: string[];
  organization?: string[];
  title?: string[];
  primary_email?: string[];
  secondary_email?: string[];
  mobile_number?: string[];
  secondary_number?: string[];
  department?: string[];
  country?: string[];
  language?: string[];
  do_not_call?: string[];
  address?: string[];
  description?: string[];
  linked_in_url?: string[];
  facebook_url?: string[];
  twitter_username?: string[];
};

// interface FormData {
//   salutation: string;
//   // Add other form fields as needed
// }
function EditContact() {
  const navigate = useNavigate()
  const location = useLocation();
  const [reset, setReset] = useState(false)
  const [error, setError] = useState(false)
  const [formData, setFormData] = useState({
    salutation: '',
    first_name: '',
    last_name: '',
    primary_email: '',
    secondary_email: '',
    mobile_number: '',
    secondary_number: '',
    date_of_birth: '',
    organization: '',
    title: '',
    language: '',
    do_not_call: false,
    department: '',
    address: '',
    street: '',
    city: '',
    state: '',
    country: '',
    postcode: '',
    description: '',
    linked_in_url: '',
    facebook_url: '',
    twitter_username: ''
  })
  const [errors, setErrors] = useState<FormErrors>({});
  useEffect(() => {
    setFormData(location?.state?.value)
  }, [location?.state?.id])

  useEffect(() => {
    if (reset) {
      setFormData(location?.state?.value)
    }
    return () => {
      setReset(false)
    }
  }, [reset])

  const handleChange = (e: any) => {
    const { name, value, files, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    }
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submitForm();
  };

  const isValidEmail = (email: any) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const isValidPhoneNumber = (phoneNumber: any) => {
    return /^\+91\d{10}$/.test(phoneNumber);
  };

  const submitForm = () => {
    // console.log('Form data:', data);
    const data = {
      salutation: formData.salutation,
      first_name: formData.first_name,
      last_name: formData.last_name,
      organization: formData.organization,
      title: formData.title,
      primary_email: formData.primary_email,
      secondary_email: formData.secondary_email,
      mobile_number: formData.mobile_number,
      secondary_number: formData.secondary_number,
      department: formData.department,
      country: formData.country,
      language: formData.language,
      do_not_call: formData.do_not_call,
      address: formData.address,
      description: formData.description,
      linked_in_url: formData.linked_in_url,
      facebook_url: formData.facebook_url,
      twitter_username: formData.twitter_username
    }
    console.log(data, 'edit')
    fetchData(`${ContactUrl}/${location?.state?.id}/`, 'PUT', JSON.stringify(data), Header)
      .then((res: any) => {
        console.log('Form data:', res);
        if (!res.error) {
          backbtnHandle()
          // setResponceError(data.error)
          // navigate('/contacts')
          // resetForm()
        }
        if (res.error) {
          setError(true)
          setErrors(res?.errors?.contact_errors)
        }
      })
      .catch(() => {
      })
  };

  const resetForm = () => {
    setFormData({
      salutation: '',
      first_name: '',
      last_name: '',
      primary_email: '',
      secondary_email: '',
      mobile_number: '',
      secondary_number: '',
      date_of_birth: '',
      organization: '',
      title: '',
      language: '',
      do_not_call: false,
      department: '',
      address: '',
      street: '',
      city: '',
      state: '',
      country: '',
      postcode: '',
      description: '',
      linked_in_url: '',
      facebook_url: '',
      twitter_username: ''
    });
    setErrors({});
  }

  const backbtnHandle = () => {
    navigate('/app/contacts/contact-details', { state: { contactId: { id: location?.state?.id }, detail: true } })
  }
  const module = 'Contacts'
  const crntPage = 'Edit Contact'
  const backBtn = 'Back To Contact Detail'

  const onCancel = () => {
    setReset(true)
    // resetForm()
  }
  // console.log(formData, 'editform')
  return (
    <Box sx={{ mt: '60px' }}>
      <CustomAppBar backbtnHandle={backbtnHandle} module={module} crntPage={crntPage} backBtn={backBtn} onCancel={onCancel} onSubmit={handleSubmit} />
      <Box sx={{ mt: "120px" }}>
        <form onSubmit={handleSubmit}>
          {/* lead details */}
          <div style={{ padding: '10px' }}>
            <div className='leadContainer'>
              <Accordion style={{ width: '98%' }}
                defaultExpanded
              >
                <AccordionSummary expandIcon={<FiChevronDown style={{ fontSize: '25px' }} />}>
                  <Typography className='accordion-header'>Account Information</Typography>
                </AccordionSummary>
                <Divider className='divider' />
                <AccordionDetails>
                  <Box
                    sx={{ width: '98%', color: '#1A3353', mb: 1 }}
                    component='form'
                    // noValidate
                    autoComplete='off'
                  >
                    <div className='fieldContainer'>
                      <div className='fieldSubContainer'>
                        <div className='fieldTitle'>Salutation</div>
                        <TextField
                          name='salutation'
                          className="custom-textfield"
                          value={formData.salutation}
                          onChange={handleChange}
                          // value={val.salutation || ''}
                          // InputProps={{
                          //   classes: {
                          //     root: textFieldClasses.root
                          //   }
                          // }}
                          style={{ width: '70%' }}
                          size='small'
                          helperText={errors?.salutation?.[0] ? errors?.salutation[0] : ''}
                          error={!!errors?.salutation?.[0]}

                        />
                      </div>
                      <div className='fieldSubContainer'>
                        <div className='fieldTitle'>First Name</div>
                        <TextField
                          name='first_name'
                          value={formData.first_name}
                          onChange={handleChange}
                          // sx={{ borderLeft: '1px red solid' }}
                          // InputProps={{
                          //   classes: {
                          //     root: textFieldClasses.root
                          //   }
                          // }}
                          style={{ width: '70%' }}
                          size='small'
                          required
                          error={!!errors.first_name || !!errors?.first_name?.[0]}
                          helperText={errors.first_name || errors?.first_name?.[0] || ''}
                        />
                      </div>
                    </div>
                    <div className='fieldContainer2'>
                      <div className='fieldSubContainer'>
                        <div className='fieldTitle'>Last Name</div>
                        <TextField
                          name='last_name'
                          // InputProps={{
                          //   classes: {
                          //     root: textFieldClasses.root
                          //   }
                          // }}
                          value={formData.last_name}
                          onChange={handleChange}
                          style={{ width: '70%' }}
                          size='small'
                          required
                          error={!!errors.last_name || !!errors?.last_name?.[0]}
                          helperText={errors.last_name || errors?.last_name?.[0] || ''}
                        />
                      </div>
                      <div className='fieldSubContainer'>
                        <div className='fieldTitle'>Date Of Birth</div>
                        <TextField
                          // error={!!(msg === 'date_of_birth' || msg === 'required')}
                          name='date_of_birth'
                          // error={error && !!errors?.date_of_birth?.[0]}
                          // InputProps={{
                          //   classes: {
                          //     root: textFieldClasses.fieldHeight
                          //   }
                          // }}
                          value={formData.date_of_birth}
                          onChange={handleChange}
                          style={{ width: '70%' }}
                          size='small'
                          type='date'
                        />
                      </div>
                    </div>
                    <div className='fieldContainer2'>
                      <div className='fieldSubContainer'>
                        <div className='fieldTitle'>Organization</div>
                        <TextField
                          name='organization'
                          value={formData.organization}
                          onChange={handleChange}
                          style={{ width: '70%' }}
                          size='small'
                          // InputProps={{
                          //   classes: {
                          //     root: textFieldClasses.fieldHeight
                          //   }
                          // }}
                          error={!!errors.organization || !!errors?.organization?.[0]}
                          helperText={errors.organization || errors?.organization?.[0] || ''}
                        />
                      </div>
                      <div className='fieldSubContainer'>
                        <div className='fieldTitle'>Title</div>
                        <TextField
                          // error={!!(msg === 'title' || msg === 'required')}
                          error={error && !!errors?.title?.[0]}
                          name='title'
                          value={formData.title}
                          onChange={handleChange}
                          // InputProps={{
                          //   classes: {
                          //     root: textFieldClasses.root
                          //   }
                          // }}
                          required
                          style={{ width: '70%' }}
                          size='small'
                          helperText={error && errors?.title?.[0] ? errors?.title[0] : ''}
                        />
                      </div>
                    </div>
                    <div className='fieldContainer2'>
                      <div className='fieldSubContainer'>
                        <div className='fieldTitle'>Primary Email</div>
                        <TextField
                          name='primary_email'
                          value={formData.primary_email}
                          onChange={handleChange}
                          // InputProps={{
                          //   classes: {
                          //     root: textFieldClasses.fieldHeight
                          //   }
                          // }}
                          required
                          style={{ width: '70%' }}
                          size='small'
                          error={!!errors.primary_email || !!errors?.primary_email?.[0]}
                          helperText={errors.primary_email || errors?.primary_email?.[0] || ''}
                        />
                      </div>
                      <div className='fieldSubContainer'>
                        <div className='fieldTitle'>Secondary Email</div>
                        <TextField
                          name='secondary_email'
                          value={formData.secondary_email}
                          onChange={handleChange}
                          // InputProps={{
                          //   classes: {
                          //     root: textFieldClasses.fieldHeight
                          //   }
                          // }}
                          style={{ width: '70%' }}
                          size='small'
                          error={!!errors.secondary_email || !!errors?.secondary_email?.[0]}
                          helperText={errors.secondary_email || errors?.secondary_email?.[0] || ''}
                        />
                      </div>
                    </div>
                    <div className='fieldContainer2'>
                      <div className='fieldSubContainer'>
                        <div className='fieldTitle'>Secondary Number</div>
                        <Tooltip title="Number must starts with +91">
                          <TextField
                            required
                            name='secondary_number'
                            value={formData.secondary_number}
                            onChange={handleChange}
                            // InputProps={{
                            //   classes: {
                            //     root: textFieldClasses.fieldHeight
                            //   }
                            // }}
                            style={{ width: '70%' }}
                            size='small'
                            error={!!errors.secondary_number || !!errors?.secondary_number?.[0]}
                            helperText={errors.secondary_number || errors?.secondary_number?.[0] || ''}
                          />
                        </Tooltip>
                      </div>
                      <div className='fieldSubContainer'>
                        <div className='fieldTitle'>Mobile Number</div>
                        <Tooltip title="Number must starts with +91">
                          <TextField
                            name='mobile_number'
                            id='outlined-error-helper-text'
                            value={formData.mobile_number}
                            onChange={handleChange}
                            // InputProps={{
                            //   classes: {
                            //     root: textFieldClasses.fieldHeight
                            //   }
                            // }}
                            required
                            style={{ width: '70%' }}
                            size='small'
                            error={!!errors.mobile_number || !!errors?.mobile_number?.[0]}
                            helperText={errors.mobile_number || errors?.mobile_number?.[0] || ''}
                          />
                        </Tooltip>
                      </div>
                    </div>
                    <div className='fieldContainer2'>
                      <div className='fieldSubContainer'>
                        <div className='fieldTitle'>Department</div>
                        <TextField
                          name='department'
                          id='outlined-error-helper-text'
                          value={formData.department}
                          onChange={handleChange}
                          // InputProps={{
                          //   classes: {
                          //     root: textFieldClasses.fieldHeight
                          //   }
                          // }}
                          style={{ width: '70%' }}
                          size='small'
                          error={!!errors.department || !!errors?.department?.[0]}
                          helperText={errors.department || errors?.department?.[0] || ''}
                        />
                      </div>
                      <div className='fieldSubContainer'>
                        <div className='fieldTitle'>Language</div>
                        <TextField
                          required
                          name='language'
                          value={formData.language}
                          onChange={handleChange}
                          // InputProps={{
                          //   classes: {
                          //     root: textFieldClasses.fieldHeight
                          //   }
                          // }}
                          style={{ width: '70%' }}
                          size='small'
                          error={!!errors.language || !!errors?.language?.[0]}
                          helperText={errors.language || errors?.language?.[0] || ''}
                        />
                      </div>
                    </div>
                    <div className='fieldContainer2'>
                      <div className='fieldSubContainer'>
                        <div className='fieldTitle'>Do Not Call</div>
                        <AntSwitch
                          // inputProps={{ 'aria-label': 'ant design' }}
                          name='do_not_call'
                          checked={formData.do_not_call}
                          // value={formData.do_not_call}
                          onChange={handleChange}
                        // onChange={(e: any) => handleChange(e.target)}
                        />
                      </div>
                      <div className='fieldSubContainer'>
                        &nbsp;
                      </div>
                    </div>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </div>
            {/* address details */}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '20px' }}>
              <Accordion style={{ width: '98%' }}
                defaultExpanded
              >
                <AccordionSummary expandIcon={<FiChevronDown style={{ fontSize: '25px' }} />}>
                  <Typography className='accordion-header'>Account Information</Typography>
                </AccordionSummary>
                <Divider className='divider' />
                <AccordionDetails>
                  <Box
                    sx={{ width: '100%', color: '#1A3353', mb: 1 }}
                    component='form'
                  // noValidate
                  // autoComplete='off'
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                      <div style={{ width: '40%', display: 'flex', flexDirection: 'row' }}>
                        <div style={{ marginRight: '10px', fontSize: '13px', width: '22%', textAlign: 'right', fontWeight: 'bold' }}>Address Lane</div>
                        <TextField
                          required
                          name='address'
                          value={formData.address}
                          onChange={handleChange}
                          // InputProps={{
                          //   classes: {
                          //     root: textFieldClasses.root
                          //   }
                          // }}
                          style={{ width: '70%' }}
                          size='small'
                          error={!!errors.address || !!errors?.address?.[0]}
                          helperText={errors.address || errors?.address?.[0] || ''}
                        />
                      </div>
                      <div style={{ width: '40%', display: 'flex', flexDirection: 'row' }}>
                        <div style={{ marginRight: '10px', fontSize: '13px', width: '22%', textAlign: 'right', fontWeight: 'bold' }}>City</div>
                        <TextField
                          name='city'
                          // error={error && !!errors?.city?.[0]}
                          value={formData.city}
                          onChange={handleChange}
                          style={{ width: '70%' }}
                          // InputProps={{
                          //   classes: {
                          //     root: textFieldClasses.fieldHeight
                          //   }
                          // }}
                          size='small'
                        // helperText={error && errors?.city?.[0] ? errors?.city[0] : ''}
                        />
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '20px' }}>
                      <div style={{ width: '40%', display: 'flex', flexDirection: 'row' }}>
                        <div style={{ marginRight: '10px', fontSize: '13px', width: '22%', textAlign: 'right', fontWeight: 'bold' }}>Street</div>
                        <TextField
                          // error={error && !!errors?.street?.[0]}
                          name='street'
                          value={formData.street}
                          onChange={handleChange}
                          style={{ width: '70%' }}
                          // InputProps={{
                          //   classes: {
                          //     root: textFieldClasses.fieldHeight
                          //   }
                          // }}
                          size='small'
                        // helperText={error && errors?.street?.[0] ? errors?.street[0] : ''}
                        />
                      </div>
                      <div style={{ width: '40%', display: 'flex', flexDirection: 'row' }}>
                        <div style={{ marginRight: '10px', fontSize: '13px', width: '22%', textAlign: 'right', fontWeight: 'bold' }}>State</div>
                        <TextField
                          name='state'
                          // error={error && !!errors?.state?.[0]}
                          value={formData.state}
                          onChange={handleChange}
                          style={{ width: '70%' }}
                          // InputProps={{
                          //   classes: {
                          //     root: textFieldClasses.fieldHeight
                          //   }
                          // }}
                          size='small'
                        // helperText={error && errors?.state?.[0] ? errors?.state[0] : ''}
                        />
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '20px' }}>
                      <div style={{ width: '40%', display: 'flex', flexDirection: 'row' }}>
                        <div style={{ marginRight: '10px', fontSize: '13px', width: '22%', textAlign: 'right', fontWeight: 'bold' }}>Pincode</div>
                        <TextField
                          // error={error && !!errors?.postcode?.[0]}
                          name='postcode'
                          value={formData.postcode}
                          onChange={handleChange}
                          // InputProps={{
                          //   classes: {
                          //     root: textFieldClasses.fieldHeight
                          //   }
                          // }}
                          style={{ width: '70%' }}
                          size='small'
                        // helperText={error && errors?.postcode?.[0] ? errors?.postcode[0] : ''}
                        />
                      </div>
                      <div style={{ width: '40%', display: 'flex', flexDirection: 'row' }}>
                        <div style={{ marginRight: '10px', fontSize: '13px', width: '22%', textAlign: 'right', fontWeight: 'bold' }}>Country</div>
                        <TextField
                          name='country'
                          // error={error && !!errors?.country?.[0]}
                          value={formData.country}
                          onChange={handleChange}
                          // InputProps={{
                          //   classes: {
                          //     root: textFieldClasses.fieldHeight
                          //   }
                          // }}
                          style={{ width: '70%' }}
                          size='small'
                        // helperText={error && errors?.country?.[0] ? errors?.country[0] : ''}
                        />
                      </div>
                    </div>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </div>
            {/* Description details  */}
            <div className='leadContainer'>
              <Accordion
                defaultExpanded
                style={{ width: '98%' }}>
                <AccordionSummary expandIcon={<FiChevronDown style={{ fontSize: '25px' }} />}>
                  <Typography className='accordion-header'>Account Information</Typography>
                </AccordionSummary>
                <Divider className='divider' />
                <AccordionDetails>
                  <Box
                    sx={{ width: '100%', color: '#1A3353', mb: 1 }}
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
                          value={formData.description}
                          onChange={handleChange}
                          style={{ width: '70%', padding: '5px' }}
                          placeholder='Add Description'
                        // error={error && !!errors?.description?.[0]}
                        // helperText={error && errors?.description?.[0] ? errors?.description[0] : ''}
                        />
                      </div>
                    </div>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </div>
            {/* Socials */}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '20px' }}>
              <Accordion
                defaultExpanded
                style={{ width: '98%' }}>
                <AccordionSummary expandIcon={<FiChevronDown style={{ fontSize: '25px' }} />}>
                  <Typography className='accordion-header'>Account Information</Typography>
                </AccordionSummary>
                <Divider className='divider' />
                <AccordionDetails>
                  <Box
                    sx={{ width: '100%', color: '#1A3353', mb: 1 }}
                    component='form'
                    noValidate
                    autoComplete='off'
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                      <div style={{ width: '40%', display: 'flex', flexDirection: 'row' }}>
                        <div style={{ marginRight: '10px', fontSize: '13px', width: '22%', textAlign: 'right', fontWeight: 'bold' }}>Linkedin Url</div>
                        <TextField
                          name='linked_in_url'
                          value={formData.linked_in_url}
                          onChange={handleChange}
                          // InputProps={{
                          //   classes: {
                          //     root: textFieldClasses.fieldHeight
                          //   }
                          // }}
                          style={{ width: '70%' }}
                          size='small'
                        // helperText={error && errors?.linked_in_url?.[0] ? errors?.linked_in_url[0] : ''}
                        />
                      </div>
                      <div style={{ width: '40%', display: 'flex', flexDirection: 'row' }}>
                        <div style={{ marginRight: '10px', fontSize: '13px', width: '22%', textAlign: 'right', fontWeight: 'bold' }}>Facebook Url</div>
                        <TextField
                          name='facebook_url'
                          value={formData.facebook_url}
                          onChange={handleChange}
                          style={{ width: '70%' }}
                          // InputProps={{
                          //   classes: {
                          //     root: textFieldClasses.fieldHeight
                          //   }
                          // }}
                          size='small'
                        // error={error && !!errors?.facebook_url?.[0]}
                        // helperText={error && errors?.facebook_url?.[0] ? errors?.facebook_url[0] : ''}
                        />
                      </div>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                      <div style={{
                        width: '40%', display: 'flex', flexDirection: 'row'
                        , marginLeft: '5%'
                      }}>
                        <div style={{ marginRight: '10px', fontSize: '13px', width: '22%', textAlign: 'right', fontWeight: 'bold' }}>Twitter Username</div>
                        <TextField
                          required
                          name='twitter_username'
                          value={formData.twitter_username}
                          onChange={handleChange}
                          style={{ width: '70%' }}
                          // InputProps={{
                          //   classes: {
                          //     root: textFieldClasses.fieldHeight
                          //   }
                          // }}
                          size='small'
                          error={!!errors.twitter_username || !!errors?.twitter_username?.[0]}
                          helperText={errors.twitter_username || errors?.twitter_username?.[0] || ''}
                        />
                      </div>
                    </div>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </form>
      </Box>

    </Box>
  )
}

export default EditContact
