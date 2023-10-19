
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
// import { makeStyles } from '@mui/styles'
import {
  Avatar,
  // Divider,
  IconButton,
  Typography,
  CssBaseline,
  Toolbar,
  AppBar,
  Tooltip,
  Box
  // Button
} from '@mui/material'
// import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
// import MenuIcon from '@mui/icons-material/Menu'
// import LogoutIcon from '@mui/icons-material/Logout'

// import { CustomAppBar } from '../../components/CustomAppBar'
// // import { ContactDetails } from '../Contacts/ContactDetails'
// import { Sidebar } from '../../components/Sidebar'
import { CustomAppBar } from '../../components/CustomAppBar'
import Sidebar from '../../components/Sidebar'
import Organization from '../organization/Organization'
// const drawerWidth = 240

// const StyledAppBar = styled(AppBar, {
//   shouldForwardProp: (prop) => prop !== 'open'
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen
//     })
//   })
// }))

// const useStyles = makeStyles({
//   btnIcon: {
//     color: 'gray'
//   },
//   logout: {
//     margin: '6px 26px 0px 26px',
//     fill: '#1976d2 !important',
//     cursor: 'pointer'
//   }

// })

export const Home = (props: any) => {
  const [open, setOpen] = useState(true)
  const [org, setOrg] = useState(false)

  const navigate = useNavigate()
  // const [localStorageChange, setLocalStorageChange] = useState(false);

  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     setLocalStorageChange(true);
  //   };

  //   window.addEventListener('storage', handleStorageChange);

  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);
  useEffect(() => {
    if (!localStorage.getItem('Token')) {
      navigate('/login')
    } else if (!localStorage.getItem('org')) {
      // navigate('/organization')
      setOrg(false)
    } else if (localStorage.getItem('Token') && localStorage.getItem('org')) {
      setOrg(true)
    }
  }, [navigate])
  // useEffect(() => {
  //   const token = localStorage.getItem('Token');
  //   const organization = localStorage.getItem('org');
  //   if (!token || !organization) {
  //     navigate('/login');
  //   } else if(!organization){
  //     navigate('/organization')
  //   }
  // }, [navigate]);


  return (
    <Box sx={{}}>
      {org ?
        <Sidebar
          // handleDrawerClose={() => handleDrawerClose}
          open={open}
        /> :
        <Organization />
      }
    </Box>

  )
}
