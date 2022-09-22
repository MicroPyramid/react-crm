import React, { useEffect , useState } from 'react';
import GoogleLogin from './GoogleLogin';

export function Signin (props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    if (isLoading) {
      return null
    }
  })

  function responseGoogle(data) {
    if (data.accessToken) {
      const formData = new FormData()
      formData.append('accessToken', data.accessToken)
      fetch("https://api.bottle-dev.com/api/auth/google/", {
        method: 'post',
        body: formData
      })
      .then(response => response.json())
      .then((response) => {
        if (!response.error) {
          const token = response.token
          localStorage.setItem('token', token)
          localStorage.setItem('id', response.id)
          localStorage.setItem('username', response.employee_name)
          props.LoginSuccess();
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
              autoLoad={false}
            />
          </div>
        </div>
      </div>
    )
}
