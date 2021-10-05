import { useState, useEffect } from 'react'
import { Card, Row, Col } from 'antd'
import { connect } from 'react-redux'
import { updateUserStatus, getUserDetails } from '../../redux/actions/Users'
import DetailsToolbar from '../../components/ui-components/DetailsToolbar'

export const UserDetails = (props) => {  

  const { userDetails, loading } = props
  
  const [details, setDetails] = useState('')
  const [userStatus, setUserStatus] = useState()

  const id = props.match.params.id    
  
  useEffect(() => {
    props.getUserDetails(`/api/users/${id}/`)
  }, [])

  useEffect(() => {
    setDetails(userDetails.data)
    setUserStatus(userDetails.data && userDetails.data.data.user_obj.is_active)
  }, [loading])
  
  const toggle = (id) => {        
    props.updateUserStatus(id, (!userStatus) ?  'Active' : 'Inactive')
    setUserStatus(!userStatus)
  }  
  return (
    <div className="app-area">      
      <DetailsToolbar module="users" id={id} /> 
      <div className="user-details">
        <div className="est">

          <div className="enable-disable-user">
            <div className="toggle-button d-flex align-items-center">
              <span className="toggle-button-background"></span>              
              <span className="toggle-button-circle" 
                    style={{marginLeft: (userStatus) ? '16px' : '1px'}} 
                    onClick={() => toggle(id)}></span>
              <span className="toggle-button-text">{(userStatus ? 'Enable User' : 'Disable User')}</span>
            </div>
          </div>
          {/* User Details */}
          <div className="details-1">
            <h4>User Details</h4>
            <hr />
            <Row>
              <Col span={12}>
                <p className="name">Name : <span>{userDetails.data && userDetails.data.data.user_obj.username}</span></p>                
                <p className="user-type">User Type: <span>{userDetails.data && userDetails.data.data.user_obj.user_type}</span></p>
                <p className="user-role">User Role:  <span>{userDetails.data && userDetails.data.data.user_obj.role}</span></p>
              </Col>
              <Col span={12}>
                <Row className="email">
                  <Col><p className="label-email">Email:</p></Col>
                  <Col className="email-ids">
                    <p>{userDetails.data && userDetails.data.data.user_obj.email}</p>
                    <p>{userDetails.data && userDetails.data.data.user_obj.alternate_email}</p>
                  </Col>
                </Row>
                <Row className="mobile">
                  <Col><p className="label-mobile">Mobile:</p></Col>
                  <Col className="mobile-nums">
                    <p>{userDetails.data && userDetails.data.data.user_obj.phone}</p>
                    <p>{userDetails.data && userDetails.data.data.user_obj.alternate_phone}</p>
                  </Col>
                </Row>
                <p className="skype">Skype ID: <span>{userDetails.data && userDetails.data.data.user_obj.skype_ID}</span></p>
              </Col>
            </Row>            
          </div>
          {/* Address Details */}
          <div className="details-address">
            <h4>Address Details</h4>
            <hr />
            <Row>
              <Col span={12}>
                <p className="addresslane">Address Lane: <span>{userDetails.data && userDetails.data.data.user_obj.address.address_line}</span></p>
                <p className="state">State: <span>{userDetails.data && userDetails.data.data.user_obj.address.state}</span></p>
                <p className="pincode">Pincode: <span>{userDetails.data && userDetails.data.data.user_obj.address.postcode}</span></p>                
              </Col>
              <Col span={12}>
                <p className="street">Street: <span>{userDetails.data && userDetails.data.data.user_obj.address.street}</span></p>
                <p className="city">City: <span>{userDetails.data && userDetails.data.data.user_obj.address.city}</span></p>
                <p className="country">Country: <span>{userDetails.data && userDetails.data.data.user_obj.address.country}</span></p>
              </Col>
            </Row>
          </div>
          {/* Description Details */}
          <div className="details-description">
            <h4>Description Details</h4>
            <hr />
            <Row>
              <Col span={4}><p className="description">Description:</p></Col>
              <Col span={20}><p className="description-text">{userDetails.data && userDetails.data.data.user_obj.description}</p></Col>
            </Row>
          </div>


          </div>        
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {    
  const { loading, userDetails } = state.users  
  return { loading, userDetails }
}

const mapDispatchToProps = {
  updateUserStatus,
  getUserDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
