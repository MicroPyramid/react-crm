
import React, { useEffect, useState } from 'react'
import {
    Card,
    Link,
    Button,
    Avatar,
    Divider,
    TextField,
    Box,
    AvatarGroup
} from '@mui/material'
import { Fa500Px, FaAccusoft, FaAd, FaAddressCard, FaEnvelope, FaRegAddressCard, FaStar } from 'react-icons/fa'
import { CustomAppBar } from '../../components/CustomAppBar'
import { useLocation, useNavigate } from 'react-router-dom'
import { AntSwitch } from '../../styles/CssStyled'
import { ContactUrl, UserUrl } from '../../services/ApiUrls'
import { fetchData } from '../../components/FetchData'

type response = {
    user_details: {
        email: string;
        is_active: boolean;
        profile_pic: string;
    };
    role: string;
    address: {
        address_line: string;
        street: string;
        city: string;
        state: string;
        postcode: string;
        country: string;
    };
    is_organization_admin: boolean;
    has_marketing_access: boolean;
    has_sales_access: boolean;
    phone: string;
    alternate_phone: string;
    date_of_joining: string;
    is_active: boolean;

};

export const formatDate = (dateString: any) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
}


export default function UserDetails() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const [userDetails, setUserDetails] = useState<response | null>(null)

    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Token'),
        org: localStorage.getItem('org')
    }
    useEffect(() => {
        getUserDetail(state.userId)
    }, [state.userId])
    // useEffect(() => {
    //     getContactDetail(state.contactId.id)
    // }, [state.contactId.id])

    const getUserDetail = (id: any) => {
        fetchData(`${UserUrl}/${id}/`, 'GET', null as any, headers)
            .then((res) => {
                console.log(res, 'res');
                if (!res.error) {
                    setUserDetails(res?.data?.profile_obj)
                }
            })
    }

    //   useEffect(() => {
    // navigate(-1)
    //     fetchData(`${ContactUrl}/${state.contactId}/`, 'GET', null as any, headers)
    //       .then((data) => {
    //         if (!data.error) {
    // setData(Object.assign({}, data, { cases: data.cases }));

    //           setContactDetails(data.contact_obj)
    //           setNewaddress(...contactDetails, {
    //             addreslane: data.contact_obj.address.address_line,
    //             city: data.contact_obj.address.city,
    //             state: data.contact_obj.address.state,
    //             postcode: data.contact_obj.address.postcode,
    //             country: data.contact_obj.address.country,
    //             street: data.contact_obj.address.street
    //           })
    //         }
    //       })
    //   }, [])

    const backbtnHandle = () => {
        navigate('/app/users')
    }

    const editHandle = () => {
        // navigate('/contacts/edit-contacts', { state: { value: contactDetails, address: newAddress } })
        navigate('/app/users/edit-user', {
            state: {
                value: {
                    email: userDetails?.user_details?.email,
                    role: userDetails?.role,
                    phone: userDetails?.phone,
                    alternate_phone: userDetails?.alternate_phone,
                    address_line: userDetails?.address?.address_line,
                    street: userDetails?.address?.street,
                    city: userDetails?.address?.city,
                    state: userDetails?.address?.state,
                    pincode: userDetails?.address?.postcode,
                    country: userDetails?.address?.country,
                    profile_pic: userDetails?.user_details?.profile_pic,
                    has_sales_access: userDetails?.has_sales_access,
                    has_marketing_access: userDetails?.has_marketing_access,
                    is_organization_admin: userDetails?.is_organization_admin,
                }, id: state?.userId
            }
        })
    }

    const module = 'Users'
    const crntPage = 'User Detail'
    const backBtn = 'Back To Users'
    console.log(userDetails, 'user');

    return (
        <Box sx={{ mt: '60px' }}>
            <div>
                <CustomAppBar backbtnHandle={backbtnHandle} module={module} backBtn={backBtn} crntPage={crntPage} editHandle={editHandle} />
                <Box sx={{ mt: '100px', p: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Box sx={{ width: '100%' }}>
                        <Card sx={{ borderRadius: '7px' }}>
                            <div style={{ padding: '20px', borderBottom: '1px solid lightgray', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'rgb(26, 51, 83)' }}>
                                    User Information
                                </div>
                                {/* <div style={{ color: 'gray', fontSize: '14px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: '15px', textTransform: 'capitalize' }}>
                                        created on
                                        {formatDate(contactDetails?.created_on)}
                                        &nbsp;by &nbsp;&nbsp;
                                        <span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                            <Avatar
                                                src='/broken-image.jpg'
                                                style={{
                                                    height: '24px',
                                                    width: '24px'
                                                }}
                                            />
                                        </span> &nbsp;&nbsp;
                                        {contactDetails?.first_name}
                                        {contactDetails?.last_name}
                                    </div>
                                    <div>Last update&nbsp;{contactDetails?.created_on_arrow}</div>
                                </div> */}
                            </div>
                            {/* <div style={{ padding: '14px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Account Title</div>
                                    <div style={{ fontSize: '14px', color: 'gray', display: 'flex', flexDirection: 'row', marginTop: '5%' }}>
                                        <div style={{ display: 'flex' }}>
                                            <AvatarGroup
                                                total={2}
                                                max={3}
                                            >
                                                {con.map((con) =>
                                                <Tooltip title={con.user.username}>
                                                <Avatar
                                                    alt={'sdf'}
                                                >
                                                    d
                                                </Avatar>
                                                </Tooltip>
                                                )}
                                            </AvatarGroup>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Email Name</div>
                                    <div style={{ fontSize: '14px', color: 'gray', marginTop: '5%' }}>
                                        {userDetails?.user_details?.email || '---'}
                                    </div>
                                </div>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Is Active</div>
                                    <div style={{ fontSize: '14px', color: 'gray', marginTop: '5%' }}>
                                        <AntSwitch checked={userDetails?.user_details?.is_active} />
                                    </div>
                                </div>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Profile pic</div>
                                    <div style={{ fontSize: '14px', color: 'gray', marginTop: '5%' }}>
                                        <Avatar alt={'sdf'}>
                                            {userDetails?.user_details?.profile_pic}
                                        </Avatar>

                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: '20px', marginTop: '15px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Role</div>
                                    <div style={{ fontSize: '14px', color: '#1E90FF', marginTop: '5%' }}>
                                        {userDetails?.role || '---'}
                                    </div>
                                </div>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Mobile Number</div>
                                    <div style={{ fontSize: '14px', color: 'gray', marginTop: '5%' }}>
                                        {userDetails?.phone || '---'}
                                    </div>
                                </div>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Marketing Access</div>
                                    <div style={{ fontSize: '14px', color: 'gray', marginTop: '5%' }}>
                                        <AntSwitch checked={userDetails?.has_marketing_access} />
                                    </div>
                                </div>
                            </div>
                            <div style={{
                                padding: '20px', marginTop: '15px', display: 'flex', flexDirection: 'row'
                                // , justifyContent: 'space-between' 
                            }}>
                                <div style={{ width: '34%' }}>
                                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Sales Access</div>
                                    <div style={{ fontSize: '14px', color: 'gray', marginTop: '5%' }}>
                                        <AntSwitch checked={userDetails?.has_sales_access} />
                                    </div>
                                </div>
                                <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Date of joining</div>
                                    <div style={{ fontSize: '14px', color: 'gray', marginTop: '5%' }}>
                                        {userDetails?.date_of_joining || '---'}
                                    </div>
                                </div>
                                {/* <div style={{ width: '32%' }}>
                                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Do Not Call</div>
                                    <div style={{ fontSize: '14px', color: 'gray', marginTop: '5%' }}>
                                        <AntSwitch
                                            checked={contactDetails?.do_not_call}
                                            inputProps={{ 'aria-label': 'ant design' }} />
                                    </div>
                                </div> */}
                            </div>
                            {/* Address details */}
                            <div style={{ marginTop: '15px' }}>
                                <div style={{ padding: '20px', borderBottom: '1px solid lightgray', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'rgb(26, 51, 83)' }}>
                                        Address
                                    </div>
                                </div>
                                <div style={{ padding: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div style={{ width: '32%' }}>
                                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Address Lane</div>
                                        <div style={{ fontSize: '14px', color: 'gray', marginTop: '5%' }}>
                                            {userDetails?.address?.address_line || '---'}
                                        </div>
                                    </div>
                                    <div style={{ width: '32%' }}>
                                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Street</div>
                                        <div style={{ fontSize: '14px', color: 'gray', marginTop: '5%' }}>
                                            {userDetails?.address?.street || '---'}
                                        </div>
                                    </div>
                                    <div style={{ width: '32%' }}>
                                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>City</div>
                                        <div style={{ fontSize: '14px', color: 'gray', marginTop: '5%' }}>
                                            {userDetails?.address?.city || '---'}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ padding: '20px', marginTop: '15px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div style={{ width: '32%' }}>
                                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Pincode</div>
                                        <div style={{ fontSize: '14px', color: 'gray', marginTop: '5%' }}>
                                            {userDetails?.address?.postcode || '---'}
                                        </div>
                                    </div>
                                    <div style={{ width: '32%' }}>
                                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>State</div>
                                        <div style={{ fontSize: '14px', color: 'gray', marginTop: '5%' }}>
                                            {userDetails?.address?.state || '---'}
                                        </div>
                                    </div>
                                    <div style={{ width: '32%' }}>
                                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Country</div>
                                        <div style={{ fontSize: '14px', color: 'gray', marginTop: '5%' }}>
                                            {userDetails?.address?.country || '---'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Description */}
                            {/* <div style={{ marginTop: '15px' }}>
                                <div style={{ padding: '20px', borderBottom: '1px solid lightgray', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'rgb(26, 51, 83)' }}>
                                        Description
                                    </div>
                                </div>
                                <p style={{ fontSize: '14px', color: 'gray', padding: '20px' }}>
                                    {contactDetails?.description || '---'}
                                </p>
                            </div> */}
                        </Card>
                    </Box>
                    {/* <Box sx={{ width: '34%' }}>
                        <Card sx={{ borderRadius: '7px', p: '20px' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'rgb(26, 51, 83)' }}>
                                    Social
                                </div>
                                <div style={{ color: '#3E79F7', fontSize: '16px', fontWeight: 'bold' }}>
                                    <Button
                                        type='submit'
                                        variant='text'
                                        size='small'
                                        startIcon={<FaEnvelope style={{ fill: '#3E79F7' }} />}
                                        style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: '14px' }}
                                    >
                                        Add Socials
                                    </Button>
                                </div>
                            </div>
                            <div style={{ fontSize: '14px', marginTop: '15px' }}>
                                LinkedIn URL
                            </div>
                            <div style={{ paddingBottom: '10px', width: '80%', marginBottom: '10px' }}>
                                <TextField
                                    variant='outlined'
                                    size='small'
                                    value={contactDetails?.linked_in_url || '---'}
                                    sx={{ height: '40px', width: '100%', mt: 1 }}
                                />
                            </div>
                            <div style={{ fontSize: '14px' }}>
                                Facebook URL
                            </div>
                            <div style={{ paddingBottom: '10px', width: '80%', marginBottom: '10px' }}>
                                <TextField
                                    variant='outlined'
                                    size='small'
                                    value={contactDetails?.facebook_url || '---'}
                                    sx={{ height: '40px', width: '100%', mt: 1 }}
                                />
                            </div>
                            <div style={{ fontSize: '14px', marginTop: '15px' }}>
                                Twitter URL
                            </div>
                            <div style={{ paddingBottom: '10px', width: '80%', marginBottom: '10px' }}>
                                <TextField
                                    variant='outlined'
                                    size='small'
                                    value={contactDetails?.twitter_username || '---'}
                                    sx={{ height: '40px', width: '100%', mt: 1 }}
                                />
                            </div>
                        </Card>
                    </Box> */}
                </Box>
            </div>
        </Box>
    )
}