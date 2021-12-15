import React from 'react';
import { Link } from 'react-router-dom'

export default function ForgotPasswordDone() {
  
  return (
    <div className="mt-5 text-center">
      <h2>We emailed the instrcutions to your email.</h2>
      <p><Link to="/login">Login</Link></p>
    </div>    
  )
}
