import React, { useState } from 'react'
import "./Styles/BlurPopout.css"
import { db, auth } from "./API/Firebase"
import { collection, doc, setDoc } from "firebase/firestore"
import { key } from './API/api';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BlurPopout({ setBlurBack, fromWhat, setReload, reload, setClickIndex, clickIndex, user, setUser, userData, setUserData, setAccessPage }) {
  return (
    <div className='blur-background-wrapper'>
        <div className='blur-popout-wrapper'>
          <div className='blur-popout-container'>
            {fromWhat === 'profile' ? 
            (
              <ProfilePopout 
                setBlurBack={setBlurBack}
                setReload={setReload}
                reload={reload}
                user={user}
                setUser={setUser}
                userData={userData}
                setUserData={setUserData}
                setAccessPage={setAccessPage}
              />
            ) : fromWhat === 'debts' ? (
              <AddExpensePopout 
                setBlurBack={setBlurBack} 
                setReload={setReload} 
                reload={reload}
                user={user}
              />
            ) : fromWhat === 'credit' ? (
              <AddPurchasePopout 
                setBlurBack={setBlurBack} 
                setReload={setReload} 
                reload={reload}
                user={user}
              />
            ) : (
              <AddStockPopout 
                setBlurBack={setBlurBack} 
                setReload={setReload} 
                reload={reload} 
                setClickIndex={setClickIndex} 
                clickIndex={clickIndex}
                user={user}
              />
            )}
          </div>
        </div>
    </div>
  )
}

export default BlurPopout

function ProfilePopout({ setBlurBack, setReload, reload, user, setUser, userData, setUserData, setAccessPage }) {
  // state vars from input fields
  const [loading, setLoading] = useState(false)
  const [spedingGoal, setSpendingGoal] = useState(userData.spendingGoal)
  const [isVisible, setIsVisible] = useState(false)

  function checkValid() {
    // check for number
    const numVal = parseFloat(spedingGoal);
    if(isNaN(numVal)) {
      // invalid number
      alert(`Please entre a valid number.\nYou entred: ${spedingGoal}.`)
      setSpendingGoal('')
      setLoading(false)
      return;
    }

    async function addToDB() {
      const profileRef = doc(db, "users", user.uid);
      setDoc(profileRef, { spendingGoal: spedingGoal }, { merge: true })
    }

    addToDB()
    .then(() => {
      setBlurBack(false)
      setReload(!reload)
      setLoading(false)
    })
    .catch((error) => alert("Couldn't edit profile"))
  }

  if(loading) {
    return (
      <div className='Investments-error'>
        <div className='loader'></div>
      </div>
    ); 
  }

  // for handling purchase change
  function handlePurchase(type) {

    const profileRef = doc(db, "users", user.uid);
    setDoc(profileRef, { subscription: type }, { merge: true })
    setReload(!reload)
    handleSlide()
  }

  // handles banner slide in on sign in
  const handleSlide = () => {
    setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false)
      }, 3000);
    }, 500)
  };

  return (
    <div className='Popout'>
      {user ? (
        <div className={`sliding-div ${isVisible ? 'slide-in' : 'slide-out'}`}>
          <h1>Subscription changed</h1>
        </div>
      ) : (
        <></>
      )}
      <div className='popout-header'>
        <h1>{userData.name}'s Profile</h1>
        <button className='popout-exit' onClick={() => setBlurBack(false)}>X</button>
      </div>
      <div className='popout-body'>
        <div className='body-row'>
          <img style={{borderRadius: '50px', border: '2px solid'}} src={user.photoURL} alt='user-profile-pic' />
        </div>
        <div className='body-row'>
          <h2>Email:</h2>
          <h3>{userData.email}</h3>
        </div>
        <div className='body-row'>
          {/* for history spending goal */}
          <h2>Spending Goal:</h2>
          <input 
            type='text'
            value={spedingGoal}
            onChange={(e) => setSpendingGoal(e.target.value)}
          />
        </div>
        <div className='body-row'>
          <h2>Subscription:</h2>
          <div className='subscription-row'>
            {userData.subscription === 'silver' ? (
              <button style={{background: 'rgba(173, 216, 230, 0.2)', border: '1px solid rgba(255, 255, 255, 0.4)'}}>Silver</button>
            ) : (
              <button onClick={() => handlePurchase('silver')}>Silver</button>
            )}
            {userData.subscription === 'gold' ? (
              <button style={{background: 'rgba(173, 216, 230, 0.2)', border: '1px solid rgba(255, 255, 255, 0.4)'}}>Gold</button>
            ) : (
              <button onClick={() => handlePurchase('gold')}>Gold</button>
            )}
            {userData.subscription === 'platinum' ? (
              <button style={{background: 'rgba(173, 216, 230, 0.2)', border: '1px solid rgba(255, 255, 255, 0.4)'}}>Platinum</button>
            ) : (
              <button onClick={() => handlePurchase('platinum')}>Platinum</button>
            )}
          </div>
        </div>
      </div>
      <div className='popout-bottom'>
      <Link 
        className='popout-done'
        onClick={() => { setLoading(true); checkValid() }}
      >Done</Link>
      <Link
        to='/'
        className='popout-done'
        onClick={() => setAccessPage(false)}
      >Home</Link>
      <Link
      to='/'
        className='popout-done'
        onClick={() => auth.signOut().then(() => setUser(null))}
      >Sign Out</Link>
      </div>
    </div>
  )
}

