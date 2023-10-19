
import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover, Toolbar, Tooltip, Typography } from '@mui/material';
import { FaAddressBook, FaBars, FaBriefcase, FaBuilding, FaChartLine, FaCog, FaDiceD6, FaHandshake, FaIndustry, FaSignOutAlt, FaTachometerAlt, FaUserFriends, FaUsers } from "react-icons/fa";
import LeadList from '../pages/leads/Leads';
import { Navigate, redirect, Route, Router, Routes, useLocation, useNavigate } from 'react-router-dom';
import AddContacts from '../pages/contacts/AddContacts';
import LeadDetails from '../pages/leads/LeadDetails';
import Contacts from '../pages/contacts/Contacts';
import ContactDetails from '../pages/contacts/ContactDetails';
import Users from '../pages/users/Users';
import Opportunities from '../pages/opportunities/Opportunities';
import Cases from '../pages/cases/Cases';
import logo from '../assets/images/auth/img_logo.png';
import { AddLeads } from '../pages/leads/AddLeads';
import Accounts from '../pages/accounts/Accounts';
import { AddAccount } from '../pages/accounts/AddAccounts';
import { AccountDetails } from '../pages/accounts/AccountDetails';
import { AddUsers } from '../pages/users/AddUsers';
import { AddOpportunity } from '../pages/opportunities/AddOpportunity';
import { OpportunityDetails } from '../pages/opportunities/OpportunityDetails';
import { AddCases } from '../pages/cases/AddCases';
import { css } from '@emotion/css';
import { StyledListItemButton, StyledListItemText } from '../styles/CssStyled';
// import MyContext, { MyContextData } from '../context/Context';
import MyContext from '../context/Context';
import { Home } from '../pages/home/Home';
import EditContact from '../pages/contacts/EditContacts';
import { fetchData } from './FetchData';
import { ProfileUrl } from '../services/ApiUrls';
import OrganizationModal from '../pages/organization/OrganizationModal';
import { EditUser } from '../pages/users/EditUser';
import Company from '../pages/company/Company';
import AddCompany from '../pages/company/AddCompany';
import CompanyDetails from '../pages/company/CompanyDetails';
import EditCompany from '../pages/company/EditCompany';
import { EditLead } from '../pages/leads/EditLead';
import UserDetails from '../pages/users/UserDetails';


// declare global {
//     interface Window {
//         drawer: any;
//     }
// }

