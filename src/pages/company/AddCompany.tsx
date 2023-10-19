import React, { useState } from 'react'
import {
    TextField,
    AccordionDetails,
    Accordion,
    AccordionSummary,
    Typography,
    Box
} from '@mui/material'
import { FaArrowDown } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { CompaniesUrl, CompanyUrl, ContactUrl } from '../../services/ApiUrls';
import { CustomAppBar } from '../../components/CustomAppBar';
import { fetchData } from '../../components/FetchData';
import { AntSwitch, CustomSelectField, RequiredTextField } from '../../styles/CssStyled';
import '../../styles/style.css'

type FormErrors = {
    name?: string[];
};

function AddCompany() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const [error, setError] = useState(false)
    const [formData, setFormData] = useState({
        name: ''
    })
    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        submitForm();
    };

    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Token'),
        org: localStorage.getItem('org')
    }
    const submitForm = () => {
        // console.log('Form data:', data);
        const data = { name: formData.name }
        fetchData(`${CompaniesUrl}`, 'POST', JSON.stringify(data), headers)
            .then((res: any) => {
                // console.log('Form data:', res);
                if (!res.error) {
                    resetForm()
                    navigate('/app/companies')
                }
                if (res.error) {
                    // console.log(res);
                    setError(true)
                    //   setErrors(res?.errors?.contact_errors)
                }
            })
            .catch(() => {
            })
    };

    const resetForm = () => {
        setFormData({ name: '' });
        setErrors({});
    }
    const backbtnHandle = () => {
        navigate('/app/companies')
    }
    const module = 'Companies'
    const crntPage = 'Add Company'
    const backBtn = 'Back To Companies'

    const onCancel = () => {
        resetForm()
    }
    // console.log(errors, 'err')
    return (
        <Box sx={{ mt: '60px' }}>
            <CustomAppBar backbtnHandle={backbtnHandle} module={module} backBtn={backBtn} crntPage={crntPage} onCancel={onCancel} onSubmit={handleSubmit} />
            <Box sx={{ mt: "100px" }}>
                <form onSubmit={handleSubmit}>
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

export default AddCompany