function AddStockPopout({ setBlurBack, setReload, reload, setClickIndex, clickIndex, user}) {
  // state vars from input fields
  const [ticker, setTicker] = useState('')
  const [shares, setShares] = useState('')
  const [buyPrice, setBuyPrice] = useState('')
  const [buyDate, setBuyDate] = useState('')
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (tick) => {
    try {
      const response = await (
        axios.get(`https://finnhub.io/api/v1/search?q=${tick}&token=${key}`)
      )
      return response
    } catch(error) {
      setError(error)
    }
  }

  // checking for valid inputs
  function checkValid() {
    setLoading(true)
    // checking for string
    if(typeof ticker !== 'string' || ticker.trim() === '') {
      // invalid string
      alert(`Please entre a valid ticker.\nYou entred: ${ticker}.`)
      setTicker('')
      setLoading(false)
      return;
    }
    if(ticker.length >= 30) {
      // invalid string
      alert(`Please entre a valid ticker, (must be less then 30 characters).\nYours was: ${ticker.length}.`)
      setTicker('')
      setLoading(false)
      return;
    }
    fetchData(ticker)
    .then((result) => {
      if(result.data.count === 0 || error) {
        alert(`Ticker not found, please entre a valid ticker.\nYou entred: ${ticker}.`)
        setTicker('')
        setLoading(false)
        return;
      }
      const outTicker = (result.data.result[0].symbol) // set ticker to most likely symbol

      // checking for shares
      const shareVal = parseFloat(shares)
      if(isNaN(shareVal)) {
        alert(`Please entre valid number of shares.\nYou entred: ${shares}.`)
        setShares('')
        setLoading(false)
        return;
      }

      // checking for buy price
      const buyVal = parseFloat(buyPrice)
      if(isNaN(buyVal)) {
        alert(`Please entre valid buy price.\nYou entred: ${buyPrice}`)
        setBuyPrice('')
        setLoading(false)
        return;
      }

      // checking for buy date
      const buyDateVal = new Date(buyDate)
      if(isNaN(buyDateVal)) {
        alert(`Please entre a valid date`)
        setBuyDate('')
        setLoading(false)
        return;
      }

      // all inputs are valid here, (ticker, sharesVal, buyVal, buyDateVal)
      addToDB({
        ticker: outTicker, 
        shares: (parseFloat(shareVal.toFixed(4))),
        buyPrice: (parseFloat(buyVal.toFixed(4))),
        buyDate: buyDateVal
      })
      setLoading(false)
    })
  }

  // add new col
  async function addToDB(data) {
    const newStockRef = doc(collection(db, `users/${user.uid}/stocks`));
    await setDoc(newStockRef, data)
    setBlurBack(false)
    setReload(!reload)
    try {
      setClickIndex(0)
    } catch {
      // not in investment page
    }
  }

  if(error) {
    return (
      <div className='Investments-error'>Could Not Load Data</div>
    )
  } else if(loading) {
    return (
      <div className='Investments-error'>
        <div className='loader'></div>
      </div>
    )
  } else {
    return (
      <div className='Popout'>
        <div className='popout-header'>
          <h1>Add Stock</h1>
          <button className='popout-exit' onClick={() => setBlurBack(false)}>X</button>
        </div>
        <div className='popout-body'>
          <div className='body-row'>
             {/* aka ticker */}
             <h2>Ticker:</h2>
             <input 
              type='text'
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
             />
          </div>
          <div className='body-row'>
            {/* aka shares */}
            <h2>Shares:</h2>
            <input 
              type='text'
              value={shares}
              onChange={(e) => setShares(e.target.value)}
            />
          </div>
          <div className='body-row'>
            {/* aka buyPrice */}
            <h2>Buy Price:</h2>
            <input 
              type='text'
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
            />
          </div>
          <div className='body-row'>
            {/* aka shares */}
            <h2>Buy Date:</h2>
            <input 
              type='date'
              value={buyDate}
              style={{
                fontSize: '16px', 
                fontWeight: 500,
                fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
                colorScheme: 'light',
              }}
              onChange={(e) => setBuyDate(e.target.value)}
            />
          </div>
        </div>
        <button 
          className='popout-done'
          onClick={() => checkValid()}
        >Done</button>
      </div>
    )
  }
}

