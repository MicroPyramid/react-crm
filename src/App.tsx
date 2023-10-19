import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './pages/auth/Login';
import { Home } from './pages/home/Home';
import LeadList from './pages/leads/Leads';
import { AddLeads } from './pages/leads/AddLeads';
import Contacts from './pages/contacts/Contacts';
// import Organization from './pages/company/Company';
import LeadDetails from './pages/leads/LeadDetails';
import AddContacts from './pages/contacts/AddContacts';

function App() {
  // const isLoggedIn = !!localStorage.getItem('Token');
  // const hasSelectedOrg = !!localStorage.getItem('org');
  // const location = useLocation();
  // const [isLoggedIn, setIsLoggedIn] = useState(false)

  // useEffect(() => {
  //   if (localStorage.getItem('Token')) {
  //     setIsLoggedIn(true)
  //   }
  // }, [isLoggedIn])
  // console.log(location.pathname,'app');
  // console.log(localStorage.getItem('Token'),'tt')
  // console.log(isLoggedIn, hasSelectedCompany, 'app')
  return (
    <>
      <Router>
        <Routes>
          {/* <Route
            path='/'
            element={
              isLoggedIn ? (hasSelectedCompany ? (<Home />) : (<Navigate to='/company' />)) : (<Login />)
            }
          /> */}
          {/* <Route path='*' element={isLoggedIn ? <Home /> : <Login />} /> */}
          {/* <Route path='*' element={<Home />} /> */}
          {/* <Route path='/' element={<Home />} >
            <Route path='/leads' element={<LeadList />} />
            <Route path='/leads/add-leads' element={<AddLeads />} />
            <Route path='/contacts' element={<Contacts />} />
            <Route path='/contacts/add-contacts' element={<AddContacts />} />
          </Route> */}
          <Route path="*" element={<Home/>} />
          <Route path="/app" element={<Home/>} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/organization' element={<Organization />} /> */}
        {/* <Route path="/" element={<Navigate to="/contacts" replace />} /> */}
          {/* <Route
            path='/'
            element={isLoggedIn ? <Home /> : <Login />
            // <Navigate to='/login' />
          }
          >
            <Route path='/leads' element={<LeadList />} />
            <Route path='/leads/add-leads' element={<AddLeads />} />
            <Route path='/contacts' element={<Contacts />} />
          </Route> */}

        </Routes>
      </Router>
    </>
  );
}

export default App;
