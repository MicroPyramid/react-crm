import React from 'react'
// import React, { useEffect, useState } from 'react'
import GoogleLogin from './GoogleLogin'
import { SERVER } from '../../components/ApiUrls'

export function Signin (props) {
  const responseGoogle = (data) => {
    if (data.accessToken) {
      const formData = new FormData()
      formData.append('accessToken', data.accessToken)
      fetch(SERVER + 'auth/google/', {
        method: 'post',
        body: formData
      })
        .then(response => response.json())
        .then((response) => {
          if (!response.error) {
            localStorage.setItem('token', response.token)
            localStorage.setItem('id', response.id)
            localStorage.setItem('username', response.employee_name)
            props.LoginSuccess()
          } else {
            alert('Something went wrong. Please Try again!!')
          }
        })
    }
  }

  return (
    <div className='authentication_wrapper'>
      <div className='authentication_block'>
        <div className='buttons'>
          <GoogleLogin
            clientId='639302738050-np85664n6o4rak4pu3q2qk68kkebjvt1.apps.googleusercontent.com'
            buttonText=''
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            // autoLoad={false}
          />
        </div>
      </div>
    </div>
  )
}
