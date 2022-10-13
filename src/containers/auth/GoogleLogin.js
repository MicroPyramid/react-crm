import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function GoogleLogin (props) {
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    const { clientId, cookiePolicy, loginHint, hostedDomain, fetchBasicProfile, redirectUri, discoveryDocs, onFailure, uxMode } = props;

    ((d, s, id, cb) => {
      const element = d.getElementsByTagName(s)[0]
      const fjs = element
      let js = element
      js = d.createElement(s)
      js.id = id
      js.src = '//apis.google.com/js/client:platform.js'
      fjs.parentNode.insertBefore(js, fjs)
      js.onload = cb
    })(document, 'script', 'google-login', () => {
      const params = {
        client_id: clientId,
        cookiepolicy: cookiePolicy,
        login_hint: loginHint,
        hosted_domain: hostedDomain,
        fetch_basic_profile: fetchBasicProfile,
        discoveryDocs,
        ux_mode: uxMode,
        redirect_uri: redirectUri
      }

      window.gapi.load('auth2', () => {
        setDisabled(false)
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init(params).then(
            () => { },
            err => onFailure(err)
          )
        }
      })
    })
  })

  function signIn (e) {
    if (e) {
      e.preventDefault()
    }
    if (!disabled) {
      const auth2 = window.gapi.auth2.getAuthInstance()
      const { offline, redirectUri, onSuccess, onRequest, fetchBasicProfile, onFailure, prompt, scope, responseType } = props
      const options = {
        response_type: responseType,
        redirect_uri: redirectUri,
        fetch_basic_profile: fetchBasicProfile,
        prompt,
        scope
      }
      onRequest()
      if (offline) {
        auth2.grantOfflineAccess(options)
          .then(
            res => onSuccess(res),
            err => onFailure(err)
          )
      } else {
        auth2.signIn(options)
          .then((res) => {
            const basicProfile = res.getBasicProfile()
            const authResponse = res.getAuthResponse()
            res.googleId = basicProfile.getId()
            res.tokenObj = authResponse
            res.tokenId = authResponse.id_token
            res.accessToken = authResponse.access_token
            res.profileObj = {
              googleId: basicProfile.getId(),
              imageUrl: basicProfile.getImageUrl(),
              email: basicProfile.getEmail(),
              name: basicProfile.getName(),
              givenName: basicProfile.getGivenName(),
              familyName: basicProfile.getFamilyName()
            }
            onSuccess(res)
          }, err =>
            onFailure(err)
          )
      }
    }
  }

  return (
    <button type='button' onClick={signIn} className='primary_btn btn google_btn'>
      <div style={{ padding: '1px', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', cursor: 'pointer', border: 'none' }}>
        <img alt='' src='https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png' width='39px' />
        <p style={{ fontWeight: 'bold' }}>Login With Google</p>
      </div>
      {props.buttonText}
    </button>
  )
}
GoogleLogin.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
  onRequest: PropTypes.func,
  buttonText: PropTypes.string,
  offline: PropTypes.bool,
  scope: PropTypes.string,
  className: PropTypes.string,
  redirectUri: PropTypes.string,
  cookiePolicy: PropTypes.string,
  loginHint: PropTypes.string,
  hostedDomain: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  disabledStyle: PropTypes.object,
  fetchBasicProfile: PropTypes.bool,
  prompt: PropTypes.string,
  tag: PropTypes.string,
  autoLoad: PropTypes.bool,
  disabled: PropTypes.bool,
  discoveryDocs: PropTypes.array,
  responseType: PropTypes.string,
  uxMode: PropTypes.string
}

GoogleLogin.defaultProps = {
  tag: 'button',
  buttonText: 'Login with Google',
  scope: 'profile email',
  responseType: 'permission',
  prompt: '',
  cookiePolicy: 'single_host_origin',
  fetchBasicProfile: true,
  uxMode: 'popup',
  disabledStyle: {
    opacity: 0.6
  },
  onRequest: () => { },
  offline: false
}
export default GoogleLogin
