import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
    TextField,
    FormControl,
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
    FormHelperText,
    IconButton,
    Tooltip,
    Divider,
    Select
} from '@mui/material'
import '../../styles/style.css'
import { LeadUrl } from '../../services/ApiUrls'
import { fetchData, Header } from '../../components/FetchData'
import { CustomAppBar } from '../../components/CustomAppBar'
import { FaArrowDown, FaFileUpload, FaPalette, FaPercent, FaPlus, FaTimes, FaUpload } from 'react-icons/fa'
import { useForm } from '../../components/UseForm'
import { CustomPopupIcon, CustomSelectField, RequiredTextField, StyledSelect } from '../../styles/CssStyled'
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown'
import { FiChevronUp } from '@react-icons/all-files/fi/FiChevronUp'

// const useStyles = makeStyles({
//   btnIcon: {
//     height: '14px',
//     color: '#5B5C63'
//   },
//   breadcrumbs: {
//     color: 'white'
//   },
//   fields: {
//     height: '5px'
//   },
//   chipStyle: {
//     backgroundColor: 'red'
//   },
//   icon: {
//     '&.MuiChip-deleteIcon': {
//       color: 'darkgray'
//     }
//   }
// })

// const textFieldStyled = makeStyles(() => ({
//   root: {
//     borderLeft: '2px solid red',
//     height: '35px'
//   },
//   fieldHeight: {
//     height: '35px'
//   }
// }))

// function getStyles (name, personName, theme) {
//   return {
//     fontWeight:
//       theme.typography.fontWeightRegular
//   }
// }

type FormErrors = {
    title?: string[],
    first_name?: string[],
    last_name?: string[],
    account_name?: string[],
    phone?: string[],
    email?: string[],
    lead_attachment?: string[],
    opportunity_amount?: string[],
    website?: string[],
    description?: string[],
    teams?: string[],
    assigned_to?: string[],
    contacts?: string[],
    status?: string[],
    source?: string[],
    address_line?: string[],
    street?: string[],
    city?: string[],
    state?: string[],
    postcode?: string[],
    country?: string[],
    tags?: string[],
    company?: string[],
    probability?: number[],
    industry?: string[],
    skype_ID?: string[],
    file?: string[],
};
interface FormData {
    title: string,
    first_name: string,
    last_name: string,
    account_name: string,
    phone: string,
    email: string,
    lead_attachment: string | null,
    opportunity_amount: string,
    website: string,
    description: string,
    teams: string,
    assigned_to: string[],
    contacts: string[],
    status: string,
    source: string,
    address_line: string,
    street: string,
    city: string,
    state: string,
    postcode: string,
    country: string,
    tags: string[],
    company: string,
    probability: number,
    industry: string,
    skype_ID: string,
    file: string | null
}

