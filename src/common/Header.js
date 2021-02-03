import React from 'react';
import { Link } from 'react-router-dom';

function Header() {  
  // const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const currentPage= window.location.pathname.split('/')[2];
  // console.log(currentPage.split('/')[2]);
  const id = window.location.pathname.split('/')[2];

  return (
    <header>
      {localStorage.getItem('Token') 
      ?
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
          <div className="dropdown">
            <a 
              href="/#"
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
              <a className="dropdown-item" href="/marketing">Marketing</a>
            </div>
          </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <svg className="svg-inline--fa fa-bars fa-w-14" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
            <path  fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
          </svg>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className={`text-capitalize${(currentPage === '/dashboard') ? 'nav-link active' : 'nav-link'}`} id="dashboard" to={'/dashboard'}>Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className={`text-capitalize ${(currentPage === '/accounts'|| currentPage === '/accounts/create/' || currentPage === `/accounts/${id}/edit/` || currentPage === `/accounts/${id}/view/` )? 'nav-link active' : 'nav-link'}`} id="accounts" to={'/accounts'}>Accounts</Link>
            </li>
            <li className="nav-item">
              <Link className={`text-capitalize ${(currentPage === '/contacts' || currentPage === '/contacts/create/' || currentPage === `/contacts/${id}/edit/` || currentPage === `/contacts/${id}/view/`) ? 'nav-link active' : 'nav-link'}`} id="contacts" to={'/contacts'}>Contacts</Link>
            </li>
            <li className="nav-item">
              <Link className={`text-capitalize ${(currentPage === '/leads' || currentPage === '/leads/create/' || currentPage === `/leads/${id}/edit/` || currentPage === `/leads/${id}/view/`) ? 'nav-link active' : 'nav-link'}`} id="leads" to={'/leads'}>Leads</Link>                            
            </li>
            <li className="nav-item">
              <Link className={`text-capitalize ${(currentPage === '/opportunities') ? 'nav-link active' : 'nav-link'}`} id="opportunities" to={'/opportunities'}>Opportunities</Link>
            </li>
            <li className="nav-item">              
              <Link className={`text-capitalize ${(currentPage === '/cases') ? 'nav-link active' : 'nav-link'}`} id="cases" to={'/cases'}>Cases</Link>
            </li>
            <li className="nav-item">
              <Link className={`text-capitalize ${(currentPage === '/documents' || currentPage === '/documents/create/' || currentPage === `/documents/${id}/edit/` || currentPage === `/socuments/${id}/view/`) ? 'nav-link active' : 'nav-link'}`} id="documents" to={'/documents'}>Documents</Link>
            </li>
            <li className="nav-item">
              <Link className={`text-capitalize ${(currentPage === '/tasks') ? 'nav-link active' : 'nav-link'}`} id="tasks" to={'/tasks'}>Tasks</Link>
            </li>
            <li className="nav-item">
              <Link className={`text-capitalize ${(currentPage === '/invoices') ? 'nav-link active' : 'nav-link'}`} id="invoices" to={'/invoices'}>Invoices</Link>
            </li>
            <li className="nav-item">
              <Link className={`text-capitalize ${(currentPage === '/events') ? 'nav-link active' : 'nav-link'}`} id="events" to={'/events'}>Events</Link>
            </li>
            <li className="nav-item">
              <Link className={`text-capitalize ${(currentPage === '/teams') ? 'nav-link active' : 'nav-link'}`} id="teams" to={'/teams'}>Teams</Link>
            </li>
          </ul>
          <ul className="navbar-nav navbar-right my-2 my-lg-0 cursor-pointer settings__ul">
            <a href="/#" className="dropdown-toggle" type="button" data-toggle="dropdown">
              <img src="https://bottlecrm.s3.amazonaws.com/images/user.png" alt="Micro profile pic"/>
              <b className="caret"></b>
            </a>
            <div className="dropdown-menu dropdown-menu-right rounded-0 mr-2" aria-labelledby="navbarDropdown">
                <a href="/#" className="dropdown-item text-secondary py-2 pl-2">Users</a>
                <a href="/#" className="dropdown-item text-secondary py-2 pl-2">Settings</a>
                <a href="/#" className="dropdown-item text-secondary py-2 pl-2">Change Password</a>
                <a href="/#" className="dropdown-item text-secondary py-2 pl-2">Profile</a>
                <a href="/app" onClick={() => {
                  localStorage.clear();
                  const redirectUrl = `//bottlecrm.com/validate-domain`;
                  window.location.href = redirectUrl;
                }} 
                  className="dropdown-item text-secondary py-2 pl-2"
                >
                  Logout
                </a>
              </div>
          </ul>
          
        </div>
        </nav>
      :
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top py-2">
          <a href="/app" className="navbar-brand">bottlecrm</a>
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
        </nav>            
        }
        </header>
    )
}

export default Header;
