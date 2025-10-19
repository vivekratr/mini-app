import React from 'react'
import "../styles/Navbar.css"
import { NavLink } from 'react-router-dom'

const Navbar = ({handleLogout}) => {
  return (
    <nav className='navbar-container'>
          <div className="navbar-left">
              <img style={{width: "56px", height: "auto", objectFit:'cover'}} src="https://storage.123fakturera.se/public/icons/diamond.png" alt="Logo"  />
          </div>
          <div className="navbar-right">
             <div className="navbar-links">
                  <NavLink
                      to="/"
                      className={`white-text`}
                  >
                      <p>
                          
                      Home
                      </p>
                  </NavLink>
                  <NavLink
                      to="/"
                      className={`white-text`}

                  >
                      Order
                  </NavLink>
                  <NavLink
                      to="/"
                      className={`white-text`}

                  >
                      Our Customers
                  </NavLink>

                  <NavLink
                      to="/"
                      className={`white-text`}

                  >
                      About us
                  </NavLink>
                  <NavLink
                      to="/term"
                      className={`white-text`}
                  >
                      Terms
                  </NavLink>
                
              </div>
              <div className="navbar-lang ">
                  <p>English</p>
                  <img className='flag-icon' src="https://storage.123fakturere.no/public/flags/GB.png" alt="English" />
              </div>
          </div>
    </nav>
  )
}

export default Navbar
