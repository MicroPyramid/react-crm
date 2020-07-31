import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [userMenu, setUserMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  return (
    <header>
      {localStorage.getItem('Token') 
      ?
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="dropdown">
          <a 
            className="dropdown-toggle navbar-brand"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{ color: '#44535c' }}
          >
            bottlecrm
          </a>
          <div className="dropdown-menu mt-2" aria-labelledby="dropdownMenuLink">
            <a className="dropdown-item" href="/">Sales</a>
            <a className="dropdown-item" href="/marketing/">Marketing</a>
          </div>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <svg className="svg-inline--fa fa-bars fa-w-14" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
            <path 
              fill="currentColor"
              d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
            >
            </path>
          </svg>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className={currentPage === '/dashboard' ? 'nav-link active' : 'nav-link'} onClick={() => setCurrentPage('/dashboard')} id="dashboard" to={'/dashboard'}>Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className={currentPage === '/accounts' ? 'nav-link active' : 'nav-link'} onClick={() => setCurrentPage('/accounts')} id="accounts" to={'/accounts'}>Accounts</Link>
            </li>
            <li className="nav-item"><a className="nav-link" id="contacts">Contacts</a></li>
            <li className="nav-item"><a className="nav-link" id="leads">Leads</a></li>
            <li className="nav-item"><a className="nav-link" id="opportunities">Opportunities</a>
            </li>
            <li className="nav-item"><a className="nav-link" id="cases">Cases</a></li>
            <li className="nav-item"><a className="nav-link" id="documents">Documents</a></li>
            <li className="nav-item"><a className="nav-link" id="tasks">Tasks</a></li>
            <li className="nav-item"><a className="nav-link" id="invoices">Invoices</a></li>
            <li className="nav-item"><a className="nav-link" id="events">Events</a></li>
            <li className="nav-item"><a className="nav-link" id="teams">Teams</a></li>
          </ul>
          <ul className="navbar-nav navbar-right my-2 my-lg-0">
            <li className="nav-item dropdown">
              <a onClick={() => setUserMenu(!userMenu)} className="dropdown-toggle abcd nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                <img src="https://bottlecrm.s3.amazonaws.com/images/user.png" alt="Micro profile pic" />
                <b className="caret"></b>
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown" style={{ display: userMenu ? 'block' : 'none' }}>
                <a className="dropdown-item">Users</a>
                <a className="dropdown-item">Settings</a>
                <a className="dropdown-item">Change Password</a>
                <a className="dropdown-item">Profile</a>
                <a onClick={() => {
                  localStorage.clear()
                  const redirectUrl = `//bottlecrm.com/validate-domain`
                  window.location.href = redirectUrl;
                }} 
                  className="dropdown-item"
                >
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
        </nav>
      :
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
          <a className="navbar-brand">bottlecrm</a>
          <button 
            className="navbar-toggler"
            type="button" data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto my-2 my-lg-0">
              <li className="nav-item">
                <Link 
                  className="nav-link active" 
                  id="dashboard" 
                  to={'/validate-domain'}
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      }
    </header>
  )
}

export default Header;
