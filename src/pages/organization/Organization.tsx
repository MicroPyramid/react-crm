import React, { useEffect, useState } from 'react'
import { Box, Container} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import OrganizationModal from './OrganizationModal';
import '../../styles/company.css'

interface Item {
    org: {
        id: any;
        name: any;
    };
}

export default function Organization() {
    const navigate = useNavigate()

    const [organizationModal, setOrganizationModal] = useState(false)


    useEffect(() => {
        if (!localStorage.getItem('Token')) {
            navigate('/login')
        } else {
            setOrganizationModal(true)
        }
    }, [])

    const handleClose = (event: any, reason: any) => {
        if (reason && reason == "backdropClick"){
            return;
        }        
    }


    return (
        <Box>
            <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {/* <Typography variant='h5'>Organization</Typography> */}
                {/* {loading && <Spinner />} */}
                <OrganizationModal
                    open={organizationModal}
                    handleClose={handleClose}
                />
                {/* <Card>
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
                </Card> */}
            </Container>
        </Box>

    )
}