import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Card,
  Button,
  Link,
  Avatar,
  Switch,
  styled
} from '@mui/material'
import LinkIcon from '@mui/icons-material/AddLink'
import StarIcon from '@mui/icons-material/Star'

import { fetchData } from '../../components/FetchData'
import { ContactUrl } from '../../components/ApiUrls'
import { DetailsPageAppbar } from '../../components/DetailsPageAppbar'

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)'
    }
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff'
      }
    }
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box'
  }
}))

export const ContactDetails = () => {
  const [contactDetails, setContactDetails] = useState([])
  const [newaddress, setNewaddress] = useState('')
  const navigate = useNavigate()
  const { state } = useLocation()

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `jwt ${localStorage.getItem('Token')}`,
    org: localStorage.getItem('org')
  }

  useEffect(() => {
    fetchData(`${ContactUrl}/${state.contactId}/`, 'GET', null, headers)
      .then((data) => {
        if (!data.error) {
          setContactDetails(data.contact_obj)
          setNewaddress(...contactDetails, {
            addreslane: data.contact_obj.address.address_line,
            city: data.contact_obj.address.city,
            state: data.contact_obj.address.state,
            postcode: data.contact_obj.address.postcode,
            country: data.contact_obj.address.country,
            street: data.contact_obj.address.street
          })
        }
      })
  }, [])

  const backbtnHandle = () => {
    navigate('/contacts')
  }

  const editHandle = () => {
    navigate('/contacts/edit-contacts', { state: { newvalue: contactDetails, address: newaddress } })
  }

  const module = 'Contact'
  const crntPage = 'Contact Title'
  const backBtn = 'Back To Contact'
  return (
    <div style={{ width: '100%' }}>
      <div>
        <DetailsPageAppbar backbtnHandle={backbtnHandle} editHandle={editHandle} backBtn={backBtn} crntPage={crntPage} module={module} />
      </div>
      <div style={{ padding: '10px', marginTop: '5px', display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '65%', paddingBottom: '20px' }}>
          <Card>
            {/* contact Information */}
            <div>
              <div style={{ padding: '20px', borderBottom: '1px solid lightgray', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px', color: 'rgb(26, 51, 83)' }}>
                  Contact Information
                </div>
                <div style={{ color: 'gray', fontSize: '12px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: '15px', textTransform: 'capitalize' }}>
                    created on {formatDate(contactDetails.created_on)} &nbsp;by &nbsp;&nbsp;
                    <span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                      <Avatar
                        src='/broken-image.jpg'
                        style={{
                          height: '20px',
                          width: '20px'
                        }}
                      />
                    </span> &nbsp;&nbsp;
                    {contactDetails && contactDetails.created_by && contactDetails.created_by.user_details.first_name}
                    {contactDetails && contactDetails.created_by && contactDetails.created_by.user_details.last_name}
                  </div>
                  <div>Last update {contactDetails.created_on_arrow}</div>
                </div>
              </div>
              <div style={{ padding: '14px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ width: '32%' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Account Title</div>
                  <div style={{ fontSize: '12px', color: 'gray', display: 'flex', flexDirection: 'row' }}>
                    <div style={{ marginLeft: '5px' }}>
                      <Avatar
                        src='/broken-image.jpg'
                        style={{ height: '20px', width: '20px' }}
                      />
                    </div>
                    <div style={{ marginLeft: '5px' }}>
                      <Avatar
                        src='/broken-image.jpg'
                        style={{
                          height: '20px',
                          width: '20px'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ width: '32%' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>First Name</div>
                  <div style={{ fontSize: '12px', color: 'gray' }}>{contactDetails.first_name}</div>
                </div>
                <div style={{ width: '32%' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Last Name</div>
                  <div style={{ fontSize: '12px', color: 'gray' }}>{contactDetails.last_name}</div>
                </div>
                <div style={{ width: '32%' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Organization Name</div>
                  <div style={{ fontSize: '12px', color: 'gray' }}>{contactDetails.organization}</div>
                </div>
              </div>
              <div style={{ padding: '20px', marginTop: '15px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ width: '32%' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Email Address</div>
                  <div style={{ fontSize: '12px', color: '#1E90FF' }}>
                    <Link>
                      {contactDetails.primary_email}
                      <StarIcon style={{ fontSize: '12px', fill: 'yellow' }} /><br />
                      {contactDetails.secondary_email}
                    </Link>
                  </div>
                </div>
                <div style={{ width: '32%' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Mobile Number</div>
                  <div style={{ fontSize: '12px', color: 'gray' }}>{contactDetails.mobile_number}{<StarIcon style={{ fontSize: '12px', fill: 'yellow' }} />}<br />{contactDetails.secondary_number}</div>
                </div>
                <div style={{ width: '32%' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>website</div>
                  <div style={{ fontSize: '12px', color: 'gray' }}>
                    <Link>https://www.micropyramid.com</Link>
                  </div>
                </div>
              </div>
              <div style={{ padding: '20px', marginTop: '15px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ width: '32%' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Department</div>
                  <div style={{ fontSize: '12px', color: 'gray' }}>{contactDetails.department}</div>
                </div>
                <div style={{ width: '32%' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Language</div>
                  <div style={{ fontSize: '12px', color: 'gray' }}>
                    {contactDetails.language}
                  </div>
                </div>
                <div style={{ width: '32%' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Do Not Call</div>
                  <div style={{ fontSize: '12px', color: 'gray' }}>
                    <AntSwitch checked={contactDetails.do_not_call} inputProps={{ 'aria-label': 'ant design' }} />
                  </div>
                </div>
              </div>
            </div>
            {/* Address details */}
            <div style={{ marginTop: '15px' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid lightgray', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px', color: 'rgb(26, 51, 83)' }}>
                  Address Details
                </div>
              </div>
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px' }}>
                <div style={{ width: '32%' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Address Lane</div>
                  <div style={{ fontSize: '12px', color: 'gray' }}>
                    {newaddress.addreslane}
                  </div>
                </div>
                <div style={{ width: '32%' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Street</div>
                  <div style={{ fontSize: '12px', color: 'gray' }}> {newaddress.street}</div>
                </div>
                <div style={{ width: '32%' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>City</div>
                  <div style={{ fontSize: '12px', color: 'gray' }}>{newaddress.city}</div>
                </div>
              </div>
              <div style={{ padding: '20px', marginTop: '15px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ width: '32%' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Pincode</div>
                  <div style={{ fontSize: '12px', color: 'gray' }}>
                    {newaddress.postcode}
                  </div>
                </div>
                <div style={{ width: '32%' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>State</div>
                  <div style={{ fontSize: '12px', color: 'gray' }}> {newaddress.state}
                  </div>
                </div>
                <div style={{ width: '32%' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'rgb(26, 51, 83)' }}>Country</div>
                  <div style={{ fontSize: '12px', color: 'gray' }}>
                    {newaddress.country}
                  </div>
                </div>
              </div>
            </div>
            {/* Description */}
            <div style={{ marginTop: '15px' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid lightgray', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px', color: 'rgb(26, 51, 83)' }}>
                  Description
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'gray', padding: '10px' }}>
                {contactDetails.description}
              </p>
            </div>
          </Card>
        </div>
        <div style={{ width: '34%', marginLeft: '10px' }}>
          <div>
            <Card>
              <div style={{ padding: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px', color: 'rgb(26, 51, 83)' }}>
                  Social
                </div>
                <div style={{ color: '#3E79F7', fontSize: '14px', fontWeight: 'bold' }}>
                  {/* Add Social #1E90FF */}
                  <Button
                    type='submit'
                    variant='text'
                    size='small'
                    startIcon={<LinkIcon style={{ fill: '#3E79F7' }} />}
                    style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: '13px' }}
                  >
                    Add Socials
                  </Button>
                </div>
              </div>
              <div style={{ paddingLeft: '10px', fontSize: '13px', marginTop: '15px' }}>
                LinkedIn URL
              </div>
              <div style={{ paddingLeft: '10px', paddingBottom: '10px', width: '80%', marginBottom: '10px' }}>
                <div style={{
                  border: '1px solid gray',
                  padding: '7px',
                  borderRadius: '5px',
                  height: '40px',
                  textAlign: 'center'
                }}
                >
                  {contactDetails.linked_in_url}
                </div>
              </div>
              <div style={{ paddingLeft: '10px', fontSize: '13px' }}>
                Facebook URL
              </div>
              <div style={{ paddingLeft: '10px', paddingBottom: '10px', width: '80%', marginBottom: '10px' }}>
                <div style={{
                  border: '1px solid gray',
                  padding: '7px',
                  borderRadius: '5px',
                  height: '40px',
                  textAlign: 'center'
                }}
                >
                  {contactDetails.facebook_url}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
