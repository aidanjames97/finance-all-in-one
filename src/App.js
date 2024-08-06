import './Styles/App.css';
import React, { useState, useEffect } from "react"
import SignedIn from "./SignedIn"
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './API/Firebase';
import Mesh from "./Pics/backMesh.png"
import { Link, animateScroll as scroll } from 'react-scroll';
import sLine from "./Pics/goeLogo.png"
import Home from "./Pics/home.png"
import Info from "./Pics/information.png"
import Service from "./Pics/services.png"
import Github from "./Pics/github.png"
import Web from "./Pics/world-wide-web.png"
import LinkedIn from "./Pics/linkedin.png"
import ReactLogo from "./Pics/react.png"
import FireLogo from "./Pics/firebase.png"
import AxiosLogo from "./Pics/axios.png"
import Chart from "./Pics/chart.png"
import ChartGold from "./Pics/chartGold.png"
import ChartPlat from "./Pics/chartPlat.png"
import BackWavy from "./Pics/backWavy.png"
import Flaticon from "./Pics/flaticon.png"
import Hexagon from "./Pics/hexagon.png"

// for date display
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const date = new Date()

const App = () => {
  // user from google sign in 
  const [user, setUser] = useState(null);
  // for services to display different graphs
  const [outText, setOutText] = useState('plat')
  // wheither section has been viewed or not
  const [sectionViewed, setSectionViewed] = useState({
    home: true,
    about: false,
    services: false,
  });

  useEffect(() => {
    const sections = ['home', 'about', 'services'];

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setSectionViewed(prevState => ({
            ...prevState,
            [entry.target.id]: true
          }));
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25 // fades when section 25% visible
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach(section => {
      const target = document.getElementById(section);
      if (target) {
        observer.observe(target);
      }
    });

    return () => observer.disconnect();
  }, []);

  // to store each section which has been viewed
  useEffect(() => {
    localStorage.setItem('sectionViewed', JSON.stringify(sectionViewed));
  }, [sectionViewed]);

  // reading which sections have been viewed
  useEffect(() => {
    const storedSectionViewed = JSON.parse(localStorage.getItem('sectionViewed'));
    if (storedSectionViewed) {
      setSectionViewed(storedSectionViewed);
    }
  }, []);

  // simulated delay so page appears to load and fade in
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);

    }, 1); // 1ms delay (can be increaed to simulate loading)

    return () => clearTimeout(timeout);
  }, []);

  // runs when user clicks "sign in with google" button
  const signIn = () => {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
      setUser(result.user)
    })
    .catch((error) => {
      alert("Error with login: " + error)
      console.log(error)
    })
  }

  // user is signed in, access their profile
  if(user) {
    return (
      <SignedIn user={user} setUser={setUser} />
    );
  }

  // user is not signed in at this point (welcome)
  return (
    <div className={`App-welcome-before ${isLoaded ? 'App-welcome' : ''}`}>
      <div className='welcome-navbar'>
        <Navbar />
      </div>
      <Section id='home' isViewed={sectionViewed.home}>
        <div className='welcome-items-container'>
        <div className='back-mesh-fade'>
          <img className='back-mesh' src={Mesh} alt='back' />
        </div>
        <div className='welcome-items'>
          <div className='welcome-text'>
            <h1>
              With up to date information and 
              world-class data visualization tools, 
              take control of your personal 
              finances with FinMe.
            </h1>
          </div>
          <div className='welcome-button-container'>
            <button onClick={() => signIn()}>Sign In With Google</button>
          </div>
        </div>
        </div>
      </Section>
      <Section id='about' isViewed={sectionViewed.about}>
        <div className='about-right-icon'>
          <img className='logo' src={sLine} alt='logo' />
          <img className='hexagon' src={Hexagon} alt='hexagon' />
        </div>
        <div className='welcome-about'>
        <div className='about-text'>
          <div className='about-text-header'>
            <h1>Why FinMe?</h1>
          </div>
        <b>
          FinMe allows you to connect your banking information, enabling you to see your broader spending and saving habits. Coupled with saving and spending goals, you will be financially stable in no time!
          Banking is only half of the picture, as FinMe also allows users to seamlessly add their investments for simplified but powerful data visualizations to help better manage your money.
          With our award winning customer support and security, you’ll always have access to to your information quickly and safely anywhere in the world!
        </b>
        <div className='explore-button-container'>
          <Link className="explore-button"
            to="services" // section name
            smooth={true} // smooth scroll
            duration={500} // 500ms
          >
            <h2>Start Today!</h2>
          </Link>
        </div>
        </div>
        </div>
      </Section>
      <Section id='services' isViewed={sectionViewed.services}>
        <div className='welcome-services'>
          <div className='back-mesh-two-back'>
            <img className='back-mesh-two' src={BackWavy} alt='back' />
          </div>
          <div className='services-left-graphic'>
            {outText === 'gold' ? (
              <img src={ChartGold} alt='gold' />
            ) : outText === 'plat' ? (
              <img src={ChartPlat} alt='gold' />
            ) : (
              <img src={Chart} alt='gold' />
            )}
          </div>
        <div className='services-text'>
          <div className='services-text-header'>
            <h1>What we offer:</h1>
          </div>

          <div 
            className='services-row-silver'
            style={outText === 'silver' ? {transition: 'ease-in .2s', background: 'rgba(255,255,255,0.05)', cursor: 'pointer'} : {}}
            onMouseEnter={() => setOutText("silver")}
          >
            <div className='services-row-header'>
              <h1 style={outText === 'silver' ? {transition: 'ease-in .2s', fontWeight: 800} : {}} className='silver'>Silver: </h1>
              <h2>$0.00 / Month</h2>
            </div>
            <div className='services-row-list'>
              <li>Basic tracking and charts</li>
              <li>Basic charts and data for stocks</li>
            </div>
          </div>

          <div 
            className='services-row-gold'
            style={outText === 'gold' ? {transition: 'ease-in .2s', background: 'rgba(255,255,255,0.05)', cursor: 'pointer'} : {}}
            onMouseEnter={() => setOutText('gold')}
          >
            <div className='services-row-header'>
              <h1 style={outText === 'gold' ? {transition: 'ease-in .2s', fontWeight: 800} : {}} className='gold'>Gold: </h1>
              <h2> $9.99 / Month</h2>
            </div>
            <div className='services-row-list'>
              <li>Advanced tracking with enhanced data and charts</li>
              <li>Advanced charts, data, and news for stocks</li>
            </div>
          </div>

          <div 
            className='services-row-plat'
            style={outText === 'plat' ? {transition: 'ease-in .2s', background: 'rgba(255,255,255,0.05)', cursor: 'pointer'} : {}}
            onMouseEnter={() => setOutText('plat')}
          >
            <div className='services-row-header'>
              <h1 style={outText === 'plat' ? {transition: 'ease-in .2s', fontWeight: 800} : {}} className='plat'>Platinum: </h1>
              <h2> $19.99 / Month</h2>
            </div>
            <div className='services-row-list'>
              <li>World-class tracking with enhanced data, charts, and analysis</li>
              <li>State of the art charts, data, news, and screeners for stocks</li>
            </div>
          </div>
        </div>
        </div>
      </Section>
      <div className='welcome-footer'>
        <div className='footer-text'>
          <div className='footer-left'>
            <h1>Services used to create this site:</h1>
            <div className='footer-left-icons-container'>
              <a href='https://react.dev/' className='footer-left-icon'>
                <img style={{width: '175%', height: '125%'}} src={ReactLogo} alt='react' />
              </a>
              <a href='https://axios-http.com/' className='footer-left-icon'>
                <img src={AxiosLogo} alt='axios' />
              </a>
              <a href='https://firebase.google.com/' className='footer-left-icon'>
                <img src={FireLogo} alt='firebase' />
              </a>
              <a href='https://www.flaticon.com/' className='footer-left-icon'>
                <img src={Flaticon} alt='flaticon' />
              </a>
            </div>
          </div>

          <Link 
            to='home'
            smooth={true} // smooth scroll
            duration={500} // 500ms
            spy={true}
            offset={-75}
          >
            <img className='footer-img' src={sLine} alt='logo' />
          </Link>

          <div className='footer-right'>
            <h1>Created, maintained, and developed by:</h1>
            <div className='footer-right-text-icon'>
              <a href='https://github.com/aidanjames97' className='footer-right-icon'>
                <img src={Github} alt='github' />
              </a>
              <a href='https://aidanjames.ca/'>@aidanjames</a>
              <a href='https://www.linkedin.com/in/aidanjames/' className='footer-right-icon'>
                <img src={LinkedIn} alt='github' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;

const Navbar = () => {
  return (
    <nav className='Navbar'>
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
              <img src={sLine} alt='logo' />
            </div>
        </div>
    </nav>
  )
}


// defining section
const Section = ({ id, isViewed, children }) => {
  return (
    // this is what changes the class so the css can fade in
    <section id={id} className={`scroll-element ${isViewed ? 'visible' : ''}`}>
      {children}
    </section>
  );
};