export default function Sidebar(props: any) {
    const navigate = useNavigate()
    const location = useLocation()
    const [screen, setScreen] = useState('contacts')
    const [module, setModule] = useState([])
    // const [login, setLogin] = useState(true)
    const [drawerWidth, setDrawerWidth] = useState(200)
    const [headerWidth, setHeaderWidth] = useState(drawerWidth)
    const [userDetail, setUserDetail] = useState('')
    const [organizationModal, setOrganizationModal] = useState(false)
    const organizationModalClose = () => { setOrganizationModal(false) }

    useEffect(() => {
        toggleScreen()
    }, [navigate])
    // useEffect(() => {
    // navigate('/leads')
    // if (localStorage.getItem('Token') && localStorage.getItem('org')) {
    //     // setScreen('contacts')
    //     navigate('/contacts')
    // }
    // if (!localStorage.getItem('Token')) {
    //     navigate('/login')
    // }
    // if (!localStorage.getItem('org')) {
    //     navigate('/organization')
    // }
    // toggleScreen()
    // }, [])
    const toggleScreen = () => {
        // console.log(location.pathname.split('/'), 'll')
        if (location.pathname.split('/')[1] === '' || location.pathname.split('/')[1] === undefined || location.pathname.split('/')[2] === 'contacts') {
            setScreen('contacts')
        } else if (location.pathname.split('/')[2] === 'leads') {
            setScreen('leads')
        } else if (location.pathname.split('/')[2] === 'opportunities') {
            setScreen('opportunities')
        } else if (location.pathname.split('/')[2] === 'accounts') {
            setScreen('accounts')
        } else if (location.pathname.split('/')[2] === 'companies') {
            setScreen('companies')
        } else if (location.pathname.split('/')[2] === 'users') {
            setScreen('users')
        }
    }

    useEffect(() => {
        userProfile()
    }, [])

    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Token')
    }

    const userProfile = () => {
        fetchData(`${ProfileUrl}/`, 'GET', null as any, headers)
            .then((res: any) => {
                // console.log(res, 'user')
                if (res?.user_obj) {
                    setUserDetail(res?.user_obj)
                }
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    const navList = ['leads', 'contacts', 'opportunities', 'accounts', 'companies', 'users']
    const navIcons = (text: any, screen: any): React.ReactNode => {
        switch (text) {
            case 'leads':
                return screen === 'leads' ? <FaUsers fill='#3e79f7' /> : <FaUsers />
            case 'contacts':
                return screen === 'contacts' ? <FaAddressBook fill='#3e79f7' /> : <FaAddressBook />
            case 'opportunities':
                return screen === 'opportunities' ? <FaHandshake fill='#3e79f7' /> : <FaHandshake />
            case 'accounts':
                return screen === 'accounts' ? <FaBuilding fill='#3e79f7' /> : <FaBuilding />
            case 'companies':
                return screen === 'companies' ? <FaIndustry fill='#3e79f7' /> : <FaIndustry />
            // case 'analytics':
            //     return screen === 'analytics' ? <FaChartLine fill='#3e79f7' /> : <FaChartLine />
            case 'users':
                return screen === 'users' ? <FaUserFriends fill='#3e79f7' /> : <FaUserFriends />
            // case 'cases':
            //     return screen === 'cases' ? <FaBriefcase fill='#3e79f7' /> : <FaBriefcase />
            default: return <FaDiceD6 fill='#3e79f7' />
        }
    }


    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    // console.log(screen, 'sidebar');
    return (
        <>
            <Box>
                <AppBar position="fixed"
                    sx={{
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        height: '60px',
                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // boxShadow: 'none',
                        // borderBottom: `0.5px solid gray`
                        boxShadow: '1px'
                    }}
                >
                    <Box>
                        <Toolbar>
                            {drawerWidth === 60 ? <img src={logo} width={'40px'} style={{ transform: 'rotate(270deg)', marginLeft: '-15px', marginRight: '10px' }} /> : <img src={logo} width={'100px'} style={{ marginLeft: '-5px', marginRight: '30px' }} />}
                            <IconButton sx={{ ml: '-10px' }} onClick={() => setDrawerWidth(drawerWidth === 60 ? 200 : 60)}>
                                <FaBars style={{ height: '20px' }} />
                            </IconButton>
                            <Typography sx={{ fontWeight: 'bold', color: 'black', ml: '20px', textTransform: 'capitalize' }}>
                                {screen}
                                {/* Bottle-CRM */}
                            </Typography>
                        </Toolbar>
                    </Box>
                    <Box style={{
                        marginRight: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        {/* <IconButton onClick={userProfile} sx={{ mr: 2 }}><FaCog /></IconButton> */}
                        <IconButton onClick={handleClick} sx={{ mr: 3 }}>
                            <Avatar
                                src='hj'
                                sx={{
                                    height: '27px',
                                    width: '27px'
                                }}
                            />
                        </IconButton>
                        <Popover
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                        >
                            <List disablePadding>
                                <ListItem disablePadding>
                                    <StyledListItemButton onClick={() => {
                                        localStorage.clear()
                                        navigate('/login')
                                    }}>
                                        <ListItemIcon > <FaSignOutAlt fill='#3e79f7' /></ListItemIcon>
                                        <StyledListItemText primary={'Sign out'} sx={{ ml: '-20px', color: '#3e79f7' }} />
                                    </StyledListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <StyledListItemButton onClick={() => setOrganizationModal(!organizationModal)}>
                                        <ListItemIcon > <FaIndustry fill='#3e79f7' /></ListItemIcon>
                                        <StyledListItemText primary={'Organization'} sx={{ ml: '-20px', color: '#3e79f7' }} />
                                    </StyledListItemButton>
                                </ListItem>
                            </List>
                            {/* <Tooltip title='logout' sx={{ ml: '15px' }}>
                                <IconButton
                                    >
                                </IconButton>
                            </Tooltip> */}
                        </Popover>
                    </Box>
                </AppBar>

                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
                    }}
                >
                    <Box>
                        <List sx={{ pt: '65px' }}>
                            {navList.map((text, index) => (
                                <ListItem key={text} disablePadding  >
                                    <StyledListItemButton
                                        sx={{ pt: '6px', pb: '6px' }}
                                        onClick={() => {
                                            navigate(`/app/${text}`)
                                            setScreen(text)
                                        }}
                                        selected={screen === text}
                                    >
                                        <ListItemIcon sx={{ ml: '5px' }}>
                                            {navIcons(text, screen)}
                                        </ListItemIcon>
                                        <StyledListItemText primary={text} sx={{ ml: -2, textTransform: 'capitalize' }} />
                                    </StyledListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                </Drawer>
                <MyContext.Provider value={drawerWidth}>

                    {/* <Box sx={{ width: drawerWidth === 60 ? '1380px' : '1240px', ml: drawerWidth === 60 ? '60px' : '200px', overflowX: 'hidden' }}> */}
                    <Box sx={{ width: 'auto', ml: drawerWidth === 60 ? '60px' : '200px', overflowX: 'hidden' }}>
                        {/* {location.pathname.split('/')[1] === '' && <Contacts />}
                {location.pathname.split('/')[1] === 'contacts' && <Contacts />}
                {location.pathname.split('/')[2] === 'add-contacts' && <AddContacts />}
                {location.pathname.split('/')[1] === 'leads' && <LeadList />}
                {location.pathname.split('/')[2] === 'add-leads' && <AddLeads />} */}
                        {/* {location.pathname === 'leads' && <LeadList />}
                        {screen === 'contacts' && <Contacts />} */}
                        {/* <Routes>
                            <Route index element={<Navigate to="/contacts" replace />} />
                            </Routes> */}
                        <Routes>
                            <Route index element={<Contacts />} />
                            {/* <Route path='/' element={<Contacts />} /> */}
                            <Route path='/app/leads' element={<LeadList />} />
                            <Route path='/app/leads/add-leads' element={<AddLeads />} />
                            <Route path='/app/leads/edit-lead' element={<EditLead />} />
                            <Route path='/app/leads/lead-details' element={<LeadDetails />} />
                            <Route path='/app/companies' element={<Company />} />
                            <Route path='/app/companies/add-company' element={<AddCompany />} />
                            <Route path='/app/companies/edit-company' element={<EditCompany />} />
                            <Route path='/app/companies/company-details' element={<CompanyDetails />} />
                            <Route path='/app/contacts' element={<Contacts />} />
                            <Route path='/app/contacts/add-contacts' element={<AddContacts />} />
                            <Route path='/app/contacts/contact-details' element={<ContactDetails />} />
                            <Route path='/app/contacts/edit-contact' element={<EditContact />} />
                            <Route path='/app/accounts' element={<Accounts />} />
                            <Route path='/app/accounts/add-account' element={<AddAccount />} />
                            <Route path='/app/accounts/account-details' element={<AccountDetails />} />
                            <Route path='/app/users' element={<Users />} />
                            <Route path='/app/users/add-users' element={<AddUsers />} />
                            <Route path='/app/users/edit-user' element={<EditUser />} />
                            <Route path='/app/users/user-details' element={<UserDetails />} />
                            <Route path='/app/opportunities' element={<Opportunities />} />
                            <Route path='/app/opportunities/add-opportunities' element={<AddOpportunity />} />
                            <Route path='/app/opportunities/opportunity-details' element={<OpportunityDetails />} />
                            <Route path='/app/cases' element={<Cases />} />
                            <Route path='/app/add-cases' element={<AddCases />} />
                        </Routes>
                        {/* <Route path='/cases/add-cases' element={<AddCases />} />
                            <Route path='/cases/cases-details' element={<CasesDetails />} />
                            <Route path='/analytics' element={<Analytics />} /> */}

                        {/* 

            <Route path='/accounts' element={<Account />} />
            <Route path='/analytics' element={<Analytics />} />
            <Route path='/users' element={<Users />} />
            <Route path='/leads/add-leads' element={<AddLeads />} />
            <Route path='/leads/lead-details' element={<LeadDetails />} />
            <Route path='/leads/edit-leads' element={<EditLead />} />
            <Route path='/contacts/add-contacts' element={<AddContact />} />
            <Route path='/contacts/contact-details' element={<ContactDetails />} />
            <Route path='/contacts/edit-contacts' element={<EditContact />} />
            <Route path='/opportunities/add-opportunities' element={<AddOpportunity />} />
            <Route path='/opportunities/opportunities-details' element={<OpportunityDetails />} />
            <Route path='/opportunities/edit-opportunities' element={<EditOpportunities />} />
            <Route path='/opportunities/opportunities-edit' element={<EditOpportunityId />} />
            <Route path='/accounts/account-details' element={<AccountDetails />} />
            <Route path='/accounts/add-accounts' element={<AddAccount />} />
            <Route path='/accounts/account-edit' element={<EditAccounts />} />
            <Route path='/accounts/edit-accounts' element={<EditAccount />} />
            <Route path='/cases' element={<Cases />} />
            <Route path='/cases/case-details' element={<CasesDetails />} />
            <Route path='/cases/add-cases' element={<AddCases />} />
            <Route path='/cases/edit-cases' element={<EditCases />} />
            <Route path='/cases/edit-case' element={<EditCase />} />
            <Route path='/users/add-users' element={<AddUsers />} />
            <Route path='/users/edit-users' element={<EditUser />} /> */}

                    </Box>
                </MyContext.Provider>
                <OrganizationModal
                    open={organizationModal}
                    handleClose={organizationModalClose}
                />
            </Box >
        </>

    )
}

