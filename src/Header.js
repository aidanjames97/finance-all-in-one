import profile from "./Pics/user.png"
import "./Styles/Header.css"
import { Link } from "react-router-dom";
import { useState } from "react";
import reload from "./Pics/reload.svg"

function Header({ setReload, toReload, setBlurBack, setFromWhat }) {
    const [active, setActive] = useState('Home')  

  return (
    <div className='Header'>
        <div className='header-image-container'>
            <button onClick={() => setReload(!toReload)}>
                <img alt="reload" src={reload} width='35px' height='35px' />
            </button>
        </div>
        <HeaderButtons active={active} setActive={setActive} />
        <div className='header-profile-container'>
            <button onClick={() => {setBlurBack(true); setFromWhat('profile')}}>
                <img src={profile} alt="profile alt" width='35px' height='35px' />
            </button>
        </div>
    </div>
  )
}
export default Header

function HeaderButtons({ active, setActive }) {
    const handleClick = (txt) => {
        setActive(txt)
    }

    return (
        <div className='header-buttons-container'>
            <Link 
                className={`links-${active === 'Home' ? 'active' : ''}`}
                to='/'
                onClick={() => handleClick('Home')}
            >
            Home
            </Link>
            <Link 
                className={`links-${active === 'Spending' ? 'active' : ''}`} 
                to='/Spending'
                onClick={() => handleClick('Spending')}
            >
            Spending
            </Link>
            <Link 
                className={`links-${active === 'Saving' ? 'active' : ''}`} 
                to='/Saving'
                onClick={() => handleClick('Saving')}
            >
            Saving
            </Link>
            <Link 
                className={`links-${active === 'Investments' ? 'active' : ''}`} 
                to='/Investments'
                onClick={() => handleClick('Investments')}
            >
            Investments
            </Link>
        </div>
    );
}