// 'use client'
import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Typography
} from '@mui/material'

export const UserDetails = (props:any) => {
  const [user, setUser] = useState([])

  useEffect(() => {
    setUser(props.created_by.user_details)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Typography>
        {/* {
          user?.profile_pic
            ? user?.profile_pic
            : <Avatar
                src='/broken-image.jpg'
                style={{
                  height: '30px',
                  width: '30px'
                }}
              />
        } */}
      </Typography>
      {/* <Typography> &nbsp; &nbsp;{user?.first_name ? user?.first_name : '--'}</Typography> */}
    </div>
  )
}
