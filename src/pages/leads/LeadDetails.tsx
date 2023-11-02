import React, { useEffect, useState } from 'react'
import {
    Card,
    Link,
    Button,
    Avatar,
    Divider,
    TextField,
    Box,
    MenuItem,
    Snackbar,
    Alert,
    Stack,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    IconButton
} from '@mui/material'
import { Fa500Px, FaAccusoft, FaAd, FaAddressCard, FaEllipsisV, FaPlus, FaRegAddressCard, FaStar } from 'react-icons/fa'
import { CustomAppBar } from '../../components/CustomAppBar'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Header, LeadUrl } from '../../services/ApiUrls'
import { fetchData } from '../../components/FetchData'
import { Label } from '../../components/Label'
import { AntSwitch, CustomSelectField, CustomSelectField1 } from '../../styles/CssStyled'
import FormateTime from '../../components/FormateTime'

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
    teams: string;
    assigned_to: string;
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
};
function LeadDetails(props: any) {
    const { state } = useLocation()
    const navigate = useNavigate();
    const [leadDetails, setLeadDetails] = useState<response | null>(null)
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
    const [source, setSource] = useState([])
    const [status, setStatus] = useState([])
    const [industries, setIndustries] = useState([])
    const [contacts, setContacts] = useState([])
    const [users, setUsers] = useState([])
    const [teams, setTeams] = useState([])
    const [comments, setComments] = useState([])
    const [commentList, setCommentList] = useState('Recent Last')
    const [note, setNote] = useState('')

    useEffect(() => {
        getLeadDetails(state.leadId)
    }, [state.leadId])


    const getLeadDetails = (id: any) => {
        fetchData(`${LeadUrl}/${id}/`, 'GET', null as any, Header)
            .then((res) => {
                if (!res.error) {
                    setLeadDetails(res?.lead_obj)
                    setUsers(res?.users)
                    setAttachments(res?.attachments)
                    setTags(res?.tags)
                    setCountries(res?.countries)
                    setIndustries(res?.industries)
                    setStatus(res?.status)
                    setSource(res?.source)
                    setUsers(res?.users)
                    setContacts(res?.contacts)
                    setTeams(res?.teams)
                    setComments(res?.comments)
                }
            })
            .catch((err) => {
                // console.error('Error:', err)
                < Snackbar open={err} autoHideDuration={4000} onClose={() => navigate('/app/leads')} >
                    <Alert onClose={() => navigate('/app/leads')} severity="error" sx={{ width: '100%' }}>
                        Failed to load!
                    </Alert>
                </Snackbar >
            })
    }
    const sendComment = () => {

        const data = { comment: note }

        fetchData(`${LeadUrl}/comment/${state.leadId}/`, 'PUT', JSON.stringify(data), Header)
            .then((res: any) => {
                // console.log('Form data:', res);
                if (!res.error) {
                    resetForm()
                }
                if (res.error) {
                    // setError(true)
                    // setErrors(res?.errors)
                }
            })
            .catch(() => {
            })
    }

    const backbtnHandle = () => {
        navigate('/app/leads')
    }
    const resetForm = () => {
        setNote('')
    }
    const editHandle = () => {
        // navigate('/contacts/edit-contacts', { state: { value: contactDetails, address: newAddress } })
        let country: string[] | undefined;
        for (country of countries) {
            if (Array.isArray(country) && country.includes(leadDetails?.country || '')) {
                const firstElement = country[0];
                break;
            }
        }
        navigate('/app/leads/edit-lead', {
            state: {
                value: {
                    title: leadDetails?.title,
                    first_name: leadDetails?.first_name,
                    last_name: leadDetails?.last_name,
                    account_name: leadDetails?.account_name,
                    phone: leadDetails?.phone,
                    email: leadDetails?.email,
                    lead_attachment: leadDetails?.lead_attachment,
                    opportunity_amount: leadDetails?.opportunity_amount,
                    website: leadDetails?.website,
                    description: leadDetails?.description,
                    teams: leadDetails?.teams,
                    assigned_to: leadDetails?.assigned_to,
                    contacts: leadDetails?.contacts,
                    status: leadDetails?.status,
                    source: leadDetails?.source,
                    address_line: leadDetails?.address_line,
                    street: leadDetails?.street,
                    city: leadDetails?.city,
                    state: leadDetails?.state,
                    postcode: leadDetails?.postcode,
                    country: country?.[0],
                    tags: leadDetails?.tags,
                    company: leadDetails?.company,
                    probability: leadDetails?.probability,
                    industry: leadDetails?.industry,
                    skype_ID: leadDetails?.skype_ID,
                    file: leadDetails?.file,
                    close_date: leadDetails?.close_date,
                    organization: leadDetails?.organization,
                    created_from_site: leadDetails?.created_from_site,
                }, id: state?.leadId, tags, countries, source, status, industries, users, contacts, teams, comments
            }
        }
        )
    }
    const module = 'Leads'
    const crntPage = 'Lead Details'
    const backBtn = 'Back To Leads'
    // console.log(tags, countries, source, status, industries, users, contacts, 'leaddetail')
    return (
        <Box sx={{ mt: '60px' }}>
            <div>
                <CustomAppBar backbtnHandle={backbtnHandle} module={module} backBtn={backBtn} crntPage={crntPage} editHandle={editHandle} />
                <Box sx={{ mt: '110px', p: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Box sx={{ width: '65%' }}>
                        <Box sx={{ borderRadius: '10px', border: '1px solid #80808038', backgroundColor: 'white' }}>
                            <div style={{ padding: '20px', borderBottom: '1px solid lightgray', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontWeight: 600, fontSize: '18px', color: '#1a3353f0' }}>
                                    Lead Information
                                </div>
                                <div style={{ color: 'gray', fontSize: '16px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: '15px' }}>
                                        created &nbsp;
                                        {FormateTime(leadDetails?.created_at)} &nbsp; by   &nbsp;
                                        <Avatar
                                            src={leadDetails?.created_by?.profile_pic}
                                            alt={leadDetails?.created_by?.email}
                                        />
                                        &nbsp;
                                        &nbsp;
                                        {leadDetails?.first_name}&nbsp;
                                        {leadDetails?.last_name}
                                    </div>

                                </div>
                            </div>
                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                                <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>
                                    {leadDetails?.title}
                                    {/* {console.log(users?.length && users.length,'lll')} */}
                                    <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 1 }}>
                                        {/* {
                                                lead.assigned_to && lead.assigned_to.map((assignItem) => (
                                                    assignItem.user_details.profile_pic
                                                        ? */}

                                        {usersDetails?.length ? usersDetails.map((val: any, i: any) =>
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
                                    {leadDetails?.tags?.length ? leadDetails?.tags.map((tagData: any) => (
                                        <Label
                                            tags={tagData}
                                        />)) : ''}
                                </Stack>
                            </div>
                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Expected close date</div>
                                    <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                        {leadDetails?.close_date || '---'}
                                    </div>
                                </div>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Account Name</div>
                                    <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                        {leadDetails?.account_name}
                                    </div>
                                </div>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Organization Name</div>
                                    <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                        {leadDetails?.organization || '---'}
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: '20px', marginTop: '15px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Created from site</div>
                                    <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                        {/* {lead.pipeline ? lead.pipeline : '------'} */}
                                        {/* {leadDetails?.created_from_site} */}
                                        <AntSwitch checked={leadDetails?.created_from_site} />
                                    </div>
                                </div>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Probability</div>
                                    <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                        {leadDetails?.probability || '---'}
                                    </div>
                                </div>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>website</div>
                                    <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                        {leadDetails?.website ? <Link>
                                            {leadDetails?.website}
                                        </Link> : '---'}

                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: '20px', marginTop: '15px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Industry</div>
                                    <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                        {leadDetails?.industry || '---'}
                                    </div>
                                </div>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>SkypeID</div>
                                    <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                        {leadDetails?.skype_ID ? <Link>
                                            {leadDetails?.skype_ID}
                                        </Link> : '---'}
                                    </div>
                                </div>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '16px', fontWeight: 600 }}>&nbsp;</div>
                                    <div style={{ fontSize: '16px', color: 'gray' }}>&nbsp;</div>
                                </div>
                            </div>
                            {/* </div> */}
                            {/* Contact details */}
                            <div style={{ marginTop: '2%' }}>
                                <div style={{ padding: '20px', borderBottom: '1px solid lightgray', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div style={{ fontWeight: 600, fontSize: '18px', color: '#1a3353f0' }}>
                                        Contact Details
                                    </div>
                                </div>
                                <div style={{ padding: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px' }}>
                                    <div style={{ width: '32%' }}>
                                        <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>First Name</div>
                                        <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                            {leadDetails?.first_name || '---'}
                                        </div>
                                    </div>
                                    <div style={{ width: '32%' }}>
                                        <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Last Name</div>
                                        <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                            {leadDetails?.last_name || '---'}
                                        </div>
                                    </div>
                                    <div style={{ width: '32%' }}>
                                        <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Job Title</div>
                                        <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                            {leadDetails?.title || '---'}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ padding: '20px', marginTop: '15px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div style={{ width: '32%' }}>
                                        <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Email Address</div>
                                        <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                            {leadDetails?.email ? <Link>
                                                {leadDetails?.email}
                                                <FaStar style={{ fontSize: '16px', fill: 'yellow' }} />
                                            </Link> : '---'}
                                        </div>
                                    </div>
                                    <div style={{ width: '32%' }}>
                                        <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Mobile Number</div>
                                        <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                            {leadDetails?.phone ? `${leadDetails?.phone}
                                                <FaStar style={{ fontSize: '16px', fill: 'yellow' }} /><br />` : '---'}
                                        </div>
                                    </div>
                                    <div style={{ width: '32%' }}>
                                        <div style={{ fontSize: '16px', fontWeight: 600 }} />
                                        <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Address details */}
                            <div style={{ marginTop: '2%' }}>
                                <div style={{ padding: '20px', borderBottom: '1px solid lightgray', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div style={{ fontWeight: 600, fontSize: '18px', color: '#1a3353f0' }}>
                                        Address Details
                                    </div>
                                </div>
                                <div style={{ padding: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px' }}>
                                    <div style={{ width: '32%' }}>
                                        <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Address Lane</div>
                                        <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                            {leadDetails?.address_line || '---'}
                                        </div>
                                    </div>
                                    <div style={{ width: '32%' }}>
                                        <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Street</div>
                                        <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                            {leadDetails?.street || '---'}
                                        </div>
                                    </div>
                                    <div style={{ width: '32%' }}>
                                        <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>City</div>
                                        <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                            {leadDetails?.city || '---'}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ padding: '20px', marginTop: '15px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div style={{ width: '32%' }}>
                                        <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Pincode</div>
                                        <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                            {leadDetails?.postcode || '---'}
                                        </div>
                                    </div>
                                    <div style={{ width: '32%' }}>
                                        <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>State</div>
                                        <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                            {leadDetails?.state || '---'}
                                        </div>
                                    </div>
                                    <div style={{ width: '32%' }}>
                                        <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a3353f0' }}>Country</div>
                                        <div style={{ fontSize: '16px', color: 'gray', marginTop: '5%' }}>
                                            {leadDetails?.country || '---'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Description */}
                            <div style={{ marginTop: '3%' }}>
                                <div style={{ padding: '20px', borderBottom: '1px solid lightgray', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div style={{ fontWeight: 600, fontSize: '18px', color: '#1a3353f0' }}>
                                        Description
                                    </div>
                                </div>
                                <p style={{ fontSize: '16px', color: 'gray', padding: '15px' }}>
                                    {leadDetails?.description || '---'}
                                </p>
                            </div>
                            <div style={{ marginTop: '2%' }}>
                                <div style={{ padding: '20px', borderBottom: '1px solid lightgray', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div style={{ fontWeight: 600, fontSize: '18px', color: 'red' }}>
                                        Lost Reason
                                    </div>
                                </div>
                                <p style={{ fontSize: '16px', color: 'gray', padding: '15px', marginTop: '5%' }}>
                                    {/* {lead && lead.description} */}
                                    {/* fhj */}
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

                            <div style={{ padding: '20px', marginTop: '5%' }}>
                                {/* {lead && lead.lead_attachment} */}
                                {attachments?.length ? attachments.map((pic: any, i: any) =>
                                    <Box key={i} sx={{ width: '100px', height: '100px', border: '0.5px solid gray', borderRadius: '5px' }}>
                                        <img src={pic} alt={pic} />
                                    </Box>
                                ) : ''}
                            </div>
                        </Box>
                        <Box sx={{ borderRadius: '10px', mt: '15px', border: '1px solid #80808038', backgroundColor: 'white' }}>
                            <div style={{ padding: '20px', borderBottom: '1px solid lightgray', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontWeight: 600, fontSize: '16px', color: '#1a3353f0' }}>
                                    Notes
                                </div>
                                <CustomSelectField1
                                    name='industry'
                                    select
                                    value={commentList}
                                    InputProps={{
                                        style: {
                                            height: '32px',
                                            maxHeight: '32px',
                                            borderRadius: '10px'
                                        }
                                    }}
                                    onChange={(e: any) => setCommentList(e.target.value)}
                                    sx={{ width: '27%' }}
                                // helperText={errors?.industry?.[0] ? errors?.industry[0] : ''}
                                // error={!!errors?.industry?.[0]}
                                >
                                    {['Recent Last', 'Recent Last'].map((option: any) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </CustomSelectField1>
                            </div>
                            <List>
                                {comments?.length ? comments.map((val: any, i: any) =>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt="testing" src="test" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Stack sx={{ display: 'flex', flexDirection: 'column' }}>
                                                    <Typography>{val.comment}</Typography>
                                                    <Avatar alt="testing" src="test" sx={{ mt: 1, mb: 1 }} />
                                                </Stack>}
                                            secondary={
                                                <React.Fragment >
                                                    <Stack sx={{ mt: 3, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                        <Typography>
                                                            {/* {val?.lead} */}
                                                            test
                                                            &nbsp;-&nbsp;
                                                            {/* {val?.commented_by} */}
                                                            test
                                                            &nbsp;-&nbsp;<span style={{ textDecoration: 'underline' }}>reply</span>
                                                        </Typography>
                                                        <Typography sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>{FormateTime(val?.commented_on)}&nbsp;-&nbsp;test
                                                            {/* {val?.commented_by} */}
                                                        </Typography>
                                                    </Stack>

                                                </React.Fragment>
                                            }
                                        />
                                        <Stack sx={{ display: 'flex', alignItems: 'flex-start', mr: -1.5 }}>
                                            <IconButton aria-label="comments" >
                                                <FaEllipsisV style={{ width: '7px' }} />
                                            </IconButton>
                                        </Stack>
                                    </ListItem>
                                ) : ''}
                            </List>
                            {/* <div style={{ padding: '10px', marginTop: '15px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5%' }}>
                                    <div>
                                        <Avatar
                                            src='/broken-image.jpg'
                                            style={{
                                                height: '30px',
                                                width: '30px'
                                            }}
                                        />
                                    </div>
                                    <div style={{ fontSize: '16px', marginLeft: '10px', marginRight: '10px', textAlign: 'justify' }}>
                                        Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: '10px' }}>Attachments</div> */}
                            {/* <div style={{ paddingLeft: '10px', paddingBottom: '10px', paddingRight: '10px', width: '100%', marginBottom: '10px' }}>
                                <div style={{
                                    border: '1px solid gray',
                                    padding: '10px',
                                    // paddingBottom: '10px',
                                    borderRadius: '5px',
                                    // paddingLeft: '5px',
                                    marginRight: '20px'
                                }}
                                >
                                    <TextField
                                        fullWidth
                                        label='Add Note'
                                        id='fullWidth'
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </div>
                            </div> */}
                            <div style={{ padding: '20px', marginBottom: '10px' }}>
                                <TextField
                                    label='Add Note'
                                    id='fullWidth'
                                    disabled
                                    InputProps={{
                                        style: {
                                            //   height: '40px',
                                            //   maxHeight: '40px'
                                            borderRadius: '15px'
                                        }
                                    }}
                                    sx={{ mb: '30px', width: '100%', borderRadius: '10px' }}
                                // InputProps={{ disableUnderline: true }}
                                />
                                <TextField
                                    label='Add Note'
                                    id='fullWidth'
                                    value={note}
                                    onChange={(e: any) => setNote(e.target.value)}
                                    // disabled
                                    // disableFocusRipple
                                    InputProps={{
                                        style: {
                                            height: '120px',
                                            minHeight: '120px',
                                            //   maxHeight: '40px'
                                            borderRadius: '15px 15px 0px 0px'
                                        }
                                    }}
                                    sx={{ width: '100%' }}
                                // InputProps={{ disableUnderline: true }}
                                />
                                <div style={{
                                    display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', paddingTop: '9px', border: '0.1px solid lightgrey', borderTop: 'none',
                                    borderRadius: '0px 0px 15px 15px',
                                    width: '99.6%'
                                }}>
                                    <div>
                                        <Button component='label'>
                                            <FaRegAddressCard style={{ fill: 'gray' }} />
                                            <input
                                                type='file'
                                                hidden
                                            />
                                        </Button>
                                    </div>
                                    <div>
                                        <Button
                                            variant='contained'
                                            size='small'
                                            color='inherit'
                                            disableFocusRipple
                                            disableRipple
                                            disableTouchRipple
                                            // 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | string
                                            sx={{ backgroundColor: '#C0C0C0', marginRight: '3px', borderRadius: '10px', color: 'white', textTransform: 'none' }}
                                            onClick={resetForm}
                                        >
                                            Cancel
                                        </Button>
                                        <Button variant='contained' size='small'
                                            sx={{ backgroundColor: '#1F51FF', marginRight: '10px', borderRadius: '10px', textTransform: 'none' }}
                                            onClick={sendComment}
                                        >
                                            Send
                                        </Button>
                                    </div>
                                </div>
                                {/* <form>
                                    <div style={{
                                        border: '1px solid gray',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        marginRight: '20px'
                                    }}
                                    >
                                        <TextField
                                            fullWidth label='Add Note'
                                            id='fullWidth' style={{ marginBottom: '30px' }}
                                            InputProps={{ disableUnderline: true }}
                                        /> 
                                        <Divider light style={{ marginTop: '30px' }} />
                                        <div className='bottom-box' style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', paddingTop: '9px' }}>
                                            <div>
                                                <Button component='label'>
                                                    <FaRegAddressCard style={{ fill: 'gray' }} />
                                                    <input
                                                        type='file'
                                                        hidden
                                                    />
                                                </Button>
                                            </div>
                                            <div>
                                                <Button variant='contained' size='small' style={{ backgroundColor: '#C0C0C0', marginRight: '3px' }}>
                                                    Cancel
                                                </Button>
                                                <Button variant='contained' size='small' style={{ backgroundColor: '#1F51FF', marginRight: '3px' }}>
                                                    Send
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </form> */}
                            </div>
                        </Box>
                    </Box>
                </Box>
            </div>
        </Box>
    )
}
export default LeadDetails;