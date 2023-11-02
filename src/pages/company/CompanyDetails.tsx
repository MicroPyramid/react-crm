
import React, { useEffect, useState } from 'react'
import {
    Card,
    Box
} from '@mui/material'
import { CustomAppBar } from '../../components/CustomAppBar'
import { useLocation, useNavigate } from 'react-router-dom'
import { CompanyUrl, ContactUrl, Header } from '../../services/ApiUrls'
import { fetchData } from '../../components/FetchData'

type response = {
    name: string;

};

export default function CompanyDetails() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const [companyDetails, setCompanyDetails] = useState<response | null>(null)

    useEffect(() => {
        getCompanyDetail(state?.companyId?.id)
    }, [state?.companyId?.id])

    const getCompanyDetail = (id: any) => {
        fetchData(`${CompanyUrl}/${id}`, 'GET', null as any, Header)
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
                <Box sx={{ mt: '120px', p: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Box sx={{ width: '100%' }}>
                        <Card sx={{ borderRadius: '7px' }}>
                            <div style={{ padding: '20px', borderBottom: '1px solid lightgray', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontWeight: 600, fontSize: '18px', color: '#1a3353f0' }}>
                                    Company Information
                                </div>
                            </div>
                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Name</div>
                                    <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
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