import React, { useState } from 'react'
import { Link, animateScroll as scroll } from 'react-scroll';
import { auth } from './API/Firebase';
import Home from "./Pics/home.png"
import Info from "./Pics/information.png"
import Service from "./Pics/services.png"
import Github from "./Pics/github.png"
import sLine from "./Pics/goeLogo.png"
import Web from "./Pics/world-wide-web.png"
import './Styles/Navbar.css'

// for date display
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const date = new Date()

const Navbar = ({ signIn, user, setUser, handleSlide, setAccessPage, setIsVisible, setMenuHint }) => {
    const [displayMenu, setDisplayMenu] = useState(false)
  
    return (
      <nav className='Navbar'>
        {displayMenu ? (
          <div className={`navbar-dropdown ${displayMenu ? 'drop-down' : 'pull-up'}`}>
            <span className='top-dropdown-span'></span>
            {user ? (
              <button 
                className='dropdown-button-top'
                onClick={() => auth.signOut().then(() => {setUser(null); handleSlide(); setDisplayMenu(false)})}
              >Sign Out</button>
            ) : (
              <button className='dropdown-button-top' onClick={() => signIn()}>Sign In</button>
            )}
            <span className='middle-dropdown-span'></span>
            {user ? (
              <button 
                className='dropdown-button-bottom'
                onClick={() => { setAccessPage(true); setIsVisible(false); setDisplayMenu(false) }}
              >Dashboard</button>
            ) : (
              <button 
                className='dropdown-button-bottom' 
                onClick={() => { signIn().then(() => { setAccessPage(true); setIsVisible(false); setDisplayMenu(false) }) }}
              >Dashboard</button>
            )}
          </div>
        ) : (
          <></>
        )}
          <div className='navbar-grid-wrapper'>
              <div className='navbar-left-buttons'>
                  <Link className="navButton"
                    to="home" // section name
                    smooth={true} // smooth scroll
                    duration={500} // 500ms
                  >
                    <img style={{width: '25px'}} src={Home} alt='Home' />
                  </Link>
                  <Link className="navButton"
                    to="about" // section name
                    smooth={true} // smooth scroll
                    duration={500} // 500ms
                  >
                    <img style={{width: '25px'}} src={Info} alt='Home' />
                  </Link>
                  <Link className="navButton"
                    to="services" // section name
                    smooth={true} // smooth scroll
                    duration={500} // 500ms
                  >
                    <img style={{width: '25px'}} src={Service} alt='Home' />
                  </Link>
                  <span style={{
                      background: '#7950F2',
                      width: '1px', 
                      height: '60%',
                      margin: '0 10px'
                  }}></span>
                  <a href='https://github.com/aidanjames97' className='navButton'>
                    <img style={{width: '25px'}} src={Github} alt='Home' />
                  </a>
                  <a href='https://aidanjames.ca/' className='navButton'>
                  <img style={{width: '25px'}} src={Web} alt='Home' />
                  </a>
                  <span style={{
                      background: '#7950F2', 
                      width: '1px', 
                      height: '60%',
                      margin: '0 10px'
                  }}></span>
                  <div className='navbar-date'>
                      <h2>{date.getFullYear()}</h2>
                      <h1>{months[date.getMonth()]} {date.getDate()}</h1>
                  </div>
              </div>
              <div className='empty-middle'></div>
              <div className='navbar-right-button'>
                <button 
                  className={`navbar-logo-button ${displayMenu ? 'spin-change' : 'spin-original'}`} 
                  onClick={() => { setDisplayMenu(!displayMenu); setMenuHint(false)}}>
                  <img src={sLine} alt='logo' />
                </button>
              </div>
          </div>
      </nav>
    )
  }

export default Navbar