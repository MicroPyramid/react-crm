import React, { ChangeEvent, useRef, useState } from 'react'
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
    Tooltip
} from '@mui/material'
import '../../styles/style.css'
import { LeadUrl, OpportunityUrl } from '../../services/ApiUrls'
import { fetchData } from '../../components/FetchData'
import { CustomAppBar } from '../../components/CustomAppBar'
import { FaArrowDown, FaFileUpload, FaPalette, FaPercent, FaPlus, FaTimes, FaUpload } from 'react-icons/fa'
import { useForm } from '../../components/UseForm'
import { CustomSelectField, RequiredTextField, StyledSelect } from '../../styles/CssStyled'

// {
//     "name": "string",
//     "account": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     "amount": "-23",
//     "currency": "AED",
//     "stage": "QUALIFICATION",
//     "teams": [
//       "3fa85f64-5717-4562-b3fc-2c963f66afa6"
//     ],
//     "lead_source": "NONE",
//     "probability": 2147483647,
//     "description": "string",
//     "assigned_to": [
//       "3fa85f64-5717-4562-b3fc-2c963f66afa6"
//     ],
//     "contacts": [
//       "3fa85f64-5717-4562-b3fc-2c963f66afa6"
//     ],
//     "due_date": "2023-10-12",
//     "tags": [
//       "3fa85f64-5717-4562-b3fc-2c963f66afa6"
//     ],
//     "opportunity_attachment": "string"
//   }

type FormErrors = {
    // title?: string[],
    // first_name?: string[],
    // last_name?: string[],
    // account_name?: string[],
    // phone?: string[],
    // email?: string[],
    // lead_attachment?: string[],
    // opportunity_amount?: string[],
    // website?: string[],
    // description?: string[],
    // teams?: string[],
    // assigned_to?: string[],
    // contacts?: string[],
    // status?: string[],
    // source?: string[],
    // address_line?: string[],
    // street?: string[],
    // city?: string[],
    // state?: string[],
    // postcode?: string[],
    // country?: string[],
    // tags?: string[],
    // company?: string[],
    // probability?: number[],
    // industry?: string[],
    // skype_ID?: string[],
    // file?: string[],

    name?: string[],
    account?: string[],
    amount?: string[],
    currency?: string[],
    stage?: string[],
    teams?: string[],
    lead_source?: string[],
    probability?: string[],
    description?: string[],
    assigned_to?: string[],
    contacts?: string[],
    due_date?: string[],
    tags?: string[],
    opportunity_attachment?: string[],
    file?: string[]


};
interface FormData {
    // title: string,
    // first_name: string,
    // last_name: string,
    // account_name: string,
    // phone: string,
    // email: string,
    // lead_attachment: string | null,
    // opportunity_amount: string,
    // website: string,
    // description: string,
    // teams: string,
    // assigned_to: string[],
    // contacts: string[],
    // status: string,
    // source: string,
    // address_line: string,
    // street: string,
    // city: string,
    // state: string,
    // postcode: string,
    // country: string,
    // tags: string[],
    // company: string,
    // probability: number,
    // industry: string,
    // skype_ID: string,
    // file: string | null

    name: string,
    account: string,
    amount: string,
    currency: string,
    stage: string,
    teams: string[],
    lead_source: string,
    probability: number,
    description: string,
    assigned_to: string[],
    contacts: string[],
    due_date: string,
    tags: string[],
    opportunity_attachment: string | null,
    file: string | null
}

