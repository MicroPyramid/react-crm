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
    Select,
    Button
} from '@mui/material'
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { OpportunityUrl } from '../../services/ApiUrls'
import { fetchData, Header } from '../../components/FetchData'
import { CustomAppBar } from '../../components/CustomAppBar'
import { FaCheckCircle, FaPlus, FaTimes, FaTimesCircle, FaUpload } from 'react-icons/fa'
import { CustomPopupIcon, RequiredSelect, RequiredTextField } from '../../styles/CssStyled'
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown'
import { FiChevronUp } from '@react-icons/all-files/fi/FiChevronUp'
import '../../styles/style.css'


type FormErrors = {
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
    contact_name?: string[],
    contacts?: string[],
    due_date?: string[],
    tags?: string[],
    opportunity_attachment?: string[],
    file?: string[]
};

interface FormData {

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
    contact_name: string,
    contacts: string[],
    due_date: string,
    tags: string[],
    opportunity_attachment: string | null,
    file: string | null
}

export function AddOpportunity() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const { quill, quillRef } = useQuill();
    const initialContentRef = useRef(null);

    const autocompleteRef = useRef<any>(null);
    const [error, setError] = useState(false)
    const [selectedContacts, setSelectedContacts] = useState<any[]>([]);
    const [selectedAssignTo, setSelectedAssignTo] = useState<any[]>([]);
    const [selectedTags, setSelectedTags] = useState<any[]>([]);
    const [selectedTeams, setSelectedTeams] = useState<any[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<any[]>([]);
    const [leadSelectOpen, setLeadSelectOpen] = useState(false)
    const [currencySelectOpen, setCurrencySelectOpen] = useState(false)
    const [stageSelectOpen, setStageSelectOpen] = useState(false)
    const [contactSelectOpen, setContactSelectOpen] = useState(false)
    const [accountSelectOpen, setAccountSelectOpen] = useState(false)

    const [errors, setErrors] = useState<FormErrors>({});
    const [formData, setFormData] = useState<FormData>({
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
        contact_name: '',
        contacts: [],
        due_date: '',
        tags: [],
        opportunity_attachment: null,
        file: null
    })

    useEffect(() => {
        if (quill) {
            // Save the initial state (HTML content) of the Quill editor
            initialContentRef.current = quillRef.current.firstChild.innerHTML;
        }
    }, [quill]);

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
    const handleFileChange = (event: any) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                opportunity_attachment: file.name,
                file: prevData.file,
            }));

            const reader = new FileReader();
            reader.onload = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    file: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const resetQuillToInitialState = () => {
        // Reset the Quill editor to its initial state
        setFormData({ ...formData, description: '' })
        if (quill && initialContentRef.current !== null) {
            quill.clipboard.dangerouslyPasteHTML(initialContentRef.current);
        }
    };


    const handleSubmit = (e: any) => {
        e.preventDefault();
        submitForm();
    }
    const submitForm = () => {
        // console.log('Form data:', formData.lead_attachment,'sfs', formData.file);
        const data = {

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
            // contacts: formData.contacts,
            contact_name: formData.contacts,
            due_date: formData.due_date,
            tags: formData.tags,
            opportunity_attachment: formData.file
        }

        fetchData(`${OpportunityUrl}/`, 'POST', JSON.stringify(data), Header)
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
            contact_name: '',
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
    const backbtnHandle = () => {
        navigate('/app/opportunities')
    }

    const module = 'Opportunities'
    const crntPage = 'Add Opportunity'
    const backBtn = 'Back To Opportunities'


    console.log(state, 'leadsform')
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
                                    <Box sx={{ width: '98%', color: '#1A3353', mb: 1 }}>
                                        <div className='fieldContainer'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Name</div>
                                                <RequiredTextField
                                                    name='name'
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
                                                <FormControl sx={{ width: '70%' }}>
                                                    <Select
                                                        name='account'
                                                        value={formData.account}
                                                        open={accountSelectOpen}
                                                        onClick={() => setAccountSelectOpen(!accountSelectOpen)}
                                                        IconComponent={() => (
                                                            <div onClick={() => setAccountSelectOpen(!accountSelectOpen)} className="select-icon-background">
                                                                {accountSelectOpen ? <FiChevronUp className='select-icon' /> : <FiChevronDown className='select-icon' />}
                                                            </div>
                                                        )}
                                                        className={'select'}
                                                        onChange={handleChange}
                                                        error={!!errors?.account?.[0]}
                                                    >
                                                        {state?.account?.length && state?.account.map((option: any) => (
                                                            <MenuItem key={option?.id} value={option?.id}>
                                                                {option?.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    <FormHelperText className='helperText'>{errors?.currency?.[0] ? errors?.currency[0] : ''}</FormHelperText>
                                                </FormControl>
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Currency</div>
                                                <FormControl sx={{ width: '70%' }}>
                                                    <Select
                                                        name='currency'
                                                        value={formData.currency}
                                                        open={currencySelectOpen}
                                                        onClick={() => setCurrencySelectOpen(!currencySelectOpen)}
                                                        IconComponent={() => (
                                                            <div onClick={() => setCurrencySelectOpen(!currencySelectOpen)} className="select-icon-background">
                                                                {currencySelectOpen ? <FiChevronUp className='select-icon' /> : <FiChevronDown className='select-icon' />}
                                                            </div>
                                                        )}
                                                        className={'select'}
                                                        onChange={handleChange}
                                                        error={!!errors?.currency?.[0]}
                                                    >
                                                        {state?.currency?.length && state?.currency.map((option: any) => (
                                                            <MenuItem key={option[0]} value={option[0]}>
                                                                {option[1]}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    <FormHelperText className='helperText'>{errors?.currency?.[0] ? errors?.currency[0] : ''}</FormHelperText>
                                                </FormControl>
                                            </div>
                                        </div>
                                        <div className='fieldContainer2'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Stage</div>
                                                <FormControl sx={{ width: '70%' }}>
                                                    <RequiredSelect
                                                        name='stage'
                                                        value={formData.stage}
                                                        open={stageSelectOpen}
                                                        onClick={() => setStageSelectOpen(!stageSelectOpen)}
                                                        IconComponent={() => (
                                                            <div onClick={() => setStageSelectOpen(!stageSelectOpen)} className="select-icon-background">
                                                                {stageSelectOpen ? <FiChevronUp className='select-icon' /> : <FiChevronDown className='select-icon' />}
                                                            </div>
                                                        )}
                                                        className={'select'}
                                                        onChange={handleChange}
                                                        error={!!errors?.stage?.[0]}
                                                    >
                                                        {state?.stage?.length && state?.stage.map((option: any) => (
                                                            <MenuItem key={option[0]} value={option[0]}>
                                                                {option[1]}
                                                            </MenuItem>
                                                        ))}
                                                    </RequiredSelect>
                                                    <FormHelperText className='helperText'>{errors?.stage?.[0] ? errors?.stage[0] : ''}</FormHelperText>
                                                </FormControl>
                                            </div>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Contact Name</div>
                                                <FormControl sx={{ width: '70%' }}>
                                                    <RequiredSelect
                                                        name='contact_name'
                                                        value={formData.contact_name}
                                                        open={contactSelectOpen}
                                                        onClick={() => setContactSelectOpen(!contactSelectOpen)}
                                                        IconComponent={() => (
                                                            <div onClick={() => setContactSelectOpen(!contactSelectOpen)} className="select-icon-background">
                                                                {contactSelectOpen ? <FiChevronUp className='select-icon' /> : <FiChevronDown className='select-icon' />}
                                                            </div>
                                                        )}
                                                        className='select'
                                                        onChange={handleChange}
                                                        error={!!errors?.contact_name?.[0]}
                                                    >
                                                        {state?.contacts?.length && state?.contacts.map((option: any) => (
                                                            <MenuItem key={option?.id} value={option?.first_name}>
                                                                {option?.first_name}
                                                            </MenuItem>
                                                        ))}
                                                    </RequiredSelect>
                                                    <FormHelperText className='helperText'>{errors?.contact_name?.[0] ? errors?.contact_name[0] : ''}</FormHelperText>
                                                </FormControl>
                                            </div>
                                        </div>
                                        <div className='fieldContainer2'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle'>Lead Source</div>
                                                <FormControl sx={{ width: '70%' }}>
                                                    <Select
                                                        name='lead_source'
                                                        value={formData.lead_source}
                                                        open={leadSelectOpen}
                                                        onClick={() => setLeadSelectOpen(!leadSelectOpen)}
                                                        IconComponent={() => (
                                                            <div onClick={() => setLeadSelectOpen(!leadSelectOpen)} className="select-icon-background">
                                                                {leadSelectOpen ? <FiChevronUp className='select-icon' /> : <FiChevronDown className='select-icon' />}
                                                            </div>
                                                        )}
                                                        className={'select'}
                                                        onChange={handleChange}
                                                        error={!!errors?.lead_source?.[0]}
                                                    >
                                                        {state?.leadSource?.length && state?.leadSource.map((option: any) => (
                                                            <MenuItem key={option[0]} value={option[0]}>
                                                                {option[1]}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    <FormHelperText className='helperText'>{errors?.lead_source?.[0] ? errors?.lead_source[0] : ''}</FormHelperText>
                                                </FormControl>
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
                                                        multiple
                                                        value={selectedAssignTo}
                                                        limitTags={2}
                                                        options={state.users || []}
                                                        getOptionLabel={(option: any) => state.users ? option?.user__email : option}
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
                                                                    label={state.users ? option?.user__email : option}
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
                                                    sx={{
                                                        '& input[type="date"]::-webkit-calendar-picker-indicator': {
                                                            backgroundColor: 'whitesmoke',
                                                            padding: '13px',
                                                            marginRight: '-15px'
                                                        }
                                                    }}
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
                                                <div className='fieldTitle'>Lead Attachment</div>
                                                <TextField
                                                    name='opportunity_attachment'
                                                    value={formData.opportunity_attachment}
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
                                                                            name='opportunity_attachment'
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
                                                    helperText={errors?.opportunity_attachment?.[0] ? errors?.opportunity_attachment[0] : ''}
                                                    error={!!errors?.opportunity_attachment?.[0]}
                                                />
                                            </div>
                                        </div>
                                        <div className='fieldContainer2'>
                                            <div className='fieldSubContainer'>
                                                <div className='fieldTitle' style={{ width: '35%' }}>Teams</div>
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
                                                        popupIcon={<CustomPopupIcon><FaPlus className='input-plus-icon' /></CustomPopupIcon>}
                                                        renderInput={(params) => (
                                                            <TextField {...params}
                                                                placeholder='Add Teams'
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
                                                    <FormHelperText>{errors?.teams?.[0] || ''}</FormHelperText>
                                                </FormControl>
                                            </div>
                                            <div className='fieldSubContainer'>
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
                                    <Typography className='accordion-header'>Description</Typography>
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
                                            <div className='descriptionTitle'>Description</div>
                                            <div style={{ width: '100%', marginBottom: '3%' }}>
                                                <div ref={quillRef} />
                                            </div>
                                        </div>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', mt: 1.5 }}>
                                            <Button
                                                className='header-button'
                                                onClick={resetQuillToInitialState}
                                                size='small'
                                                variant='contained'
                                                startIcon={<FaTimesCircle style={{ fill: 'white', width: '16px', marginLeft: '2px' }} />}
                                                sx={{ backgroundColor: '#2b5075', ':hover': { backgroundColor: '#1e3750' } }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                className='header-button'
                                                onClick={() => setFormData({ ...formData, description: quillRef.current.firstChild.innerHTML })}
                                                variant='contained'
                                                size='small'
                                                startIcon={<FaCheckCircle style={{ fill: 'white', width: '16px', marginLeft: '2px' }} />}
                                                sx={{ ml: 1 }}
                                            >
                                                Save
                                            </Button>
                                        </Box>
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
