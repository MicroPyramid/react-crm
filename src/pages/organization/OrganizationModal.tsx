import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Dialog, Divider, IconButton, List, ListItem, Stack, TextField, Typography } from "@mui/material";
import { FaPlus, FaTimes } from "react-icons/fa";
import { fetchData } from "../../components/FetchData";
import { OrgUrl } from "../../services/ApiUrls";
import { StyledListItemButton, StyledListItemText } from "../../styles/CssStyled";

interface Item {
    org: {
        id: any;
        name: any;
    };
}

export default function OrganizationModal(props: any) {
    const navigate = useNavigate()
    const { open, handleClose } = props;

    const [organization, setOrganization] = useState<Item[]>([])
    const [newOrganization, setNewOrganization] = useState('')
    const [error, setError] = useState('')

    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        getOrganization()
        setError('')
        setNewOrganization('')
    }, [])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            buttonRef.current?.click();
        }
    };
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Token')
    }
    const getOrganization = () => {
        fetchData(`${OrgUrl}/`, 'GET', null as any, headers)
            .then((res: any) => {
                // console.log(res, 'org')
                if (res?.profile_org_list) {
                    setOrganization(res?.profile_org_list)
                    setNewOrganization('')
                }
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }
    const addOrganization = () => {
        const organizationName = { name: newOrganization }
        fetchData(`${OrgUrl}/`, 'POST', JSON.stringify(organizationName), headers)
            .then(res => {
                // console.log(res)
                if (res?.error) {
                    setError(res?.errors?.name[0])
                } else if (res.status === 201) {
                    getOrganization()
                    setError('')
                }
            })
            .catch(err => console.error(err))
    }
    const onHandleClose = () => {
        handleClose()
        setError('')
        setNewOrganization('')
    }
    const selectedOrganization = (id: any) => {
        // if(localStorage.getItem('org')){
        //     localStorage.setItem('org', id)    
        //     handleClose()
        // }else{
        localStorage.setItem('org', id)
        // navigate('/')
        onHandleClose()
        if (localStorage.getItem('org')) {
            // navigate('/app/leads')
            navigate('/')
        }
        // } 
    }

    // const handleBackdropClick = (event: React.MouseEvent<HTMLElement>) => {
    //     event.stopPropagation();
    //   };
    return (
        <div>
            <Dialog
                open={open}
                onClose={onHandleClose}
            // BackdropProps={{
            //     onClick: handleBackdropClick,
            //   }}
            >
                <Box sx={{ width: '400px' }}>
                    {localStorage.getItem('org') ?
                        <Stack sx={{ display: "flex", flexDirection: "row-reverse", m: '12px 10px -20px 0px' }}>
                            <IconButton size="small"><FaTimes onClick={onHandleClose} /></IconButton>
                        </Stack> : ''}
                    <Stack sx={{ display: 'flex', textAlign: 'center', mt: 1.5 }}>
                        <Typography sx={{ fontSize: '22px', fontWeight: 500, mb: 1.5 }}>
                            Organizations
                        </Typography>
                    </Stack>
                    <Divider flexItem />
                    <Box sx={{ height: '250px', maxHeight: '250px', overflowY: 'auto' }}>
                        {organization?.length === 0 ?
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px' }}>
                                <Typography sx={{ fontSize: '18px', color: 'grey' }}>
                                    Create an Organization
                                </Typography>
                            </Box>
                            : <List
                                sx={{ width: '100%' }}>
                                {organization?.length > 0 &&
                                    organization.map((item, i) => (
                                        <ListItem >
                                            <StyledListItemButton
                                                selected={item?.org?.id === localStorage?.getItem('org')}
                                                onClick={() => selectedOrganization(item?.org?.id)}>
                                                <StyledListItemText>
                                                    {item?.org?.name}
                                                </StyledListItemText>
                                            </StyledListItemButton>
                                        </ListItem>
                                    ))}
                            </List>
                        }
                    </Box>
                    <Divider flexItem />
                    <Box sx={{ p: '10px 20px', mb: 2 }}>
                        <Typography sx={{ color: '#3e79f7' }}>Add Organization</Typography>
                        <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <TextField
                                autoFocus
                                type="text"
                                fullWidth
                                variant="standard"
                                value={newOrganization}
                                onChange={(e: any) => setNewOrganization(e.target.value)}
                                onKeyDown={handleKeyDown}
                                error={!!error}
                                helperText={error !== '' ? error : ''}
                                sx={{ mt: !!error ? 2 : '0px' }}
                            />
                            <IconButton onClick={addOrganization} ref={buttonRef} disabled={newOrganization === ''} sx={{ ml: 1 }} size='medium'><FaPlus fill={newOrganization === '' ? 'lightgrey' : "#3e79f7"} /></IconButton>
                        </Stack>
                    </Box>
                </Box>
            </Dialog>
        </div>
    );
}