export function AddOpportunity() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const autocompleteRef = useRef<any>(null);
    const [error, setError] = useState(false)
    const [selectedContacts, setSelectedContacts] = useState<any[]>([]);
    const [selectedAssignTo, setSelectedAssignTo] = useState<any[]>([]);
    const [selectedTags, setSelectedTags] = useState<any[]>([]);
    const [selectedTeams, setSelectedTeams] = useState<any[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<any[]>([]);
    const [errors, setErrors] = useState<FormErrors>({});
    const [formData, setFormData] = useState<FormData>({
        // title: '',
        // first_name: '',
        // last_name: '',
        // account_name: '',
        // phone: '',
        // email: '',
        // lead_attachment: null,
        // opportunity_amount: '',
        // website: '',
        // description: '',
        // teams: '',
        // assigned_to: [],
        // contacts: [],
        // status: 'assigned',
        // source: 'call',
        // address_line: '',
        // street: '',
        // city: '',
        // state: '',
        // postcode: '',
        // country: '',
        // tags: [],
        // company: '',
        // probability: 1,
        // industry: 'ADVERTISING',
        // skype_ID: '',
        // file: null

        name: '',
        account: '',
        amount: '',
        currency: '',
        stage: '',
        teams: [],
        lead_source: '',
        probability: 1,
        description: '',
        assigned_to: [],
        contacts: [],
        due_date: '',
        tags: [],
        opportunity_attachment: null,
        file: null
    })

    const handleChange2 = (title: any, val: any) => {
        if (title === 'contacts') {
            setFormData({ ...formData, contacts: val.length > 0 ? val.map((item: any) => item.id) : [] });
            setSelectedContacts(val);
        } else if (title === 'assigned_to') {
            setFormData({ ...formData, assigned_to: val.length > 0 ? val.map((item: any) => item.id) : [] });
            setSelectedAssignTo(val);
        } else if (title === 'tags') {
            setFormData({ ...formData, assigned_to: val.length > 0 ? val.map((item: any) => item.id) : [] });
            setSelectedTags(val);
        } else if (title === 'teams') {
            setFormData({ ...formData, teams: val.length > 0 ? val.map((item: any) => item.id) : [] });
            setSelectedTags(val);
        }
        else {
            setFormData({ ...formData, [title]: val })
        }
    }
    const handleChange = (e: any) => {
        const { name, value, files, type, checked, id } = e.target;
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
    const backbtnHandle = () => {
        navigate('/app/opportunities')
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        submitForm();
    }
    const submitForm = () => {
        // console.log('Form data:', formData.lead_attachment,'sfs', formData.file);
        const data = {
            // title: formData.title,
            // first_name: formData.first_name,
            // last_name: formData.last_name,
            // account_name: formData.account_name,
            // phone: formData.phone,
            // email: formData.email,
            // // lead_attachment: formData.lead_attachment,
            // lead_attachment: formData.file,
            // opportunity_amount: formData.opportunity_amount,
            // website: formData.website,
            // description: formData.description,
            // teams: formData.teams,
            // assigned_to: formData.assigned_to,
            // contacts: formData.contacts,
            // status: formData.status,
            // source: formData.source,
            // address_line: formData.address_line,
            // street: formData.street,
            // city: formData.city,
            // state: formData.state,
            // postcode: formData.postcode,
            // country: formData.country,
            // tags: formData.tags,
            // company: formData.company,
            // probability: formData.probability,
            // industry: formData.industry,
            // skype_ID: formData.skype_ID

            name: formData.name,
            account: formData.account,
            amount: formData.amount,
            currency: formData.currency,
            stage: formData.stage,
            teams: formData.teams,
            lead_source: formData.lead_source,
            probability: formData.probability,
            description: formData.description,
            assigned_to: formData.assigned_to,
            contacts: formData.contacts,
            due_date: formData.due_date,
            tags: formData.tags,
            // opportunity_attachment: formData.opportunity_attachment,
            opportunity_attachment: formData.file
        }
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('Token'),
            org: localStorage.getItem('org')
        }
        fetchData(`${OpportunityUrl}/`, 'POST', JSON.stringify(data), headers)
            .then((res: any) => {
                // console.log('Form data:', res);
                if (!res.error) {
                    resetForm()
                    navigate('/app/opportunities')
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
            // title: '',
            // first_name: '',
            // last_name: '',
            // account_name: '',
            // phone: '',
            // email: '',
            // lead_attachment: null,
            // opportunity_amount: '',
            // website: '',
            // description: '',
            // teams: '',
            // assigned_to: [],
            // contacts: [],
            // status: 'assigned',
            // source: 'call',
            // address_line: '',
            // street: '',
            // city: '',
            // state: '',
            // postcode: '',
            // country: '',
            // tags: [],
            // company: '',
            // probability: 1,
            // industry: 'ADVERTISING',
            // skype_ID: '',
            // file: null

            name: '',
            account: '',
            amount: '',
            currency: '',
            stage: '',
            teams: [],
            lead_source: '',
            probability: 1,
            description: '',
            assigned_to: [],
            contacts: [],
            due_date: '',
            tags: [],
            opportunity_attachment: null,
            file: null
        });
        setErrors({})
        setSelectedContacts([]);
        setSelectedAssignTo([])
        setSelectedTags([])
        setSelectedTeams([])
    }
    const onCancel = () => {
        resetForm()
    }

    const module = 'Opportunities'
    const crntPage = 'Add Opportunity'
    const backBtn = 'Back To Opportunities'

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                // setFormData({ ...formData, lead_attachment: reader.result as string });
                setFormData({ ...formData, file: reader.result as string });
                // setFormData({ ...formData, opportunity_attachment: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    // console.log(formData, 'leadsform')
    return (
        <Box sx={{ mt: '60px' }}>
            <CustomAppBar backbtnHandle={backbtnHandle} module={module} backBtn={backBtn} crntPage={crntPage} onCancel={onCancel} onSubmit={handleSubmit} />
            <Box sx={{ mt: "100px" }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ padding: '10px' }}>
                        <div className='leadContainer'>
                            <Accordion defaultExpanded style={{ width: '98%' }}>
                                <AccordionSummary
                                    expandIcon={<FaArrowDown />}
                                >
                                    <div className='typography'>
                                        <Typography style={{ marginBottom: '15px', fontWeight: 'bold', color: '#1A3353' }}>Opportunity Information</Typography>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{ width: '98%', color: '#1A3353', mb: 1 }}>
                                        <div className='fieldContainer'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Name</div>
                                                <TextField
                                                    name='account_name'
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    helperText={errors?.name?.[0] ? errors?.name[0] : ''}
                                                    error={!!errors?.name?.[0]}
                                                />
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Amount</div>
                                                <TextField
                                                    type={'number'}
                                                    name='amount'
                                                    value={formData.amount}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    helperText={errors?.amount?.[0] ? errors?.amount[0] : ''}
                                                    error={!!errors?.amount?.[0]}
                                                />
                                            </div>
                                        </div>
                                        <div className='fieldContainer2'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Account</div>
                                                <TextField
                                                    name='account'
                                                    value={formData.account}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    helperText={errors?.account?.[0] ? errors?.account[0] : ''}
                                                    error={!!errors?.account?.[0]}
                                                />
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Currency</div>
                                                <TextField
                                                    name='currency'
                                                    value={formData.currency}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    helperText={errors?.currency?.[0] ? errors?.currency[0] : ''}
                                                    error={!!errors?.currency?.[0]}
                                                />
                                            </div>
                                        </div>
                                        <div className='fieldContainer2'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Stage</div>
                                                <TextField
                                                    name='stage'
                                                    value={formData.stage}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    helperText={errors?.stage?.[0] ? errors?.stage[0] : ''}
                                                    error={!!errors?.stage?.[0]}
                                                />
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Contact Name</div>
                                                <FormControl error={!!errors?.contacts?.[0]} sx={{ width: '70%' }}>
                                                    <Autocomplete
                                                        // ref={autocompleteRef}
                                                        multiple
                                                        value={selectedContacts}
                                                        limitTags={2}
                                                        options={state.contacts}
                                                        // options={state.contacts ? state.contacts.map((option: any) => option) : ['']}
                                                        getOptionLabel={(option: any) => option?.first_name}
                                                        // value={formData.contacts}
                                                        // onChange={handleChange}
                                                        onChange={(e: any, value: any) => handleChange2('contacts', value)}
                                                        // style={{ width: '80%' }}
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
                                                                    label={option?.first_name}
                                                                    {...getTagProps({ index })}
                                                                />
                                                            ))
                                                        }
                                                        popupIcon=<IconButton
                                                            sx={{
                                                                width: '45px', height: '40px',
                                                                borderRadius: '0px',
                                                                backgroundColor: '#d3d3d34a'
                                                            }}><FaPlus style={{ width: '15px' }} /></IconButton>
                                                        renderInput={(params) => (
                                                            <TextField {...params}
                                                                placeholder='Add Contacts'
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    sx: {
                                                                        '& .MuiAutocomplete-endAdornment': {
                                                                            mt: '-9px',
                                                                            mr: '-8px'
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
                                                <div className='fieldTitle'>Lead Source</div>
                                                <CustomSelectField
                                                    name='lead_source'
                                                    select
                                                    value={formData.lead_source}
                                                    InputProps={{
                                                        style: {
                                                            height: '40px',
                                                            maxHeight: '40px'
                                                        }
                                                    }}
                                                    onChange={handleChange}
                                                    sx={{ width: '70%' }}
                                                    helperText={errors?.lead_source?.[0] ? errors?.lead_source[0] : ''}
                                                    error={!!errors?.lead_source?.[0]}
                                                >
                                                    {state?.source?.length && state?.source.map((option: any) => (
                                                        <MenuItem key={option[0]} value={option[0]}>
                                                            {option[1]}
                                                        </MenuItem>
                                                    ))}
                                                </CustomSelectField>
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Probability</div>
                                                <TextField
                                                    type={'number'}
                                                    name='probability'
                                                    value={formData.probability}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    helperText={errors?.probability?.[0] ? errors?.probability[0] : ''}
                                                    error={!!errors?.probability?.[0]}
                                                />
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
                                                        options={state.users}
                                                        // options={state.contacts ? state.contacts.map((option: any) => option) : ['']}
                                                        getOptionLabel={(option: any) => option?.user__email}
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
                                                                    label={option?.user__email}
                                                                    {...getTagProps({ index })}
                                                                />
                                                            ))
                                                        }
                                                        popupIcon=<IconButton
                                                            sx={{
                                                                width: '45px', height: '40px',
                                                                borderRadius: '0px',
                                                                backgroundColor: '#d3d3d34a'
                                                            }}><FaPlus style={{ width: '15px' }} /></IconButton>
                                                        renderInput={(params) => (
                                                            <TextField {...params}
                                                                placeholder='Add Users'
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    sx: {
                                                                        '& .MuiAutocomplete-endAdornment': {
                                                                            mt: '-9px',
                                                                            mr: '-8px'
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
                                                <div className='fieldTitle'>Due Date</div>
                                                <TextField
                                                    type={'date'}
                                                    name='due_date'
                                                    value={formData.due_date}
                                                    onChange={handleChange}
                                                    style={{ width: '70%' }}
                                                    size='small'
                                                    helperText={errors?.due_date?.[0] ? errors?.due_date[0] : ''}
                                                    error={!!errors?.due_date?.[0]}
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
                                                        options={state.tags || []}
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
                                                        popupIcon={<IconButton
                                                            disableFocusRipple
                                                            disableTouchRipple
                                                            sx={{
                                                                width: '45px', height: '40px',
                                                                borderRadius: '0px',
                                                                backgroundColor: '#d3d3d34a'
                                                            }}><FaPlus style={{ width: '15px' }} /></IconButton>}
                                                        renderInput={(params) => (
                                                            <TextField {...params}
                                                                placeholder='Add Tags'
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    sx: {
                                                                        '& .MuiAutocomplete-endAdornment': {
                                                                            mt: '-9px',
                                                                            mr: '-8px'
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
                                                <div className='fieldTitle'>Lead Attachment</div>
                                                <TextField
                                                    name='opportunity_attachment'
                                                    // value={formData.opportunity_attachment``}
                                                    value={formData.opportunity_attachment}
                                                    // value={formData.opportunity_attachment`` !== null ? <Avatar src={formData.opportunity_attachment``} /> : null}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position='end'>
                                                                <IconButton disableFocusRipple
                                                                    disableTouchRipple
                                                                    sx={{ width: '45px', height: '40px', backgroundColor: '#d3d3d34a', borderRadius: '0px', mr: '-12px' }}
                                                                >
                                                                    <label htmlFor='icon-button-file'>
                                                                        <input
                                                                            hidden
                                                                            accept='image/*'
                                                                            id='icon-button-file'
                                                                            type='file'
                                                                            name='opportunity_attachment'
                                                                            onChange={(e: any) => { handleChange(e); handleFileChange(e) }}
                                                                        />
                                                                        <FaFileUpload color='primary' />
                                                                    </label>
                                                                </IconButton>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                    sx={{ width: '70%' }}
                                                    size='small'
                                                    helperText={errors?.opportunity_attachment?.[0] ? errors?.opportunity_attachment[0] : ''}
                                                    error={!!errors?.opportunity_attachment?.[0]}
                                                />
                                            </div>
                                        </div>
                                        <div className='fieldContainer2'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle' style={{width:'35%'}}>Teams</div>
                                                <FormControl error={!!errors?.teams?.[0]} sx={{ width: '85%' }}>
                                                    <Autocomplete
                                                        // ref={autocompleteRef}
                                                        value={selectedTeams}
                                                        multiple
                                                        limitTags={5}
                                                        options={state.teams || []}
                                                        // options={state.contacts ? state.contacts.map((option: any) => option) : ['']}
                                                        getOptionLabel={(option: any) => option}
                                                        onChange={(e: any, value: any) => handleChange2('teams', value)}
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
                                                        popupIcon={<IconButton
                                                            disableFocusRipple
                                                            disableTouchRipple
                                                            sx={{
                                                                width: '45px', height: '40px',
                                                                borderRadius: '0px',
                                                                backgroundColor: '#d3d3d34a'
                                                            }}><FaPlus style={{ width: '15px' }} /></IconButton>}
                                                        renderInput={(params) => (
                                                            <TextField {...params}
                                                                placeholder='Add Teams'
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    sx: {
                                                                        '& .MuiAutocomplete-endAdornment': {
                                                                            mt: '-9px',
                                                                            mr: '-8px'
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                    <FormHelperText>{errors?.teams?.[0] || ''}</FormHelperText>
                                                </FormControl>
                                            </div>
                                            <div className='fieldSubContainer'>
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
                        {/* Description details  */}
                        <div className='leadContainer'>
                            <Accordion defaultExpanded style={{ width: '98%' }}>
                                <AccordionSummary
                                    expandIcon={<FaArrowDown />}
                                >
                                    <div className='typography'>
                                        <Typography style={{ marginBottom: '15px', fontWeight: 'bold' }}>Description</Typography>
                                    </div>
                                </AccordionSummary>
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
                                                    style={{ width: '80%', padding: '5px' }}
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
