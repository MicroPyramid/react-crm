
import React, { useEffect, useState } from 'react'
import {
    Card,
    Box
} from '@mui/material'
import { CustomAppBar } from '../../components/CustomAppBar'
import { useLocation, useNavigate } from 'react-router-dom'
import { CompanyUrl, ContactUrl } from '../../services/ApiUrls'
import { fetchData } from '../../components/FetchData'

type response = {
    name: string;

};

export default function CompanyDetails() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const [companyDetails, setCompanyDetails] = useState<response | null>(null)

    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Token'),
        org: localStorage.getItem('org')
    }

    useEffect(() => {
        getCompanyDetail(state?.companyId?.id)
    }, [state?.companyId?.id])

    const getCompanyDetail = (id: any) => {
        fetchData(`${CompanyUrl}/${id}`, 'GET', null as any, headers)
            .then((res) => {
                console.log(res, 'res');
                if (!res.error) {
                    setCompanyDetails(res?.data)
                }
            })
    }

    const backbtnHandle = () => {
        navigate('/app/companies')
    }

    const editHandle = () => {
        navigate('/app/companies/edit-company', {
            state: { value: { name: companyDetails?.name }, id: state?.companyId?.id }
        })
    }

    const module = 'Companies'
    const crntPage = 'Company Detail'
    const backBtn = 'Back To Companies'
    // console.log(state, 'Companies');

    return (
        <Box sx={{ mt: '60px' }}>
            <div>
                <CustomAppBar backbtnHandle={backbtnHandle} module={module} backBtn={backBtn} crntPage={crntPage} editHandle={editHandle} />
                <Box sx={{ mt: '100px', p: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Box sx={{ width: '100%' }}>
                        <Card sx={{ borderRadius: '7px' }}>
                            <div style={{ padding: '20px', borderBottom: '1px solid lightgray', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'rgb(26, 51, 83)' }}>
                                    Company Information
                                </div>
                            </div>
                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Name</div>
                                    <div style={{ fontSize: '14px', color: 'gray', marginTop: '5%' }}>
                                        {companyDetails?.name || '---'}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Box>
                </Box>
            </div>
        </Box>
    )
}