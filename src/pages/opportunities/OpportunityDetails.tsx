import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    Card,
    Link,
    Avatar,
    Box,
    Snackbar,
    Alert,
    Stack,
    Button,
    Chip
} from '@mui/material'
import { fetchData } from '../../components/FetchData'
import { Header, OpportunityUrl } from '../../services/ApiUrls'
import { Tags } from '../../components/Tags'
import { CustomAppBar } from '../../components/CustomAppBar'
import { FaPlus, FaStar } from 'react-icons/fa'
import FormateTime from '../../components/FormateTime'
import { Label } from '../../components/Label'

export const formatDate = (dateString: any) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
}
type response = {
    created_by: {
        email: string;
        id: string;
        profile_pic: string;
    };
    user_details: {
        email: string;
        id: string;
        profile_pic: string;
    };
    org: { name: string };
    lead: { account_name: string };
    account_attachment: [];
    assigned_to: [];
    billing_address_line: string;
    billing_city: string;
    billing_country: string;
    billing_state: string;
    billing_postcode: string;
    billing_street: string;
    contact_name: string;
    name: string;

    created_at: string;
    created_on: string;
    created_on_arrow: string;
    date_of_birth: string;
    title: string;
    first_name: string;
    last_name: string;
    account_name: string;
    phone: string;
    email: string;
    lead_attachment: string;
    opportunity_amount: string;
    website: string;
    description: string;
    contacts: string;
    status: string;
    source: string;
    address_line: string;
    street: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    tags: [];
    company: string;
    probability: string;
    industry: string;
    skype_ID: string;
    file: string;

    close_date: string;
    organization: string;
    created_from_site: boolean;
    id: string;
    teams: [];
    leads: string;

    lead_source: string;
    amount: string;
    currency: string;
    users: string;
    stage: string;
    closed_on: string;
    opportunity_attachment: [];
    account: { id: string; name: string };


};
export const OpportunityDetails = (props: any) => {
    const { state } = useLocation()
    const navigate = useNavigate()

    const [opportunityDetails, setOpportunityDetails] = useState<response | null>(null)
    const [usersDetails, setUsersDetails] = useState<Array<{
        user_details: {
            email: string;
            id: string;
            profile_pic: string;
        }
    }>>([]);
    const [selectedCountry, setSelectedCountry] = useState([])
    const [attachments, setAttachments] = useState([])
    const [tags, setTags] = useState([])
    const [countries, setCountries] = useState<string[][]>([])
    const [source, setSource] = useState([])
    const [status, setStatus] = useState([])
    const [industries, setIndustries] = useState([])
    const [contacts, setContacts] = useState([])
    const [users, setUsers] = useState([])
    const [teams, setTeams] = useState([])
    const [leads, setLeads] = useState([])
    const [comments, setComments] = useState([])
    const [commentList, setCommentList] = useState('Recent Last')
    const [note, setNote] = useState('')

    useEffect(() => {
        getOpportunityDetails(state.opportunityId)
    }, [state.opportunityId])

    const getOpportunityDetails = (id: any) => {
        fetchData(`${OpportunityUrl}/${id}/`, 'GET', null as any, Header)
            .then((res) => {
                console.log(res, 'edd');
                if (!res.error) {
                    setOpportunityDetails(res?.opportunity_obj)
                    setUsers(res?.users)
                    // setContacts(res?.contacts)
                    // setIndustries(res?.industries)
                    // setUsers(res?.users)
                    // setStatus(res?.status)
                    // setCountries(res?.countries)
                    // setLeads(res?.leads)
                    // setTags(res?.tags)
                    // setTeams(res?.teams)
                    // setAttachments(res?.attachments)
                    // setTags(res?.tags)
                    // setCountries(res?.countries)
                    // setIndustries(res?.industries)
                    // setStatus(res?.status)
                    // setSource(res?.source)
                    // setUsers(res?.users)
                    // setContacts(res?.contacts)
                    // setTeams(res?.teams)
                    // setComments(res?.comments)
                }
            })
            .catch((err) => {
                // console.error('Error:', err)
                < Snackbar open={err} autoHideDuration={4000} onClose={() => navigate('/app/opportunities')} >
                    <Alert onClose={() => navigate('/app/opportunities')} severity="error" sx={{ width: '100%' }}>
                        Failed to load!
                    </Alert>
                </Snackbar >
            })
    }
    const accountCountry = (country: string) => {
        let countryName: string[] | undefined;
        for (countryName of countries) {
            if (Array.isArray(countryName) && countryName.includes(country)) {
                const ele = countryName;
                break;
            }
        }
        return countryName?.[1]
    }
    const editHandle = () => {
        // navigate('/contacts/edit-contacts', { state: { value: contactDetails, address: newAddress } })
        let country: string[] | undefined;
        for (country of countries) {
            if (Array.isArray(country) && country.includes(opportunityDetails?.country || '')) {
                const firstElement = country[0];
                break;
            }
        }
        navigate('/app/opportunities/edit-opportunity', {
            state: {
                value: {
                    name: opportunityDetails?.name,
                    account: opportunityDetails?.account?.id,
                    amount: opportunityDetails?.amount,
                    currency: opportunityDetails?.currency,
                    stage: opportunityDetails?.stage,
                    teams: opportunityDetails?.teams,
                    lead_source: opportunityDetails?.lead_source,
                    probability: opportunityDetails?.probability,
                    description: opportunityDetails?.description,
                    assigned_to: opportunityDetails?.assigned_to,
                    contact_name: opportunityDetails?.contact_name,
                    due_date: opportunityDetails?.closed_on,
                    tags: opportunityDetails?.tags,
                    opportunity_attachment: opportunityDetails?.opportunity_attachment,
                }, id: state?.opportunityId,
                contacts: state?.contacts || [], leadSource: state?.leadSource || [], currency: state?.currency || [], tags: state?.tags || [], account: state?.account || [], stage: state?.stage || [], users: state?.users || [], teams: state?.teams || [], countries: state?.countries || []
            }
        }
        )
    }

    const backbtnHandle = () => {
        navigate('/app/opportunities')
    }

    const module = 'Opportunities'
    const crntPage = 'Opportunity Details'
    const backBtn = 'Back To Opportunities'
    console.log(state, 'oppdetail');

    return (
        <Box sx={{ mt: '60px' }}>
            <div>
                <CustomAppBar backbtnHandle={backbtnHandle} module={module} backBtn={backBtn} crntPage={crntPage} editHandle={editHandle} />
                <Box sx={{ mt: '110px', p: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Box sx={{ width: '65%' }}>
                        <Box sx={{ borderRadius: '10px', border: '1px solid #80808038', backgroundColor: 'white' }}>
                            <div style={{ padding: '20px', borderBottom: '1px solid lightgray', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontWeight: 600, fontSize: '18px', color: '#1a3353f0' }}>
                                    Opportunity Information
                                </div>
                                <div style={{ color: 'gray', fontSize: '16px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: '15px' }}>
                                        created &nbsp;
                                        {FormateTime(opportunityDetails?.created_at)} &nbsp; by   &nbsp;
                                        <Avatar
                                            src={opportunityDetails?.created_by?.profile_pic}
                                            alt={opportunityDetails?.created_by?.email}
                                        />
                                        &nbsp;
                                        &nbsp;
                                        {opportunityDetails?.created_by?.email}
                                        {/* {opportunityDetails?.first_name}&nbsp;
                                        {opportunityDetails?.last_name} */}
                                    </div>

                                </div>
                            </div>
                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                                <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>
                                    {opportunityDetails?.name}
                                    <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 1 }}>
                                        {/* {
                                            lead.assigned_to && lead.assigned_to.map((assignItem) => (
                                                assignItem.user_details.profile_pic
                                                    ? */}
                                        {users?.length ? users.map((val: any, i: any) =>
                                            <Avatar
                                                key={i}
                                                alt={val?.user_details?.email}
                                                src={val?.user_details?.profile_pic}
                                                sx={{ mr: 1 }}
                                            />
                                        ) : ''
                                        }
                                    </Stack>
                                </div>
                                <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    {opportunityDetails?.tags?.length ? opportunityDetails?.tags.map((tagData: any) => (
                                        <Label
                                            tags={tagData}
                                        />)) : ''}
                                </Stack>
                            </div>
                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Name</div>
                                    <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                        {opportunityDetails?.name || '----'}
                                    </div>
                                </div>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Lead Source</div>
                                    <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                        {opportunityDetails?.lead_source || '----'}
                                    </div>
                                </div>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Account</div>
                                    <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                        {opportunityDetails?.account?.name || '----'}
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: '20px', marginTop: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Probability</div>
                                    <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                        {/* {lead.pipeline ? lead.pipeline : '------'} */}
                                        {opportunityDetails?.probability || '----'}
                                    </div>
                                </div>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Amount</div>
                                    <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                        {opportunityDetails?.amount || '----'}
                                    </div>
                                </div>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Team</div>
                                    <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                        {opportunityDetails?.teams?.length ? opportunityDetails?.teams.map((team: any) =>
                                            <Chip label={team} sx={{ height: '20px', borderRadius: '4px' }} />
                                        ) : '----'}

                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: '20px', marginTop: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Currency</div>
                                    <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                        {opportunityDetails?.currency || '----'}
                                    </div>
                                </div>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Users</div>
                                    <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                        {opportunityDetails?.users || '----'}
                                    </div>
                                </div>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Contacts</div>
                                    <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                        {opportunityDetails?.contact_name || '----'}
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: '20px', marginTop: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Stage</div>
                                    <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                        {opportunityDetails?.stage || '----'}
                                    </div>
                                </div>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Assigned Users</div>
                                    <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                        {opportunityDetails?.assigned_to || '----'}
                                    </div>
                                </div>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Closed Date</div>
                                    <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                        {opportunityDetails?.closed_on || '----'}
                                    </div>
                                </div>
                            </div>
                            {/* </div> */}
                            {/* Description */}
                            <div style={{ marginTop: '2%' }}>
                                <div style={{ padding: '20px', borderBottom: '1px solid lightgray', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div style={{ fontWeight: 600, fontSize: '18px', color: '#1a3353f0' }}>
                                        Description
                                    </div>
                                </div>
                                <p style={{ fontSize: '16px', color: 'gray', padding: '20px' }}>
                                    {opportunityDetails?.description || '----'}
                                </p>
                            </div>

                        </Box>
                    </Box>
                    <Box sx={{ width: '34%' }}>
                        <Box sx={{ borderRadius: '10px', border: '1px solid #80808038', backgroundColor: 'white' }}>
                            <div style={{ padding: '20px', borderBottom: '1px solid lightgray', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontWeight: 600, fontSize: '18px', color: '#1a3353f0' }}>
                                    Attachments
                                </div>
                                <Button
                                    type='submit'
                                    variant='text'
                                    size='small'
                                    startIcon={<FaPlus style={{ fill: '#3E79F7', width: '12px' }} />}
                                    style={{ textTransform: 'capitalize', fontWeight: 600, fontSize: '16px' }}
                                >
                                    Add Attachments
                                </Button>
                            </div>

                            <div style={{ padding: '10px 10px 10px 15px', marginTop: '5%' }}>
                                {opportunityDetails?.opportunity_attachment?.length ? opportunityDetails?.opportunity_attachment.map((pic: any, i: any) =>
                                    <Box key={i} sx={{ width: '100px', height: '100px', border: '0.5px solid gray', borderRadius: '5px' }}>
                                        <img src={pic} alt={pic} />
                                    </Box>
                                ) : ''}
                            </div>
                        </Box>
                    </Box>
                </Box>
            </div>
        </Box>
    )
}
