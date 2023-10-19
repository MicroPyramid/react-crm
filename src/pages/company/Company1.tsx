import React, { useEffect, useState } from 'react'
import { Box, Button, Card, Container, Link, List, ListItem, ListItemButton, Stack, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { fetchData } from '../../components/FetchData';
import { OrgUrl } from '../../services/ApiUrls';
import '../../styles/company.css'
import { Spinner } from '../../components/Spinner';
import { StyledListItemButton, StyledListItemText } from '../../styles/CssStyled';

interface Item {
    org: {
        id: any;
        name: any;
    };
}

export default function Organization() {
    const [organization, setOrganization] = useState<Item[]>([])
    const [newOrganization, setNewOrganization] = useState('')
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Token')
        //   Authorization: `jwt ${localStorage.getItem('Token')}`,
        //   org: localStorage.getItem('org')
    }
    const getOrganization = () => {
        fetchData(`${OrgUrl}/`, 'GET', null as any, headers)
            .then((res: any) => {
                // console.log(res, 'org')
                if (res?.profile_org_list) {
                    setLoading(false)
                    setOrganization(res?.profile_org_list)
                    setNewOrganization('')
                }
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }
    useEffect(() => {
        if (!localStorage.getItem('Token')) {
            navigate('/login')
        } else {
            getOrganization()
        }
    }, [])
    // useEffect(() => {
    //     const token = localStorage.getItem('Token');
    //     if (!token) {
    //       navigate('/login');
    //     }
    //     else {
    //         getOrganization()
    //     }
    //   }, [navigate]);

    //     const hasSelectedOrganization = !!localStorage.getItem('company');
    //     console.log(hasSelectedOrganization,'hasslectedcompany')
    // useEffect(() => {
    //     if (hasSelectedOrganization) {
    //             navigate('/')
    //         } else {
    //             getOrganization()
    //         }
    //     }, [])
    const selectedOrganization = (id: any) => {
        localStorage.setItem('org', id)
        // navigate('/')
        navigate('/contacts')
    }

    const addCompany = () => {
        const organizationName = { name: newOrganization }
        fetchData(`${OrgUrl}/`, 'POST', JSON.stringify(organizationName), headers)
            .then(res => {
                console.log(res)
                if (res.status === 201) {
                    getOrganization()
                }
            })
            .catch(err => console.error(err))
    }

    return (
        <Box>
            <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant='h5'>Organization</Typography>
                <Card>
                    <List>
                        {
                            organization?.length > 0 &&
                            organization.map((item, i) => (
                                <ListItem key={i}>
                                    <StyledListItemButton onClick={() => selectedOrganization(item?.org?.id)}>
                                        <StyledListItemText>
                                            {item?.org?.name}
                                        </StyledListItemText>
                                    </StyledListItemButton>
                                </ListItem>
                            ))}
                    </List>
                </Card>
            </Container>
            {/* <Container>
                <Typography variant='h5'>Organization</Typography>
                <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                    <TextField
                        // {...(TextFieldProps as any)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        label='Organization'
                        type='text'
                        variant='outlined'
                        value={newOrganization}
                        onChange={(e: any) => setNewOrganization(e.target.value)}
                    // style={{ width: '80%' }}
                    // size='small'
                    />
                    <Button onClick={addCompany} variant='contained' sx={{ ml: 1 }} disabled={newOrganization === ''}>Add organization</Button>
                </Stack>


                {loading ?
                    <Spinner /> :
                    <List className='list'>
                        {
                            organization?.length > 0 &&
                            organization.map((item, i) => (
                                <ListItem key={i}>
                                    <Link
                                        className='link'
                                        href='/'
                                        variant='body2'
                                        underline='none'
                                        sx={{
                                            color: '#455560',
                                            fontSize: '14px',
                                            lineHeight: 1.5
                                        }}
                                        onClick={() => selectedOrganization(item?.org?.id)}
                                    >
                                        {item?.org?.name}
                                    </Link>
                                </ListItem>
                            ))}
                    </List>

                }
            </Container> */}
        </Box>

    )
}