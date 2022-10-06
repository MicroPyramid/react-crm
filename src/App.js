import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Registration } from './containers/auth/Register'
import { LogIn } from './containers/auth/Login'
import { ForgotPassword } from './containers/auth/ForgotPassword'
import { Home } from './containers/Home/Home'

function App () {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='*' element={<Home />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />

        </Routes>
      </Router>
    </div>
  )
}

export default App
