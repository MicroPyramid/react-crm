import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Card,
  Link,
  Avatar
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

import { fetchData } from '../../components/FetchData'
import { accountUrl } from '../../components/ApiUrls'
import { Tags } from '../../components/Tags'
import { DetailsPageAppbar } from '../../components/DetailsPageAppbar'

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

export const AccountDetails = (props) => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [accountData, setAccountData] = useState([])

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `jwt ${localStorage.getItem('Token')}`,
    org: localStorage.getItem('org')
  }

  useEffect(() => {
    fetchData(`${accountUrl}/${state.accounts}/`, 'GET', null, headers)
      .then((data) => {
        if (!data.error) {
          setAccountData(...accountData, {
            account_obj: data.account_obj,
            user_details: data.account_obj.created_by.user_details,
            tags: data.account_obj.tags,
            account_id: data.account_obj.id,
            lead: data.account_obj.lead,
            teams: data.account_obj.teams
          })
        }
        // if (data.error) {
        // }
      })
      .catch(() => {
      })
  }, [])

  const editHandle = () => {
    navigate('/accounts/account-edit',
      {
        state: {
          account_id: accountData.account_id,
          accounts: accountData.account_obj
        }
      }
    )
  }

  const backbtnHandle = () => {
    navigate('/accounts')
  }

  const module = 'Account'
  const crntPage = 'Account Title'
  const backBtn = 'Back To Account'

  return (
    <div style={{ width: '100%' }}>
      <div>
        <DetailsPageAppbar backbtnHandle={backbtnHandle} editHandle={editHandle} backBtn={backBtn} crntPage={crntPage} module={module} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <div style={{ width: '65%', height: '100% ' }}>
          <Card>
            {/* account Information */}
            <div>
              <div style={{
                padding: '10px',
                borderBottom: '1px solid lightgray',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
              >
                <div style={{
                  fontWeight: 'bold',
                  fontSize: '14px',
                  color: 'rgb(26, 51, 83)',
                  justifyContent: 'center',
                  textAlign: 'center',
                  paddingTop: '20px'
                }}
                >
                  Account Information
                </div>
                <div style={{
                  color: 'gray',
                  fontSize: '12px',
                  display: 'flex',
                  flexDirection: 'row',
                  paddingTop: '20px'
                }}
                >
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      created on &nbsp;
                      {formatDate(accountData.account_obj && accountData.account_obj.created_on ? accountData.account_obj.created_on : '---')}
                      &nbsp; by   &nbsp;
                      {
                        accountData.user_details && accountData.user_details.profile_pic
                          ? accountData.user_details.profile_pic
                          : <span style={{ display: 'flex', flexDirection: 'row' }}>
                            <Avatar
                              src='/broken-image.jpg'
                              style={{
                                height: '20px',
                                width: '20px'
                              }}
                            />&nbsp;
                          &nbsp;
                            {
                            accountData.user_details &&
                            accountData.user_details.first_name
                              ? accountData.user_details.first_name
                              : 'Ashwin Kumar'
                          }
                          &nbsp; &nbsp;
                          </span>
                      }
                    </div>
                    <div>
                      Last Updated:---
                      {/* {formatDate(accountData.account_obj && accountData.account_obj.created_on ? accountData.account_obj.created_on : "---")} */}
                      days ago
                    </div>
                  </div>
                </div>
              </div>
              <div style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'row',
                marginTop: '10px'
              }}
              >
                <div style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: 'rgb(26, 51, 83)',
                  marginRight: '2px'
                }}
                >
                  Account Title
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-4px' }}>
                  {
                   accountData.tags && accountData.tags
                     ? accountData.tags.map((tagData, index) => (
                       <Tags key={index} tags={tagData} />
                     ))
                     : ' '
                  }
                </div>
              </div>
              <div style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
              >
                <div style={{ width: '32%' }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'rgb(26, 51, 83)'
                  }}
                  >
                    Website
                  </div>
                  <div style={{ fontSize: '12px', color: '#1A3353' }}>
                    {
                      accountData.account_obj &&
                      accountData.account_obj.website
                        ? accountData.account_obj.website
                        : '---'
                    }
                  </div>
                </div>
                <div style={{ width: '32%' }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'rgb(26, 51, 83)'
                  }}
                  >
                    Contact Name
                  </div>
                  <div style={{ fontSize: '12px', color: '#1A3353' }}>
                    {
                      accountData.account_obj &&
                      accountData.account_obj.contact_name
                        ? accountData.account_obj.contact_name
                        : '---'
                    }
                  </div>
                </div>
                <div style={{ width: '32%' }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'rgb(26, 51, 83)'
                  }}
                  >
                    Organization Name
                  </div>
                  <div style={{ fontSize: '12px', color: '#1A3353' }}>
                    {
                      accountData.account_obj && accountData.account_obj.organization_name
                        ? accountData.account_obj.organization_name
                        : '---'
                    }
                  </div>
                </div>
              </div>
              <div style={{
                padding: '20px',
                marginTop: '15px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
              >
                <div style={{ width: '32%' }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'rgb(26, 51, 83)'
                  }}
                  >
                    Industry
                  </div>
                  <div style={{ fontSize: '12px', color: '#1A3353' }}>
                    {
                      accountData.account_obj && accountData.account_obj.industry
                        ? accountData.account_obj.industry
                        : '---'
                    }
                  </div>
                </div>
                <div style={{ width: '32%' }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'rgb(26, 51, 83)'
                  }}
                  >
                    Leads
                  </div>
                  <div style={{ fontSize: '12px', color: '#1A3353' }}>
                    {
                        accountData.account_obj && accountData.account_obj.lead
                          ? accountData.account_obj.lead.title
                          : '---'
                      }
                  </div>
                </div>
                <div style={{ width: '32%' }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'rgb(26, 51, 83)'
                  }}
                  >
                    Teams
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#1A3353',
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                  >
                    {
                        accountData.teams &&
                        accountData.teams
                          ? accountData.teams.map((v) =>
                            <div style={{
                              background: 'rgb(0 0 0 / 12%)',
                              width: 'fit-content',
                              borderRadius: '3px',
                              padding: '1px 6px',
                              margin: '2px'
                            }}
                            >
                              {v.name}
                            </div>
                          )
                          : '---'
                      }
                  </div>
                </div>
              </div>
              <div style={{
                padding: '20px',
                marginTop: '15px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
              >
                <div style={{ width: '32%' }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'rgb(26, 51, 83)'
                  }}
                  >
                    Email Address
                  </div>
                  <div style={{ fontSize: '12px', color: '#1A3353' }}>
                    <Link>
                      {accountData.account_obj && accountData.account_obj.email ? accountData.account_obj.email : '---'}
                      <StarIcon style={{ fontSize: '12px', fill: 'yellow' }} />
                    </Link>
                  </div>
                </div>
                <div style={{ width: '32%' }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'rgb(26, 51, 83)'
                  }}
                  >
                    Mobile Number
                  </div>
                  <div style={{ fontSize: '12px', color: '#1A3353' }}>
                    {accountData.account_obj && accountData.account_obj.phone ? accountData.account_obj.phone : '---'}
                    <StarIcon style={{ fontSize: '12px', fill: 'yellow' }} />
                  </div>
                </div>
                <div style={{ width: '32%' }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'rgb(26, 51, 83)'
                  }}
                  >
                    Skype ID
                  </div>
                  <div style={{ fontSize: '12px', color: '#1A3353' }}>
                    <Link>
                      {accountData.account_obj && accountData.account_obj.skype_ID ? accountData.account_obj.skype_ID : '---'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Address Details */}
            <div style={{ marginTop: '15px', maxHeight: '75%' }}>
              <div style={{
                padding: '20px',
                borderBottom: '1px solid lightgray',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
              >
                <div style={{
                  fontWeight: 'bold',
                  fontSize: '14px',
                  color: 'rgb(26, 51, 83)'
                }}
                >
                  Address Details
                </div>
              </div>
              <div style={{
                padding: '20px',
                marginTop: '15px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
              >
                <div style={{ width: '32%' }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'rgb(26, 51, 83)'
                  }}
                  >
                    Address Lane
                  </div>
                  <div style={{ fontSize: '12px', color: '#1A3353' }}>
                    {accountData.account_obj && accountData.account_obj.billing_address_line ? accountData.account_obj.billing_address_line : '---'}
                  </div>
                </div>
                <div style={{ width: '32%' }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'rgb(26, 51, 83)'
                  }}
                  >
                    Street
                  </div>
                  <div style={{ fontSize: '12px', color: '#1A3353' }}>
                    {
                     accountData.account_obj && accountData.account_obj.billing_street ? accountData.account_obj.billing_street : '---'
                    }
                  </div>
                </div>
                <div style={{ width: '32%' }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'rgb(26, 51, 83)'
                  }}
                  >
                    City
                  </div>
                  <div style={{ fontSize: '12px', color: '#1A3353' }}>
                    {
                      accountData.account_obj && accountData.account_obj.billing_city ? accountData.account_obj.billing_city : '---'
                    }
                  </div>
                </div>
              </div>
              <div style={{
                padding: '20px',
                marginTop: '15px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
              >
                <div style={{ width: '32%' }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'rgb(26, 51, 83)'
                  }}
                  >
                    Pincode
                  </div>
                  <div style={{ fontSize: '12px', color: '#1A3353' }}>
                    {
                      accountData.account_obj && accountData.account_obj.billing_postcode ? accountData.account_obj.billing_postcode : '---'
                    }
                  </div>
                </div>
                <div style={{ width: '32%' }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'rgb(26, 51, 83)'
                  }}
                  >
                    State
                  </div>
                  <div style={{ fontSize: '12px', color: '#1A3353' }}>
                    {
                     accountData.account_obj && accountData.account_obj.billing_state ? accountData.account_obj.billing_state : '---'
                    }
                  </div>
                </div>
                <div style={{ width: '32%' }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'rgb(26, 51, 83)'
                  }}
                  >
                    Country
                  </div>
                  <div style={{ fontSize: '12px', color: '#1A3353' }}>
                    {accountData.account_obj && accountData.account_obj.billing_country ? accountData.account_obj.billing_country : '---'}
                  </div>
                </div>
              </div>
            </div>
            {/* Description */}
            <div style={{ marginTop: '15px', maxHeight: '75%' }}>
              <div style={{
                padding: '20px',
                borderBottom: '1px solid lightgray',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
              >
                <div style={{
                  fontWeight: 'bold',
                  fontSize: '14px',
                  color: 'rgb(26, 51, 83)'
                }}
                >
                  Description
                </div>
              </div>
              <div style={{ height: '250px' }}>
                <p style={{ fontSize: '13px', color: '#1A3353', padding: '10px' }}>
                  {
                   accountData.account_obj && accountData.account_obj.description ? accountData.account_obj.description : '---'
                  }
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