export function EditLead() {
    const navigate = useNavigate()
    const location = useLocation();
    const { state } = location;
    const autocompleteRef = useRef<any>(null);
    const [reset, setReset] = useState(false)
    const [error, setError] = useState(false)
    const [selectedContacts, setSelectedContacts] = useState<any[]>([] || '');
    const [selectedAssignTo, setSelectedAssignTo] = useState<any[]>([] || '');
    const [selectedTags, setSelectedTags] = useState<any[]>([] || '');
    const [selectedCountry, setSelectedCountry] = useState<any[]>([] || '');
    const [sourceSelectOpen, setSourceSelectOpen] = useState(false)
    const [statusSelectOpen, setStatusSelectOpen] = useState(false)
    const [countrySelectOpen, setCountrySelectOpen] = useState(false)
    const [industrySelectOpen, setIndustrySelectOpen] = useState(false)
    const [errors, setErrors] = useState<FormErrors>({});
    const [formData, setFormData] = useState<FormData>({
        title: '',
        first_name: '',
        last_name: '',
        account_name: '',
        phone: '',
        email: '',
        lead_attachment: null,
        opportunity_amount: '',
        website: '',
        description: '',
        teams: '',
        assigned_to: [],
        contacts: [],
        status: 'assigned',
        source: 'call',
        address_line: '',
        street: '',
        city: '',
        state: '',
        postcode: '',
        country: '',
        tags: [],
        company: '',
        probability: 1,
        industry: 'ADVERTISING',
        skype_ID: '',
        file: null
    })
    useEffect(() => {
        setFormData(state?.value)
    }, [state?.id])


    useEffect(() => {
        if (reset) {
            setFormData(state?.value)
        }
        return () => {
            setReset(false)
        }
    }, [reset])
    // const changeHandler = (event: any) => {
    //   if (event.target.files[0]) {
    //     // setLogo(event.target.files[0])
    //     const reader = new FileReader()
    //     reader.addEventListener('load', () => {
    //       // setImgData(reader.result)
    //       // setLogot(true)
    //     })
    //     val.lead_attachment = event.target.files[0]
    //   }
    // }

    const handleChange2 = (title: any, val: any) => {
        // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        // console.log('nd', val)
        if (title === 'contacts') {
            setFormData({ ...formData, contacts: val.length > 0 ? val.map((item: any) => item.id) : [] });
            setSelectedContacts(val);
        } else if (title === 'assigned_to') {
            setFormData({ ...formData, assigned_to: val.length > 0 ? val.map((item: any) => item.id) : [] });
            setSelectedAssignTo(val);
        } else if (title === 'tags') {
            setFormData({ ...formData, assigned_to: val.length > 0 ? val.map((item: any) => item.id) : [] });
            setSelectedTags(val);
        }
        // else if (title === 'country') {
        //   setFormData({ ...formData, country: val || [] })
        //   setSelectedCountry(val);
        // }
        else {
            setFormData({ ...formData, [title]: val })
        }
    }
    const handleChange = (e: any) => {
        // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        // console.log('e.target',e)
        const { name, value, files, type, checked, id } = e.target;
        // console.log('auto', val)
        if (type === 'file') {
            setFormData({ ...formData, [name]: e.target.files?.[0] || null });
        }
        else if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        }
        else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        submitForm();
    }
    const submitForm = () => {
        const data = {
            title: formData.title,
            first_name: formData.first_name,
            last_name: formData.last_name,
            account_name: formData.account_name,
            phone: formData.phone,
            email: formData.email,
            // lead_attachment: formData.lead_attachment,
            lead_attachment: formData.file || [],
            // lead_attachment: [
            //     "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            //   ],
            opportunity_amount: formData.opportunity_amount,
            // opportunity_amount: "7800535409.9",
            website: formData.website,
            description: formData.description,
            // "website": "string",
            // "description": "string",
            teams: formData.teams,
            // teams: [
            //     "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            //   ],
            assigned_to: formData.assigned_to,
            // assigned_to: [
            //     "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            //   ],
            contacts: formData.contacts,
            // contacts: [
            //     "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            //   ],
            status: formData.status,
            source: formData.source,
            address_line: formData.address_line,
            street: formData.street,
            city: formData.city,
            state: formData.state,
            postcode: formData.postcode,
            country: formData.country,
            // status: "assigned",
            // source: "call",
            // address_line: "string",
            // street: "string",
            // city: "string",
            // state: "string",
            // postcode: "string",
            // country: "GB",

            tags: formData.tags || [],
            company: formData.company || '',
            probability: formData.probability,
            industry: formData.industry,
            skype_ID: formData.skype_ID
            // tags: [
            //     "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            // ],
            // company: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            // probability: 2147483647,
            // industry: "ADVERTISING",
            // skype_ID: "string"
        }
        // console.log(data, 'edit')
        fetchData(`${LeadUrl}/${state?.id}/`, 'PUT', JSON.stringify(data), Header)
            .then((res: any) => {
                // console.log('Form data:', res);
                if (!res.error) {
                    backbtnHandle()
                    // setResponceError(data.error)
                    // navigate('/contacts')
                    // resetForm()
                }
                if (res.error) {
                    setError(true)
                    setErrors(res?.errors)
                }
            })
            .catch(() => {
            })
    };
    const resetForm = () => {
        setFormData({
            title: '',
            first_name: '',
            last_name: '',
            account_name: '',
            phone: '',
            email: '',
            lead_attachment: null,
            opportunity_amount: '',
            website: '',
            description: '',
            teams: '',
            assigned_to: [],
            contacts: [],
            status: 'assigned',
            source: 'call',
            address_line: '',
            street: '',
            city: '',
            state: '',
            postcode: '',
            country: '',
            tags: [],
            company: '',
            probability: 1,
            industry: 'ADVERTISING',
            skype_ID: '',
            file: null
        });
        setErrors({})
        setSelectedContacts([]);
        setSelectedAssignTo([])
        setSelectedTags([])
        // setSelectedCountry([])
        // if (autocompleteRef.current) {
        //   console.log(autocompleteRef.current,'ccc')
        //   autocompleteRef.current.defaultValue([]);
        // }
    }
    const onCancel = () => {
        // resetForm()
        setReset(true)
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                // setFormData({ ...formData, lead_attachment: reader.result as string });
                setFormData({ ...formData, file: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };
    const backbtnHandle = () => {
        navigate('/app/leads/lead-details', { state: { leadId: state?.id, detail: true } })
        // navigate('/app/leads')
    }

    const module = 'Leads'
    const crntPage = 'Edit Lead'
    const backBtn = 'Back To Lead Details'

    // console.log(formData, 'leadsform')
    return (
        <Box sx={{ mt: '60px' }}>
            <CustomAppBar backbtnHandle={backbtnHandle} module={module} backBtn={backBtn} crntPage={crntPage} onCancel={onCancel} onSubmit={handleSubmit} />
            <Box sx={{ mt: "120px" }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ padding: '10px' }}>
                        <div className='leadContainer'>
                            <Accordion defaultExpanded style={{ width: '98%' }}>
                                <AccordionSummary expandIcon={<FiChevronDown style={{ fontSize: '25px' }} />}>
                                    <Typography className='accordion-header'>Account Information</Typography>
                                </AccordionSummary>
                                <Divider className='divider' />
                                <AccordionDetails>
                                    <Box
                                        sx={{ width: '98%', color: '#1A3353', mb: 1 }}
                                        component='form'
                                        noValidate
                                        autoComplete='off'
                                    >
                                        <div className='fieldContainer'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Lead Name</div>
                                                <TextField
                                                    name='account_name'
                                                    value={formData.account_name || ''}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    helperText={errors?.account_name?.[0] ? errors?.account_name[0] : ''}
                                                    error={!!errors?.account_name?.[0]}
                                                />
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Amount</div>
                                                <TextField
                                                    type={'number'}
                                                    name='opportunity_amount'
                                                    value={formData.opportunity_amount || ''}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    helperText={errors?.opportunity_amount?.[0] ? errors?.opportunity_amount[0] : ''}
                                                    error={!!errors?.opportunity_amount?.[0]}
                                                />
                                            </div>
                                        </div>
                                        <div className='fieldContainer2'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Website</div>
                                                <TextField
                                                    name='website'
                                                    value={formData.website}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    helperText={errors?.website?.[0] ? errors?.website[0] : ''}
                                                    error={!!errors?.website?.[0]}
                                                />
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Contact Name</div>
                                                <FormControl error={!!errors?.contacts?.[0]} sx={{ width: '70%' }}>
                                                    <Autocomplete
                                                        multiple
                                                        value={selectedContacts}
                                                        limitTags={2}
                                                        options={state.contacts || []}
                                                        getOptionLabel={(option: any) => state.contacts ? option?.first_name : option}
                                                        onChange={(e: any, value: any) => handleChange2('contacts', value)}
                                                        size='small'
                                                        filterSelectedOptions
                                                        renderTags={(value: any, getTagProps: any) =>
                                                            value.map((option: any, index: any) => (
                                                                <Chip
                                                                    deleteIcon={<FaTimes style={{ width: '9px' }} />}
                                                                    sx={{
                                                                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                                                        height: '18px'
                                                                    }}
                                                                    variant='outlined'
                                                                    label={state.contacts ? option?.first_name : option}
                                                                    {...getTagProps({ index })}
                                                                />
                                                            ))
                                                        }
                                                        popupIcon={<CustomPopupIcon><FaPlus className='input-plus-icon' /></CustomPopupIcon>}
                                                        renderInput={(params: any) => (
                                                            <TextField {...params}
                                                                placeholder='Add Contacts'
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    sx: {
                                                                        '& .MuiAutocomplete-popupIndicator': { '&:hover': { backgroundColor: 'white' } },
                                                                        '& .MuiAutocomplete-endAdornment': {
                                                                            mt: '-8px',
                                                                            mr: '-8px',
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                    <FormHelperText>{errors?.contacts?.[0] || ''}</FormHelperText>
                                                </FormControl>
                                            </div>
                                        </div>
                                        <div className='fieldContainer2'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Assign To</div>
                                                <FormControl error={!!errors?.assigned_to?.[0]} sx={{ width: '70%' }}>
                                                    <Autocomplete
                                                        // ref={autocompleteRef}
                                                        multiple
                                                        value={selectedAssignTo}
                                                        // name='contacts'
                                                        limitTags={2}
                                                        options={state?.users || []}
                                                        // options={state.contacts ? state.contacts.map((option: any) => option) : ['']}
                                                        getOptionLabel={(option: any) => state?.users ? option?.user_details?.email : option}
                                                        // getOptionLabel={(option: any) => option?.user__email}
                                                        onChange={(e: any, value: any) => handleChange2('assigned_to', value)}
                                                        size='small'
                                                        filterSelectedOptions
                                                        renderTags={(value, getTagProps) =>
                                                            value.map((option, index) => (
                                                                <Chip
                                                                    deleteIcon={<FaTimes style={{ width: '9px' }} />}
                                                                    sx={{
                                                                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                                                        height: '18px'

                                                                    }}
                                                                    variant='outlined'
                                                                    label={state?.users ? option?.user_details?.email : option}
                                                                    {...getTagProps({ index })}
                                                                />
                                                            ))
                                                        }
                                                        popupIcon={<CustomPopupIcon><FaPlus className='input-plus-icon' /></CustomPopupIcon>}
                                                        renderInput={(params) => (
                                                            <TextField {...params}
                                                                placeholder='Add Users'
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    sx: {
                                                                        '& .MuiAutocomplete-popupIndicator': { '&:hover': { backgroundColor: 'white' } },
                                                                        '& .MuiAutocomplete-endAdornment': {
                                                                            mt: '-8px',
                                                                            mr: '-8px',
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                    <FormHelperText>{errors?.assigned_to?.[0] || ''}</FormHelperText>
                                                </FormControl>
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Industry</div>
                                                <FormControl sx={{ width: '70%' }}>
                                                    <Select
                                                        name='industry'
                                                        value={formData.industry}
                                                        open={industrySelectOpen}
                                                        onClick={() => setIndustrySelectOpen(!industrySelectOpen)}
                                                        IconComponent={() => (
                                                            <div onClick={() => setIndustrySelectOpen(!industrySelectOpen)} className="select-icon-background">
                                                                {industrySelectOpen ? <FiChevronUp className='select-icon' /> : <FiChevronDown className='select-icon' />}
                                                            </div>
                                                        )}
                                                        className={'select'}
                                                        onChange={handleChange}
                                                        error={!!errors?.industry?.[0]}
                                                        MenuProps={{
                                                            PaperProps: {
                                                                style: {
                                                                    height: '200px'
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        {state?.industries?.length ? state?.industries.map((option: any) => (
                                                            <MenuItem key={option[0]} value={option[1]}>
                                                                {option[1]}
                                                            </MenuItem>
                                                        )) : [['ADVERTISING', 'ADVERTISING']].map((option: any) => (
                                                            <MenuItem key={option[0]} value={option[1]}>
                                                                {option[1]}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    <FormHelperText>{errors?.industry?.[0] ? errors?.industry[0] : ''}</FormHelperText>
                                                </FormControl>
                                                {/* <FormControl sx={{ width: '70%' }} error={!!errors?.industry?.[0]}>
                          <Select
                            // multiple
                            value={formData.industry}
                            onChange={handleChange}
                            sx={{ height: '40px', maxHeight: '40px' }}
                          >
                            {state?.industries?.length && state?.industries.map((option: any) => (
                              <MenuItem key={option[0]} value={option[1]}>
                                {option[1]}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>{errors?.industry?.[0] ? errors?.industry[0] : ''}</FormHelperText>
                        </FormControl> */}
                                            </div>
                                        </div>
                                        <div className='fieldContainer2'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Status</div>
                                                <FormControl sx={{ width: '70%' }}>
                                                    <Select
                                                        name='status'
                                                        value={formData.status}
                                                        open={statusSelectOpen}
                                                        onClick={() => setStatusSelectOpen(!statusSelectOpen)}
                                                        IconComponent={() => (
                                                            <div onClick={() => setStatusSelectOpen(!statusSelectOpen)} className="select-icon-background">
                                                                {statusSelectOpen ? <FiChevronUp className='select-icon' /> : <FiChevronDown className='select-icon' />}
                                                            </div>
                                                        )}
                                                        className={'select'}
                                                        onChange={handleChange}
                                                        error={!!errors?.status?.[0]}
                                                    >
                                                        {state?.status?.length && state?.status.map((option: any) => (
                                                            <MenuItem key={option[0]} value={option[1]}>
                                                                {option[1]}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    <FormHelperText>{errors?.status?.[0] ? errors?.status[0] : ''}</FormHelperText>
                                                </FormControl>
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>SkypeID</div>
                                                <TextField
                                                    name='skype_ID'
                                                    value={formData.skype_ID}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    helperText={errors?.skype_ID?.[0] ? errors?.skype_ID[0] : ''}
                                                    error={!!errors?.skype_ID?.[0]}
                                                />
                                            </div>
                                        </div>
                                        <div className='fieldContainer2'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Lead Source</div>
                                                <FormControl sx={{ width: '70%' }}>
                                                    <Select
                                                        name='source'
                                                        value={formData.source}
                                                        open={sourceSelectOpen}
                                                        onClick={() => setSourceSelectOpen(!sourceSelectOpen)}
                                                        IconComponent={() => (
                                                            <div onClick={() => setSourceSelectOpen(!sourceSelectOpen)} className="select-icon-background">
                                                                {sourceSelectOpen ? <FiChevronUp className='select-icon' /> : <FiChevronDown className='select-icon' />}
                                                            </div>
                                                        )}
                                                        className={'select'}
                                                        onChange={handleChange}
                                                        error={!!errors?.source?.[0]}
                                                    >
                                                        {state?.source?.length && state?.source.map((option: any) => (
                                                            <MenuItem key={option[0]} value={option[0]}>
                                                                {option[1]}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    <FormHelperText>{errors?.source?.[0] ? errors?.source[0] : ''}</FormHelperText>
                                                </FormControl>
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Lead Attachment</div>
                                                <TextField
                                                    name='lead_attachment'
                                                    value={formData.lead_attachment}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position='end'>
                                                                <IconButton disableFocusRipple
                                                                    disableTouchRipple
                                                                    sx={{ width: '40px', height: '40px', backgroundColor: 'whitesmoke', borderRadius: '0px', mr: '-13px', cursor: 'pointer' }}
                                                                >
                                                                    <label htmlFor='icon-button-file'>
                                                                        <input
                                                                            hidden
                                                                            accept='image/*'
                                                                            id='icon-button-file'
                                                                            type='file'
                                                                            name='account_attachment'
                                                                            onChange={(e: any) => {
                                                                                //  handleChange(e); 
                                                                                handleFileChange(e)
                                                                            }}
                                                                        />
                                                                        <FaUpload color='primary' style={{ fontSize: '15px', cursor: 'pointer' }} />
                                                                    </label>
                                                                </IconButton>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                    sx={{ width: '70%' }}
                                                    size='small'
                                                    helperText={errors?.lead_attachment?.[0] ? errors?.lead_attachment[0] : ''}
                                                    error={!!errors?.lead_attachment?.[0]}
                                                />
                                            </div>
                                        </div>
                                        <div className='fieldContainer2'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Tags</div>
                                                <FormControl error={!!errors?.tags?.[0]} sx={{ width: '70%' }}>
                                                    <Autocomplete
                                                        // ref={autocompleteRef}
                                                        value={selectedTags}
                                                        multiple
                                                        limitTags={5}
                                                        options={state?.tags || []}
                                                        // options={state.contacts ? state.contacts.map((option: any) => option) : ['']}
                                                        getOptionLabel={(option: any) => option}
                                                        onChange={(e: any, value: any) => handleChange2('tags', value)}
                                                        size='small'
                                                        filterSelectedOptions
                                                        renderTags={(value, getTagProps) =>
                                                            value.map((option, index) => (
                                                                <Chip
                                                                    deleteIcon={<FaTimes style={{ width: '9px' }} />}
                                                                    sx={{
                                                                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                                                        height: '18px'

                                                                    }}
                                                                    variant='outlined'
                                                                    label={option}
                                                                    {...getTagProps({ index })}
                                                                />
                                                            ))
                                                        }
                                                        popupIcon={<CustomPopupIcon><FaPlus className='input-plus-icon' /></CustomPopupIcon>}
                                                        renderInput={(params) => (
                                                            <TextField {...params}
                                                                placeholder='Add Tags'
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    sx: {
                                                                        '& .MuiAutocomplete-popupIndicator': { '&:hover': { backgroundColor: 'white' } },
                                                                        '& .MuiAutocomplete-endAdornment': {
                                                                            mt: '-8px',
                                                                            mr: '-8px',
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                    <FormHelperText>{errors?.tags?.[0] || ''}</FormHelperText>
                                                </FormControl>
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Probability</div>
                                                <TextField
                                                    name='probability'
                                                    value={formData.probability}
                                                    onChange={handleChange}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position='end'>
                                                                <IconButton disableFocusRipple disableTouchRipple
                                                                    sx={{ backgroundColor: '#d3d3d34a', width: '45px', borderRadius: '0px', mr: '-12px' }}>
                                                                    <FaPercent style={{ width: "12px" }} />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    helperText={errors?.probability?.[0] ? errors?.probability[0] : ''}
                                                    error={!!errors?.probability?.[0]}
                                                />

                                            </div>
                                        </div>
                                        {/* <div className='fieldContainer2'>
                      <div className='fieldSubContainer'>
                        <div className='fieldTitle'> Close Date</div>
                        <TextField
                          name='account_name'
                          type='date'
                          value={formData.account_name}
                          onChange={handleChange}
                          style={{ width: '70%' }}
                          size='small'
                          helperText={errors?.account_name?.[0] ? errors?.account_name[0] : ''}
                          error={!!errors?.account_name?.[0]}
                        />
                      </div>
                    </div> */}
                                        {/* <div className='fieldContainer2'>
                      <div className='fieldSubContainer'>
                        <div className='fieldTitle'>Pipeline</div>
                        <TextField
                          error={!!(msg === 'pipeline' || msg === 'required')}
                          name='pipeline'
                          id='outlined-error-helper-text'
                          // InputProps={{
                          //   classes: {
                          //     root: textFieldClasses.fieldHeight
                          //   }
                          // }}
                          onChange={onChange} style={{ width: '80%' }}
                          size='small'
                          helperText={
                            (error && msg === 'pipeline') || msg === 'required'
                              ? error
                              : ''
                          }
                        />
                      </div>
                      <div className='fieldSubContainer'>
                        <div className='fieldTitle'>Lost Reason </div>
                        <TextareaAutosize
                          aria-label='minimum height'
                          name='lost_reason'
                          minRows={2}
                          // onChange={onChange} 
                          style={{ width: '80%' }}
                        />
                      </div>
                    </div> */}
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                        {/* contact details */}
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '20px' }}>
                            <Accordion defaultExpanded style={{ width: '98%' }}>
                                <AccordionSummary expandIcon={<FiChevronDown style={{ fontSize: '25px' }} />}>
                                    <Typography className='accordion-header'>Account Information</Typography>
                                </AccordionSummary>
                                <Divider className='divider' />
                                <AccordionDetails>
                                    <Box
                                        sx={{ width: '98%', color: '#1A3353', mb: 1 }}
                                        component='form'
                                        noValidate
                                        autoComplete='off'
                                    >
                                        <div className='fieldContainer'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>First Name</div>
                                                <RequiredTextField
                                                    name='first_name'
                                                    required
                                                    value={formData.first_name}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    helperText={errors?.first_name?.[0] ? errors?.first_name[0] : ''}
                                                    error={!!errors?.first_name?.[0]}
                                                />
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Last Name</div>
                                                <RequiredTextField
                                                    name='last_name'
                                                    required
                                                    value={formData.last_name}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    helperText={errors?.last_name?.[0] ? errors?.last_name[0] : ''}
                                                    error={!!errors?.last_name?.[0]}
                                                />
                                            </div>
                                        </div>
                                        <div className='fieldContainer2'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Job Title</div>
                                                <RequiredTextField
                                                    name='title'
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    helperText={errors?.title?.[0] ? errors?.title[0] : ''}
                                                    error={!!errors?.title?.[0]}
                                                />
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Phone Number</div>
                                                <Tooltip title="Number must starts with +91">
                                                    <TextField
                                                        name='phone'
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        style={{ width: '70%' }}
                                                        size='small'
                                                        helperText={errors?.phone?.[0] ? errors?.phone[0] : ''}
                                                        error={!!errors?.phone?.[0]}
                                                    />
                                                </Tooltip>
                                            </div>
                                        </div>
                                        <div className='fieldSubContainer' style={{ marginLeft: '5%', marginTop: '19px' }}>
                                            <div className='fieldTitle'>Email Address</div>
                                            {/* <div style={{ width: '40%', display: 'flex', flexDirection: 'row', marginTop: '19px', marginLeft: '6.6%' }}>
                      <div style={{ marginRight: '10px', fontSize: '13px', width: '22%', textAlign: 'right', fontWeight: 'bold' }}>Email Address</div> */}
                                            <TextField
                                                name='email'
                                                type='email'
                                                value={formData.email}
                                                onChange={handleChange}
                                                style={{ width: '70%' }}
                                                size='small'
                                                helperText={errors?.email?.[0] ? errors?.email[0] : ''}
                                                error={!!errors?.email?.[0]}
                                            />
                                        </div>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                        {/* address details */}
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '20px' }}>
                            <Accordion defaultExpanded style={{ width: '98%' }}>
                                <AccordionSummary expandIcon={<FiChevronDown style={{ fontSize: '25px' }} />}>
                                    <Typography className='accordion-header'>Account Information</Typography>
                                </AccordionSummary>
                                <Divider className='divider' />
                                <AccordionDetails>
                                    <Box
                                        sx={{ width: '98%', color: '#1A3353', mb: 1 }}
                                        component='form'
                                        noValidate
                                        autoComplete='off'
                                    >
                                        <div className='fieldContainer'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'
                                                // style={{ marginRight: '10px', fontSize: '13px', width: '22%', textAlign: 'right', fontWeight: 'bold' }}
                                                >Address Lane</div>
                                                <TextField
                                                    name='address_line'
                                                    value={formData.address_line}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    helperText={errors?.address_line?.[0] ? errors?.address_line[0] : ''}
                                                    error={!!errors?.address_line?.[0]}
                                                />
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>City</div>
                                                <TextField
                                                    name='city'
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    helperText={errors?.city?.[0] ? errors?.city[0] : ''}
                                                    error={!!errors?.city?.[0]}
                                                />
                                            </div>
                                        </div>
                                        <div className='fieldContainer2'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Street</div>
                                                <TextField
                                                    name='street'
                                                    value={formData.street}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    helperText={errors?.street?.[0] ? errors?.street[0] : ''}
                                                    error={!!errors?.street?.[0]}
                                                />
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>State</div>
                                                <TextField
                                                    name='state'
                                                    value={formData.state}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    helperText={errors?.state?.[0] ? errors?.state[0] : ''}
                                                    error={!!errors?.state?.[0]}
                                                />
                                            </div>
                                        </div>
                                        <div className='fieldContainer2'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Pincode</div>
                                                <TextField
                                                    name='postcode'
                                                    value={formData.postcode}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    helperText={errors?.postcode?.[0] ? errors?.postcode[0] : ''}
                                                    error={!!errors?.postcode?.[0]}
                                                />
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Country</div>
                                                <FormControl sx={{ width: '70%' }}>
                                                    <Select
                                                        name='country'
                                                        value={formData.country}
                                                        open={countrySelectOpen}
                                                        onClick={() => setCountrySelectOpen(!countrySelectOpen)}
                                                        IconComponent={() => (
                                                            <div onClick={() => setCountrySelectOpen(!countrySelectOpen)} className="select-icon-background">
                                                                {countrySelectOpen ? <FiChevronUp className='select-icon' /> : <FiChevronDown className='select-icon' />}
                                                            </div>
                                                        )}
                                                        MenuProps={{
                                                            PaperProps: {
                                                                style: {
                                                                    height: '200px'
                                                                }
                                                            }
                                                        }}
                                                        className={'select'}
                                                        onChange={handleChange}
                                                        error={!!errors?.country?.[0]}
                                                    >
                                                        {state?.countries?.length && state?.countries.map((option: any) => (
                                                            <MenuItem key={option[0]} value={option[0]}>
                                                                {option[1]}
                                                            </MenuItem>
                                                        ))}

                                                    </Select>
                                                    <FormHelperText>{errors?.country?.[0] ? errors?.country[0] : ''}</FormHelperText>
                                                </FormControl>
                                                {/* <FormControl error={!!errors?.country?.[0]} sx={{ width: '70%' }}>
                          <Autocomplete
                            // ref={autocompleteRef}
                            // freeSolo
                            value={selectedCountry}
                            options={state.countries || []}
                            getOptionLabel={(option: any) => option[1]}
                            onChange={(e: any, value: any) => handleChange2('country', value)}
                            size='small'
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  deleteIcon={<FaTimes style={{ width: '9px' }} />}
                                  sx={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                    height: '18px'

                                  }}
                                  variant='outlined'
                                  label={option[1]}
                                  {...getTagProps({ index })}
                                />
                              ))
                            }
                            popupIcon={<IconButton
                              disableFocusRipple
                              disableRipple
                              sx={{
                                width: '45px', height: '40px',
                                borderRadius: '0px',
                                backgroundColor: '#d3d3d34a'
                              }}><FaArrowDown style={{ width: '15px' }} /></IconButton>}
                            renderInput={(params) => (
                              <TextField {...params}
                                // placeholder='Add co'
                                InputProps={{
                                  ...params.InputProps,
                                   sx: {
                                                                        '& .MuiAutocomplete-popupIndicator': { '&:hover': { backgroundColor: 'white' } },
                                                                        '& .MuiAutocomplete-endAdornment': {
                                                                            mt: '-8px',
                                                                            mr: '-8px',
                                                                        }
                                                                    }
                                }}
                              />
                            )}
                          />
                          <FormHelperText>{errors?.country?.[0] || ''}</FormHelperText>
                        </FormControl> */}
                                            </div>
                                        </div>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                        {/* Description details  */}
                        <div className='leadContainer'>
                            <Accordion defaultExpanded style={{ width: '98%' }}>
                                <AccordionSummary expandIcon={<FiChevronDown style={{ fontSize: '25px' }} />}>
                                    <Typography className='accordion-header'>Account Information</Typography>
                                </AccordionSummary>
                                <Divider className='divider' />
                                <AccordionDetails>
                                    <Box
                                        sx={{ width: '100%', mb: 1 }}
                                        component='form'
                                        noValidate
                                        autoComplete='off'
                                    >
                                        <div className='DescriptionDetail'>
                                            <div className='descriptionSubContainer'>
                                                <div className='descriptionTitle'>Description</div>
                                                <TextareaAutosize
                                                    name='description'
                                                    minRows={8}
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    style={{ width: '80%', padding: '5px', fontSize: '16px' }}
                                                    placeholder='Add Description'
                                                // error={!!errors?.description?.[0]}
                                                // helperText={error && errors?.description?.[0] ? errors?.description[0] : ''}
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
        </Box >
    )
}