function AddExpensePopout({ setBlurBack, setReload, reload, user }) {
  // state vars from input fields
  const [type, setType] = useState('')
  const [amount, setAmount] = useState('')
  const [due, setDue] = useState('')
  const [loading, setLoading] = useState(false);

  // checking for valid inputs
  function checkValid() {
    // checking for string
    if(typeof type !== 'string' || type.trim() === '') {
      // invalid string
      alert(`Please entre a valid type, (must be word(s)).\nYou entred: ${type}.`)
      setType('')
      setLoading(false)
      return;
    }
    if(type.length >= 40) {
      // invalid string
      alert(`Please entre a valid type, (must be less then 40 characters).\nYours was: ${type.length}.`)
      setType('')
      setLoading(false)
      return;
    }
    // check for number
    const numVal = parseFloat(amount);
    if(isNaN(numVal)) {
      // invalid number
      alert(`Please entre a valid number.\nYou entred: ${amount}.`)
      setAmount('')
      setLoading(false)
      return;
    }
    // check for date
    const dateVal = new Date(due)
    if(isNaN(dateVal.getTime())) {
      // invalid date
      alert(`Please entre a valid date`)
      setDue('')
      setLoading(false)
      return;
    }

    // all inputs are valid here (type, numVal, dateVal)
    addToDB({type: type, amount: (parseFloat(numVal.toFixed(2))), due: dateVal})
  }
  
  // add new col
  async function addToDB(data) {
    const newDebtRef = doc(collection(db, `users/${user.uid}/debts`));
    await setDoc(newDebtRef, data)
    setBlurBack(false)
    setReload(!reload)
    setLoading(false)
  }

  if(loading) {
    return (
      <div className='Investments-error'>
        <div className='loader'></div>
      </div>
    )
  }
  return (
    <div className='Popout'>
      <div className='popout-header'>
        <h1>Add Expense</h1>
        <button className='popout-exit' onClick={() => setBlurBack(false)}>X</button>
      </div>
      <div className='popout-body'>
        <div className='body-row'>
          {/* aka type */}
          <h2>Name:</h2>
          <input
            type='text'
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className='body-row'>
          {/* aka amount */}
          <h2>Amount:</h2>
          <input 
            type='text'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className='body-row'>
          {/* aka due */}
          <h2>Due:</h2>
          <input 
            type='date'
            value={due}
            style={{
              fontSize: '16px', 
              fontWeight: 500,
              fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
              colorScheme: 'light',
            }}
            onChange={(e) => setDue(e.target.value)}
          />
        </div>
      </div>
      <button 
        className='popout-done'
        onClick={() => { setLoading(true); checkValid() }}
      >Done</button>
    </div>
  )
}

function AddPurchasePopout({ setBlurBack, setReload ,reload, user }) {
  // state vars from input fields
  const [type, setType] = useState('')
  const [amount, setAmount] = useState('')
  const [due, setDue] = useState('')
  const [loading, setLoading] = useState('')

  function checkValid() {
    // checking for string
    if(typeof type !== 'string' || type.trim() === '') {
      // invalid string
      alert(`Please entre a valid type, (must be word(s)).\nYou entred: ${type}.`)
      setType('')
      setLoading(false)
      return;
    }
    if(type.length >= 40) {
      // invalid string
      alert(`Please entre a valid type, (must be less then 40 characters).\nYours was: ${type.length}.`)
      setType('')
      setLoading(false)
      return;
    }
    // check for number
    const numVal = parseFloat(amount);
    if(isNaN(numVal)) {
      // invalid number
      alert(`Please entre a valid number.\nYou entred: ${amount}.`)
      setAmount('')
      return;
    }
    // check for date
    const dateVal = new Date(due)
    if(isNaN(dateVal.getTime())) {
      // invalid date
      alert(`Please entre a valid date`)
      setDue('')
      setLoading(false)
      return;
    }

    // all inputs are valid here (type, numVal, dateVal)
    addToDB({type: type, amount: (parseFloat(numVal.toFixed(2))), date: dateVal})
  }

    // add new col
    async function addToDB(data) {
      const newDebtRef = doc(collection(db, `users/${user.uid}/credit`));
      await setDoc(newDebtRef, data)
      setBlurBack(false)
      setReload(!reload)
      setLoading(false)
    }
  
  if(loading) {
    return (
      <div className='Investments-error'>
        <div className='loader'></div>
      </div>
    );
  }
  return (
    <div className='Popout'>
      <div className='popout-header'>
        <h1>Add Purchase</h1>
        <button className='popout-exit' onClick={() => setBlurBack(false)}>X</button>
      </div>
      <div className='popout-body'>
        <div className='body-row'>
          {/* aka type */}
          <h2>Name:</h2>
          <input 
            type='text'
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className='body-row'>
          {/* aka amount */}
          <h2>Amount:</h2>
          <input 
            type='text'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className='body-row'>
          {/* aka due */}
          <h2>Date:</h2>
          <input 
            type='date'
            value={due}
            style={{
              fontSize: '16px', 
              fontWeight: 500,
              fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
              colorScheme: 'light',
            }}
            onChange={(e) => setDue(e.target.value)}
          />
        </div>
      </div>
      <button 
          className='popout-done'
          onClick={() => { setLoading(true); checkValid() }}
        >Done</button>
    </div>
  );
}