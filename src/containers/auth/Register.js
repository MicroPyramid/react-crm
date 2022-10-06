import React from 'react'
import {
  Grid,
  Typography,
  Link,
  CssBaseline
} from '@mui/material'

import imgLogo from '../../assets/images/auth/img_logo.png'
import imgBG from '../../assets/images/auth/img_BG.jpg'
import imgRegister from '../../assets/images/auth/img_register.png'
import { RegistrationForm } from './RegistrationForm'
import '../../css/auth.css'

export const Registration = () => {
  return (
    <div>
      <CssBaseline />
      <Grid
        container xs={12} direction='row'
        sx={{
          height: '100%',
          overflow: 'hidden',
          position: 'fixed'
        }}
      >
        <Grid
          container
          item
          xs={7}
          direction='column'
          justifyContent='space-evenly'
          alignItems='center'
          sx={{ height: '100%', overflow: 'hidden' }}
        >
          <Grid item>
            <Grid>
              <img src={imgLogo} alt='register_logo' className='register-logo' />
            </Grid>
            <Typography variant='h5' style={{ fontWeight: 'bolder' }}>Sign Up</Typography>
            <Typography variant='subtitle1'>
              Already have an account?
              <Link href='/login' underline='none'>
                Sign In
              </Link>
            </Typography>
            <RegistrationForm />
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={5}
          sx={{ overflow: 'hidden', height: '100%' }}
          direction='column'
          justifyContent='center'
          alignItems='center'
        >
          <img
            src={imgBG}
            alt='register_image'
            className='register-ad-bg-image'
          />
          <div className='register-ad-text'>
            <h3>Welcome to BottleCRM</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              <br />Sunt
              consequatur itaque qui, aliquid id provident delectus.
            </p>
            <img
              src={imgRegister}
              alt='register_ad_image'
              className='register-ad-image'
            />
            <footer className='register-footer'>
              www.bottlecrm.com | About Us | Contact Us
            </footer>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
