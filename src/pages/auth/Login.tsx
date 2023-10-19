import { Box, Button, CssBaseline, Grid, Link, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
// import { AuthUrl, OrgUrl, SERVER } from '../../components/ApiUrls'
// import { GoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
// import AuthComponent from '../../components/AuthSignIn'
// import GoogleLogin from '../../components/GoogleLogin'
// import GoogleLoginButto from '../../components/GoogleLogin2'
//  import Google from '../../components/GoogleLogin1'
import imgLogo from '../../assets/images/auth/img_logo.png'
import imgBG from '../../assets/images/auth/img_BG.jpg'
import imgLogin from '../../assets/images/auth/img_login.png'
import '../../styles/auth.css'
import { googleLogout } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
// import { fetchData } from '../../components/FetchData';
import { useNavigate } from 'react-router-dom';
import imgGoogle from '../../assets/images/auth/google.svg'
import { GoogleButton } from '../../styles/CssStyled';
import { fetchData } from '../../components/FetchData';
import { AuthUrl } from '../../services/ApiUrls';
// import { GoogleButton } from '../../../../react-crm-2.0/src/styles/CssStyled';

declare global {
    interface Window {
        google: any;
        gapi: any;
    }
}


export default function Login() {
    const navigate = useNavigate()
    const [token, setToken] = useState(false)

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Token'),
        //   org: localStorage.getItem('org')
    }
    useEffect(() => {
        if (localStorage.getItem('Token')) {
            // navigate('/organization')
            navigate('/app')
        }
    }, [token])
    // useEffect(() => {
    //     const token = localStorage.getItem('Token');
    //     if (token) {
    //       navigate('/organization');
    //     }
    //   }, [navigate]);
    // const headers = {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     //   Authorization: `jwt ${localStorage.getItem('Token')}`,
    //     //   org: localStorage.getItem('org')
    // }
    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            const apiToken = { token: tokenResponse.access_token }
            // const formData = new FormData()
            // formData.append('token', tokenResponse.access_token)
            const head = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            fetchData(`${AuthUrl}/`, 'POST', JSON.stringify(apiToken), head)
                .then((res: any) => {
                    // console.log(res.access_token, 'access_token')
                    localStorage.setItem('Token', `Bearer ${res.access_token}`)
                    setToken(true)
                })
                .catch((error: any) => {
                    console.error('Error:', error)
                })
        },

    });
    return (
        <div>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                // spacing={{ xs: 2, sm: 2, md: 4 }}
                // container xs={12}
                //  direction='row' 
                justifyContent='center'
                alignItems='center'
                sx={{
                    height: '100%',
                    width: '100%',
                    // overflow: 'hidden',
                    position: 'fixed'
                }}
            >
                <Grid
                    container
                    item
                    xs={8}
                    direction='column'
                    justifyContent='space-evenly'
                    alignItems='center'
                    sx={{ height: '100%', overflow: 'hidden' }}
                >
                    <Grid item>
                        <Grid sx={{ mt: 2 }}>
                            <img src={imgLogo} alt='register_logo' className='register-logo' />
                        </Grid>
                        <Typography variant='h5' style={{ fontWeight: 'bolder' }}>Sign In</Typography>
                        <Grid item sx={{ mt: 4 }}>
                            {/* <GoogleLogin
                                onSuccess={credentialResponse => {
                                    console.log(credentialResponse);
                                }}

                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                            <Button onClick={signout}>logout</Button> */}

                            <GoogleButton variant='outlined' onClick={() => login()} sx={{ fontSize: '12px', fontWeight: 500 }}>
                                Sign in with Google
                                <img src={imgGoogle} alt='google' style={{ width: '17px', marginLeft: '5px' }} />
                            </GoogleButton>
                            {/* <Grid item sx={{ mt: 2, alignItems: 'center', alignContent: 'center' }}>
                                <Grid item sx={{ mt: 1, ml: 6 }}>
                                    <div className='authentication_wrapper'>
                                        <div className='authentication_block'>
                                            <div className='buttons'>
                                                <GoogleLogin
                                                    onSuccess={credentialResponse => {
                                                        console.log(credentialResponse);
                                                    }}

                                                    onError={() => {
                                                        console.log('Login Failed');
                                                    }}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid> */}
                        </Grid>

                    </Grid>
                </Grid>
                <Grid
                    container
                    item
                    xs={8}
                    direction='column'
                    justifyContent='center'
                    alignItems='center'
                    className='rightBg'
                    sx={{ height: '100%', overflow: 'hidden', justifyItems: 'center' }}
                >
                    <Grid item >
                        <Stack sx={{
                            alignItems: 'center',
                            //  mt: '-600px' 
                        }}>
                            <h3>Welcome to BottleCRM</h3>
                            <p> Free and OpenSource CRM from small medium business.</p>
                            <img
                                src={imgLogin}
                                alt='register_ad_image'
                                className='register-ad-image'
                            />
                            <footer className='register-footer'>
                                bottlecrm.com
                            </footer>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </div>

    )
}
