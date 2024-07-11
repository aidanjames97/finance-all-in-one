import React, { useState } from 'react'
import logo from "./logo.png"
import profile from "./user.png"
import "./Header.css"

function Header({ active }) {
  return (
    <div className='Header'>
        <div className='header-image-container'>
            <img src={logo} alt="logo alt" />
        </div>
        <HeaderButtons active={active} />
        <div className='header-profile-container'>
            <img src={profile} alt="profile alt" />
        </div>
    </div>
  )
}
export default Header

function HeaderButtons({ active }) {
    const [localActive, setActive] = useState(active)

    function handleClick(text) {
        setActive(text)
    }

    return (
        <div className='header-buttons-container'>
            <HeaderButton text='Home' active={localActive} handleClick={handleClick}/>
            <HeaderButton text='Spending' active={localActive} handleClick={handleClick}/>
            <HeaderButton text='Saving' active={localActive} handleClick={handleClick}/>
            <HeaderButton text='Investments' active={localActive} handleClick={handleClick}/>
        </div>
    )
}

function HeaderButton({ text, active, handleClick }) {
    let yes = false
    if(active === text) {
        yes = true
    }

    if(yes){
        return (
            <div className='button-col'>
                <button href='#'>{text}</button>
                <span className='active'></span>
            </div>
        )
    } else {
        return (
            <div className='button-col'>
                <button onClick={() => handleClick(text)} href='#'>{text}</button>
                <span className='inactive'></span>
            </div>
        )
    }
}