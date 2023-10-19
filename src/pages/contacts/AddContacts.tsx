import React, { useState } from 'react'
import {
  TextField,
  TextareaAutosize,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Typography,
  Box,
  MenuItem,
  Tooltip
} from '@mui/material'
import { FaArrowDown } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContactUrl } from '../../services/ApiUrls';
import { CustomAppBar } from '../../components/CustomAppBar';
import { fetchData } from '../../components/FetchData';
import { AntSwitch, CustomSelectField, RequiredTextField } from '../../styles/CssStyled';
import '../../styles/style.css'

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
function AddContacts() {
  const navigate = useNavigate()
  const { state } = useLocation()
  // const currentPage = new URLSearchParams(location.search).get('page')

  // useEffect(() => {
  //   // Save the current location to localStorage or any other storage mechanism
  //   localStorage.setItem('currentPage', location.pathname);
  // }, [location.pathname]);

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

  const [validationErrors, setValidationErrors] = useState({
    first_name: '',
    last_name: '',
    primary_email: '',
    mobile_number: '',
    secondary_number: ''
  });
  // organization: '',
  //   title: '',
  //   language: '',
  //   department: '',
  //   twitter_username: ''
  const [imgData, setImgData] = useState([])
  const [logot, setLogot] = useState(false)
  const [logo, setLogo] = useState([])
  const [checked, setChecked] = useState(false)
  // const [firstNameMsg, setFirstNameMsg] = useState('')
  // const [lastNameMsg, setLastNameMsg] = useState('')
  // const [emailMsg, setEmailMsg] = useState('')
  // const [secondMailMsg, setSecondEmailMsg] = useState('')
  // const [phoneNumberMsg, setSecondEmailMsg] = useState('')
  // const [personName, setPersonName] = useState([])
  // const classes = useStyles()
  // const navigate = useNavigate()
  // const { state } = useLocation()
  // const textFieldClasses = textFieldStyled()
  // const theme = useTheme()

  // const handleChange = (target: any, key: any) => {
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
  //   } else if (target.name === 'do_not_call') {
  //     setChecked(target.checked)
  //     val.do_not_call = !checked
  //   }
  // }

  // const tagsHandle = (event: any, value: any) => {
  //   val.tags = JSON.stringify(value)
  // }

  // const contactHandle = (event, value) => {
  //   val.contacts = JSON.stringify(value)  
  // }

  // const changeHandler = (event: any) => {
  //   if (event.target.files[0]) {
  //     setLogo(event.target.files[0])
  //     const reader = new FileReader()
  //     reader.addEventListener('load', () => {
  //       // setImgData(reader?.result)
  //       setLogot(true)
  //     })
  //     val.lead_attachment = event.target.files[0]
  //   }
  // }

  // const assignToHandle = (event:any, value:any) => {
  //   const newKey = []
  //   const stringVal = ''
  //   value.map((item:any) => {
  //     return stringVal === newKey.push(item.id.toString())
  //   })
  //   val.assigned_to = JSON.stringify(newKey)
  // }
  // const validatation = () => {
  //   let flag = true
  //   if (!(Object.prototype.hasOwnProperty.call(val, 'salutation')) || val.title === '') {
  //     flag = false
  //     setError('*required  field')
  //     setMsg('salutation')
  //   } else if (!(Object.prototype.hasOwnProperty.call(val, 'first_name')) || val.opportunity_amount === '') {
  //     flag = false
  //     setError('*required field')
  //     setMsg('first_name')
  //   } else if (!(Object.prototype.hasOwnProperty.call(val, 'last_name')) || val.first_name === '') {
  //     setError('*required field')
  //     setMsg('last_name')
  //     flag = false
  //   } else if (!(Object.prototype.hasOwnProperty.call(val, 'title')) || val.first_name === '') {
  //     setError('*required field')
  //     setMsg('title')
  //     flag = false
  //   } else if ((Object.prototype.hasOwnProperty.call(val, 'primary_email'))) {
  //     const validEmail = isEmail(val.primary_email)
  //     if (validEmail === false) {
  //       setError('*email is not valid')
  //       setMsg('primary_email')
  //       flag = false
  //     }
  //   } else if ((Object.prototype.hasOwnProperty.call(val, 'secondary_email'))) {
  //     const validEmail = isEmail(val.secondary_email)
  //     if (validEmail === false) {
  //       setError('*email is not valid')
  //       setMsg('secondary_email')
  //       flag = false
  //     }
  //   } else if (!(Object.prototype.hasOwnProperty.call(val, 'address_line')) || val.address_line === '') {
  //     setError('*required address field')
  //     setMsg('address_line')
  //     flag = false
  //   } else {
  //     setError('')
  //     setMsg('')
  //   }
  //   return flag
  // }
  // const validation = () => {
  //   // let errors: Record<string, string> = {};
  //   let errors = { ...errorMsg };
  //   if (!(Object.prototype.hasOwnProperty.call(val as any, 'first_name')) || val.first_name === '') {
  //     setError(true)
  //     errors.first_name = 'is required'
  //   }
  //   if (!(Object.prototype.hasOwnProperty.call(val as any, 'last_name')) || val.last_name === '') {
  //     setError(true)
  //     errors.last_name = 'is required'
  //   }
  //   if (!(Object.prototype.hasOwnProperty.call(val as any, 'primary_email')) || val.primary_email === '') {
  //     setError(true)
  //     errors.primary_email = 'is required'
  //   }
  //   if (!(Object.prototype.hasOwnProperty.call(val as any, 'mobile_number')) || val.mobile_number === '') {
  //     setError(true)
  //     errors.mobile_number = 'is required'
  //   }
  //   console.log(errors, 'val')
  //   // if(errors){
  //   //   return setErrorMsg({})  
  //   // }
  //   return setErrorMsg(errors)
  // }
  // const validate = (values:any) => {
  //   let errors = {};

  //   // Add your validation logic here
  //   // Example: Check if the 'salutation' field is empty
  //   if (!values.salutation) {
  //     errors.salutation = 'Salutation is required';
  //   }

  //   // Add more validation rules for other fields

  //   return errors;
  // };
  const handleChange = (e: any) => {
    const { name, value, files, type, checked } = e.target;
    // if (name === 'file') {
    //   setFormData({ ...formData, file: files[0] });
    // }
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    }
    else {
      setFormData({ ...formData, [name]: value });
    }
    // setValidationErrors(({ ...validationErrors, [name]: '' }));
    // setErrors({});
    // const newValue = type === 'checkbox' ? checked : value;
    // setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submitForm();
    // let checkErrors: Record<string, string> = {};
    // if (!formData.first_name) {
    //   checkErrors = { ...checkErrors, first_name: 'First name is required' };
    // }
    // if (!formData.last_name) {
    //   checkErrors = { ...checkErrors, last_name: 'Last name is required' };
    // }

    // if (!formData.primary_email) {
    //   checkErrors = { ...checkErrors, primary_email: 'Email is required' };
    // } else if (!isValidEmail(formData.primary_email)) {
    //   checkErrors = { ...checkErrors, primary_email: 'Invalid email format' };
    // }

    // if (!formData.mobile_number) {
    //   checkErrors = { ...checkErrors, mobile_number: 'Phone number is required' };
    // } else if (!isValidPhoneNumber(formData.mobile_number)) {
    //   checkErrors = { ...checkErrors, mobile_number: 'Invalid format, please start with +91' };
    // }
    // if (!formData.secondary_number) {
    //   checkErrors = { ...checkErrors, secondary_number: 'Phone number is required' };
    // } else if (!isValidPhoneNumber(formData.secondary_number)) {
    //   checkErrors = { ...checkErrors, secondary_number: 'Invalid format, please start with +91' };
    // }
    // if (Object.keys(checkErrors).length === 0) {

    //   submitForm();
    // } else {
    //   setValidationErrors(checkErrors as any);
    // }

  };

  const isValidEmail = (email: any) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const isValidPhoneNumber = (phoneNumber: any) => {
    return /^\+91\d{10}$/.test(phoneNumber);
  };
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('Token'),
    org: localStorage.getItem('org')
  }
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
    fetchData(`${ContactUrl}/`, 'POST', JSON.stringify(data), headers)
      .then((res: any) => {
        console.log('Form data:', res);
        if (!res.error) {
          // setResponceError(data.error)
          // navigate('/contacts')
          resetForm()
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
    navigate('/app/contacts')
  }
  const module = 'Contacts'
  const crntPage = 'Add Contacts'
  const backBtn = 'Back To Contacts'

  const onCancel = () => {
    resetForm()
  }
  // console.log(errors, 'err')
  return (
    <Box sx={{ mt: '60px' }}>
      <CustomAppBar backbtnHandle={backbtnHandle} module={module} backBtn={backBtn} crntPage={crntPage} onCancel={onCancel} onSubmit={handleSubmit} />
      <Box sx={{ mt: "100px" }}>
        <form onSubmit={handleSubmit}>
          {/* lead details */}
          <div style={{ padding: '10px' }}>
            <div className='leadContainer'>
              <Accordion style={{ width: '98%' }}
                defaultExpanded
              >
                <AccordionSummary
                  expandIcon={<FaArrowDown />}
                >
                  <div className='typography'>
                    <Typography style={{ marginBottom: '15px', fontWeight: 'bold' }}>Basic Information</Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{ width: '98%', color: '#1A3353',mb:1 }}
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
                        <RequiredTextField
                          name='first_name'
                          value={formData.first_name}
                          onChange={handleChange}
                          // InputProps={{ style: { borderLeft: '2px red solid' } }}
                          // sx={{ borderLeft: '2px red solid' ,paddingLeft: '12px' }}
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
                        <RequiredTextField
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
                        <div className='fieldTitle'>Organization</div>
                        <RequiredTextField
                          name='organization'
                          value={formData.organization}
                          onChange={handleChange}
                          style={{ width: '70%' }}
                          size='small'
                          required
                          // InputProps={{
                          //   classes: {
                          //     root: textFieldClasses.fieldHeight
                          //   }
                          // }}
                          error={!!errors.organization || !!errors?.organization?.[0]}
                          helperText={errors.organization || errors?.organization?.[0] || ''}
                        />
                      </div>
                    </div>
                    <div className='fieldContainer2'>
                      <div className='fieldSubContainer'>
                        <div className='fieldTitle'>Primary Email</div>
                        <RequiredTextField
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
                        <div className='fieldTitle'>Department</div>
                        <RequiredTextField
                          name='department'
                          id='outlined-error-helper-text'
                          value={formData.department}
                          onChange={handleChange}
                          // InputProps={{
                          //   classes: {
                          //     root: textFieldClasses.fieldHeight
                          //   }
                          // }}
                          required
                          style={{ width: '70%' }}
                          size='small'
                          error={!!errors.department || !!errors?.department?.[0]}
                          helperText={errors.department || errors?.department?.[0] || ''}
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
                        <div className='fieldTitle'>Mobile Number</div>
                        <Tooltip title="Number must starts with +91">
                          <RequiredTextField
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
                      <div className='fieldSubContainer'>
                        <div className='fieldTitle'>Secondary Number</div>
                        <Tooltip title="Number must starts with +91">
                          <RequiredTextField
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
                    </div>
                    <div className='fieldContainer2'>
                      <div className='fieldSubContainer'>
                        <div className='fieldTitle'>Language</div>
                        <RequiredTextField
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
                <AccordionSummary
                  expandIcon={<FaArrowDown />}
                >
                  <div style={{ borderBottom: '1px solid lightgray', width: '100%' }}>
                    <Typography style={{ marginBottom: '15px', fontWeight: 'bold', color: '#1A3353' }}>Address</Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{ width: '98%', color: '#1A3353',mb:1 }}
                    component='form'
                  // noValidate
                  // autoComplete='off'
                  >
                    <div className='fieldContainer'>
                      <div className='fieldSubContainer'>
                        <div className='fieldTitle'>Address Lane</div>
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
                      <div className='fieldSubContainer'>
                        <div className='fieldTitle'>Country</div>
                        <CustomSelectField
                          name='country'
                          select
                          value={formData.country}
                          InputProps={{
                            style: {
                              height: '40px',
                              maxHeight: '40px'
                            }
                          }}
                          SelectProps={{
                            MenuProps: {
                              anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left'
                              },
                              transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left'
                              },
                              // getContentAnchorEl: null,
                              PaperProps: {
                                style: {
                                  maxHeight: '200px'
                                }
                              }
                            }
                          }}
                          onChange={handleChange}
                          sx={{ width: '70%' }}
                          helperText={errors?.country?.[0] ? errors?.country[0] : ''}
                          error={!!errors?.country?.[0]}
                        >
                          {state?.countries?.length && state?.countries.map((option: any) => (
                            <MenuItem key={option[0]} value={option[0]}>
                              {option[1]}
                            </MenuItem>
                          ))}
                        </CustomSelectField>
                        {/* <TextField
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
                          error={!!errors.country || !!errors?.country?.[0]}
                          helperText={errors.country || errors?.country?.[0] || ''}
                        /> */}
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
                <AccordionSummary
                  expandIcon={<FaArrowDown />}
                >
                  <div className='typography'>
                    <Typography style={{ marginBottom: '15px', fontWeight: 'bold' }}>Description</Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{ width: '100%', color: '#1A3353',mb:1 }}
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
                          style={{ width: '80%', padding: '5px' }}
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
                <AccordionSummary
                  expandIcon={<FaArrowDown />}
                >
                  <div style={{ borderBottom: '1px solid lightgray', width: '100%' }}>
                    <Typography style={{ marginBottom: '15px', fontWeight: 'bold', color: '#1A3353' }}>Socials</Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{ width: '100%', color: '#1A3353',mb:1 }}
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
                          error={!!errors && !!errors?.linked_in_url?.[0]}
                          helperText={errors?.linked_in_url || errors?.linked_in_url?.[0] || ''}
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
                          error={!!errors && !!errors?.facebook_url?.[0]}
                          helperText={errors?.facebook_url || errors?.facebook_url?.[0] || ''}
                        />
                      </div>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                      <div style={{
                        width: '40%', display: 'flex', flexDirection: 'row'
                        , marginLeft: '5%'
                      }}>
                        <div style={{ marginRight: '10px', fontSize: '13px', width: '22%', textAlign: 'right', fontWeight: 'bold' }}>Twitter Username</div>
                        <RequiredTextField
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

export default AddContacts
