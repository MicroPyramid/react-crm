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
import { AccountsUrl, CasesUrl } from '../../services/ApiUrls'
import { Tags } from '../../components/Tags'
import { CustomAppBar } from '../../components/CustomAppBar'
import { FaPlus, FaStar } from 'react-icons/fa'
import FormateTime from '../../components/FormateTime'
import { Label } from '../../components/Label'

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

    case_type: string;
    contacts: [];
    closed_on: string;
    priority: string;
    account: {
        name: string;
    };
    close_date: string;
    organization: string;
    created_from_site: boolean;
    id: string;
    teams: [];
    case_attachment: string;
    leads: string;

};
export const CaseDetails = (props: any) => {
    const { state } = useLocation()
    const navigate = useNavigate()

    const [caseDetails, setCaseDetails] = useState<response | null>(null)
    const [usersDetails, setUsersDetails] = useState<Array<{
        user_details: {
            email: string;
            id: string;
            profile_pic: string;
        }
    }>>([]);
    const [attachments, setAttachments] = useState([])
    const [tags, setTags] = useState([])
    const [countries, setCountries] = useState<string[][]>([])
    const [contacts, setContacts] = useState([])
    const [teams, setTeams] = useState([])
    const [comments, setComments] = useState([])
    const [commentList, setCommentList] = useState('Recent Last')
    const [note, setNote] = useState('')
    const [usersMention, setUsersMention] = useState([])

    useEffect(() => {
        getCaseDetails(state?.caseId)
    }, [state?.caseId])

    const getCaseDetails = (id: any) => {
        const Header = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('Token'),
            org: localStorage.getItem('org')
          }
        fetchData(`${CasesUrl}/${id}/`, 'GET', null as any, Header)
            .then((res) => {
                // console.log(res, 'case');
                if (!res.error) {
                    setCaseDetails(res?.cases_obj)
                    setContacts(res?.contacts)
                    setAttachments(res?.attachments)
                    setComments(res?.comments)
                    setUsersMention(res?.users_mention)
                }
            })
            .catch((err) => {
                // console.error('Error:', err)
                < Snackbar open={err} autoHideDuration={4000} onClose={() => navigate('/app/cases')} >
                    <Alert onClose={() => navigate('/app/cases')} severity="error" sx={{ width: '100%' }}>
                        Failed to load!
                    </Alert>
                </Snackbar >
            })
    }
    // const accountCountry = (country: string) => {
    //     let countryName: string[] | undefined;
    //     for (countryName of countries) {
    //         if (Array.isArray(countryName) && countryName.includes(country)) {
    //             const ele = countryName;
    //             break;
    //         }
    //     }
    //     return countryName?.[1]
    // }
    const editHandle = () => {
        // let country: string[] | undefined;
        // for (country of countries) {
        //     if (Array.isArray(country) && country.includes(caseDetails?.country || '')) {
        //         const firstElement = country[0];
        //         break;
        //     }
        // }
        navigate('/app/cases/edit-case', {
            state: {
                value: {
                    name: caseDetails?.name,
                    status: caseDetails?.status,
                    priority: caseDetails?.priority,
                    case_type: caseDetails?.case_type,
                    closed_on: caseDetails?.closed_on,
                    teams: caseDetails?.teams,
                    assigned_to: caseDetails?.assigned_to,
                    account: caseDetails?.account,
                    case_attachment: caseDetails?.case_attachment,
                    contacts: caseDetails?.contacts,
                    description: caseDetails?.description,
                    // file: caseDetails?.name
                }, id: state?.caseId,
                contacts: state?.contacts || [], priority: state?.priority || [], typeOfCases: state?.typeOfCases || [], account: state?.account || [], status: state?.status || []
            }
        }
        )
    }

    const backbtnHandle = () => {
        navigate('/app/cases')
    }

    const module = 'Cases'
    const crntPage = 'Case Details'
    const backBtn = 'Back to Cases'
    // console.log(state,'detail');

    return (
        <Box sx={{ mt: '60px' }}>
            <div>
                <CustomAppBar backbtnHandle={backbtnHandle} module={module} backBtn={backBtn} crntPage={crntPage} editHandle={editHandle} />
                <Box sx={{ mt: '110px', p: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Box sx={{ width: '65%' }}>
                        <Box sx={{ borderRadius: '10px', border: '1px solid #80808038', backgroundColor: 'white' }}>
                            <div style={{ padding: '20px', borderBottom: '1px solid lightgray', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontWeight: 600, fontSize: '18px', color: '#1a3353f0' }}>
                                    Cases Information
                                </div>
                                <div style={{ color: 'gray', fontSize: '16px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: '15px' }}>
                                        created &nbsp;
                                        {FormateTime(caseDetails?.created_at)} &nbsp; by   &nbsp;
                                        <Avatar
                                            src={caseDetails?.created_by?.profile_pic}
                                            alt={caseDetails?.created_by?.email}
                                        />
                                        &nbsp;&nbsp;
                                        {caseDetails?.created_by?.email}
                                    </div>

                                </div>
                            </div>
                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                                <div className='title2'>
                                    {caseDetails?.name}
                                    <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 1 }}>
                                        {/* {usersDetails?.length ? usersDetails.map((val: any, i: any) =>
                                            <Avatar
                                                key={i}
                                                alt={val?.user_details?.email}
                                                src={val?.user_details?.profile_pic}
                                                sx={{ mr: 1 }}
                                            />
                                        ) : ''
                                        } */}
                                    </Stack>
                                </div>
                                <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    {caseDetails?.tags?.length ? caseDetails?.tags.map((tagData: any) => (
                                        <Label
                                            tags={tagData}
                                        />)) : ''}
                                </Stack>
                            </div>
                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ width: '32%' }}>
                                    <div className='title2'>Name</div>
                                    <div className='title3'>
                                        {caseDetails?.name || '---'}
                                    </div>
                                </div>
                                <div style={{ width: '32%' }}>
                                    <div className='title2'>Status</div>
                                    <div className='title3'>
                                        {caseDetails?.status}
                                    </div>
                                </div>
                                <div style={{ width: '32%' }}>
                                    <div className='title2'>Account</div>
                                    <div className='title3'>
                                        {caseDetails?.account?.name || '---'}
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: '20px', marginTop: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ width: '32%' }}>
                                    <div className='title2'>Priority</div>
                                    <div className='title3'>
                                        {caseDetails?.priority || '---'}
                                    </div>
                                </div>
                                <div style={{ width: '32%' }}>
                                    <div className='title2'>Assigned Users</div>
                                    <div className='title3'>
                                        {caseDetails?.assigned_to?.length ? caseDetails?.assigned_to.map((val: any) => val) : '----'}
                                        {/* {caseDetails?.assigned_to || '---'} */}
                                    </div>
                                </div>
                                <div style={{ width: '32%' }}>
                                    <div className='title2'>Team</div>
                                    <div className='title3'>
                                        {caseDetails?.teams?.length ? caseDetails?.teams.map((team: any) =>
                                            <Chip label={team} sx={{ height: '20px', borderRadius: '4px' }} />
                                        ) : '----'}

                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: '20px', marginTop: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ width: '32%' }}>
                                    <div className='title2'>Type of Case</div>
                                    <div className='title3'>
                                        {caseDetails?.case_type || '----'}
                                    </div>
                                </div>
                                <div style={{ width: '32%' }}>
                                    <div className='title2'>Users</div>
                                    <div className='title3'>
                                        {usersMention?.length ? usersMention.map((val: any) => <div style={{ display: 'flex', flexDirection: 'column' }}> {val.user__email}</div>) : '----'}
                                    </div>
                                </div>
                                <div style={{ width: '32%' }}>
                                    <div className='title2'>Contacts</div>
                                    <div className='title3'>
                                        {caseDetails?.contacts?.length ? caseDetails?.contacts.map((val: any) => <div>
                                            <div>{val.mobile_number}</div>
                                            <div>{val.secondary_number}</div>
                                        </div>) : '----'}
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: '20px', marginTop: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ width: '32%' }}>
                                    <div className='title2'>Closed Date</div>
                                    <div className='title3'>
                                        {caseDetails?.closed_on || '----'}
                                    </div>
                                </div>
                            </div>
                            {/* </div> */}
                            {/* Address details */}
                            {/* Description */}
                            <div style={{ marginTop: '2%' }}>
                                <div style={{ padding: '20px', borderBottom: '1px solid lightgray', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div style={{ fontWeight: 600, fontSize: '18px', color: '#1a3353f0' }}>
                                        Description
                                    </div>
                                </div>
                                <Box sx={{ p: '15px' }}>
                                    {caseDetails?.description ? <div dangerouslySetInnerHTML={{ __html: caseDetails?.description }} /> : '---'}
                                </Box>
                            </div>

                        </Box>
                    </Box>
                    <Box sx={{ width: '34%' }}>
                        <Box sx={{ borderRadius: '10px', border: '1px solid #80808038', backgroundColor: 'white' }}>
                            <div style={{ padding: '20px', borderBottom: '1px solid lightgray', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontWeight: 600, fontSize: '18px', color: '#1a3353f0' }}>
                                    Attachments
                                </div>
                                {/* <div style={{ color: "#3E79F7", fontSize: "16px", fontWeight: "bold" }}> */}
                                {/* Add Social #1E90FF */}
                                <Button
                                    type='submit'
                                    variant='text'
                                    size='small'
                                    startIcon={<FaPlus style={{ fill: '#3E79F7', width: '12px' }} />}
                                    style={{ textTransform: 'capitalize', fontWeight: 600, fontSize: '16px' }}
                                >
                                    Add Attachments
                                </Button>
                                {/* </div> */}
                            </div>

                            <div style={{ padding: '10px 10px 10px 10px', marginTop: '5%' }}>
                                {/* {caseDetails?.account_attachment?.length ? caseDetails?.account_attachment.map((pic: any, i: any) => */}
                                {attachments?.length ? attachments.map((pic: any, i: any) =>
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
