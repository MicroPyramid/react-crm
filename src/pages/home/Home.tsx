
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
import { CustomAppBar } from '../../components/CustomAppBar'
import Sidebar from '../../components/Sidebar'
import Organization from '../organization/Organization'
// const drawerWidth = 240


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
