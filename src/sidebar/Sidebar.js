import React, { useState } from 'react'
import {
  // BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
  // useLocation
} from 'react-router-dom'
import {
  Box,
  List,
  Divider,
  // ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText
} from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import { styled, useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined'
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined'
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined'
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined'
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'
// import { makeStyles } from '@mui/styles'
import { Analytics } from '@mui/icons-material'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'

import { CompanyList } from '../containers/Company/CompanyList'
import { LeadList } from '../containers/Leads/LeadList'
import { Contact } from '../containers/Contacts/Contact'
import { Opportunities } from '../containers/Opportunities/Opportunities'
import { Account } from '../containers/Accounts/Account'
import { Users } from '../containers/Users/Users'
import { AddLeads } from '../containers/Leads/AddLeads'
import { LeadDetails } from '../containers/Leads/LeadDetails'
import { AddContact } from '../containers/Contacts/AddContact'
import { ContactDetails } from '../containers/Contacts/ContactDetails'
import { EditLead } from '../containers/Leads/EditLead'
import { EditContact } from '../containers/Contacts/EditContact'
import { AddOpportunity } from '../containers/Opportunities/AddOpportunity'
import { OpportunityDetails } from '../containers/Opportunities/OpportunityDetails'
import { EditOpportunities } from '../containers/Opportunities/EditOpportunities'
import { EditOpportunityId } from '../containers/Opportunities/EditOpportunityId'
import { AddAccount } from '../containers/Accounts/AddAccount'
import { AccountDetails } from '../containers/Accounts/AccountDetails'
import { EditAccounts } from '../containers/Accounts/EditAccounts'
import { EditAccount } from '../containers/Accounts/EditAccount'
import { Cases } from '../containers/Cases/Cases'
import { CasesDetails } from '../containers/Cases/CasesDetails'
import { AddCases } from '../containers/Cases/AddCases'
import { EditCases } from '../containers/Cases/EditCases'
import { EditCase } from '../containers/Cases/EditCase'
import { AddUsers } from '../containers/Users/AddUsers'
import { EditUser } from '../containers/Users/EditUser'

const drawerWidth = 240
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`
  }
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
)

// const useStyles = makeStyles({
//   hover: {
//     '&:hover': {
//       backgroundColor: 'rgb(7, 177, 77, 0.42)'
//     }
//   }
// })

export const Sidebar = (props) => {
  const theme = useTheme()
  const navigate = useNavigate()
  // const location = useLocation()
  // const [open, setOpen] = useState(false)
  const [activeScreen, SetActiveScreen] = useState('Dashboard')
  // const [activeScreenHeader, setActiveScreenHeader] = useState('Bottle')
  // const classes = useStyles()

  const toggleScreens = async (text) => {
    if (text === 'Contacts') {
      navigate('/contacts')
      SetActiveScreen(text)
    } else if (text === 'Dashboard') {
      navigate('/')
      SetActiveScreen(text)
    } else if (text === 'Companies') {
      navigate('/company')
      SetActiveScreen(text)
    } else if (text === 'Leads') {
      navigate('/leads')
      SetActiveScreen(text)
    } else if (text === 'Opportunities') {
      navigate('/opportunities')
      SetActiveScreen(text)
    } else if (text === 'Accounts') {
      navigate('/accounts')
      SetActiveScreen(text)
    } else if (text === 'Analytics') {
      navigate('/analytics')
      SetActiveScreen(text)
    } else if (text === 'Users') {
      navigate('/users')
      SetActiveScreen(text)
    } else if (text === 'Cases') {
      navigate('/cases')
      SetActiveScreen(text)
    }
  }

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Drawer variant='permanent' open={props.open}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '13px'
        }}
        >
          <div style={{ paddingTop: '4px' }}>
            <img src={require('../assets/images/auth/img_logo.png')} height='30px' width='100px' />
          </div>
          <IconButton
            sx={{ pt: -4 }}
            onClick={props.handleDrawerClose()}
          >
            {
              theme.direction === 'rtl'
                ? <ChevronRightIcon />
                : <MenuOpenIcon style={{ fill: 'rgb(26, 51, 83)' }} />
            }
          </IconButton>
        </div>
        <Divider />
        <List style={{ marginTop: '-12px', alignItems: 'center' }}>
          {
            ['Dashboard', 'Leads', 'Contacts', 'Opportunities', 'Accounts', 'Companies', 'Analytics', 'Users', 'Cases'].map((text, index) => (
              <ListItemButton
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgb(185 208 225 / 34%)'
                  },
                  backgroundColor: text === activeScreen ? 'rgb(185 208 225 / 34%)' : '#ffffff',
                  pl: 2.8
                }}
                style={{ alignItems: 'center' }}
                button key={text}
                onClick={() => toggleScreens(text)}
              >
                <ListItemIcon>
                  {index === 0 && <DashboardCustomizeOutlinedIcon style={{ fill: text === activeScreen ? '#005cb6' : '#1A3353', fontWeight: text === activeScreen ? 'bold' : '' }} />}
                  {index === 1 && <LocalAtmOutlinedIcon style={{ fill: text === activeScreen ? '#005cb6' : '#1A3353', fontWeight: text === activeScreen ? 'bold' : '' }} />}
                  {index === 2 && <ContactMailOutlinedIcon style={{ fill: text === activeScreen ? '#005cb6' : '#1A3353', fontWeight: text === activeScreen ? 'bold' : '' }} />}
                  {index === 3 && <TipsAndUpdatesOutlinedIcon style={{ fill: text === activeScreen ? '#005cb6' : '#1A3353', fontWeight: text === activeScreen ? 'bold' : '' }} />}
                  {index === 4 && <AccountCircleOutlinedIcon style={{ fill: text === activeScreen ? '#005cb6' : '#1A3353', fontWeight: text === activeScreen ? 'bold' : '' }} />}
                  {index === 5 && <LocationCityOutlinedIcon style={{ fill: text === activeScreen ? '#005cb6' : '#1A3353', fontWeight: text === activeScreen ? 'bold' : '' }} />}
                  {index === 6 && <InsightsOutlinedIcon style={{ fill: text === activeScreen ? '#005cb6' : '#1A3353', fontWeight: text === activeScreen ? 'bold' : '' }} />}
                  {index === 7 && <PersonAddAltOutlinedIcon style={{ fill: text === activeScreen ? '#005cb6' : '#1A3353', fontWeight: text === activeScreen ? 'bold' : '' }} />}
                  {index === 8 && <WorkOutlineIcon style={{ fill: text === activeScreen ? '#005cb6' : '#1A3353', fontWeight: text === activeScreen ? 'bold' : '' }} />}
                </ListItemIcon>
                <ListItemText primary={text} style={{ color: text === activeScreen ? '#005cb6' : '#1A3353', fontWeight: text === activeScreen ? 'bolder' : '' }} />
              </ListItemButton>
            ))
          }
        </List>
      </Drawer>
      <Box component='main' style={{ width: '100%' }}>
        <DrawerHeader />
        {
          activeScreen === 'Dashboard'
            ? navigate('/')
            : null
        }
        <div style={{ width: '100%' }}>
          <Routes>
            <Route path='/contacts' element={<Contact />} />
            <Route path='/company' element={<CompanyList />} />
            <Route path='/leads' element={<LeadList />} />
            <Route path='/opportunities' element={<Opportunities />} />
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
            <Route path='/users/edit-users' element={<EditUser />} />
          </Routes>
        </div>
      </Box>
    </Box>
  )
}
