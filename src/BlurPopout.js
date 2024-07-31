import React, { useState } from 'react'
import "./Styles/BlurPopout.css"
import { db } from "./API/Firebase"
import { collection, doc, setDoc } from "firebase/firestore"
import { key } from './API/api';
import axios from 'axios';

function BlurPopout({ setBlurBack, fromWhat, setReload, reload, setClickIndex, clickIndex }) {
  return (
    <div className='blur-background-wrapper'>
        <div className='blur-popout-wrapper'>
          <div className='blur-popout-container'>
            {fromWhat === 'profile' ? 
            (
              <ProfilePopout setBlurBack={setBlurBack} />
            ) : fromWhat === 'debts' ? (
              <AddExpensePopout setBlurBack={setBlurBack} setReload={setReload} reload={reload} />
            ) : fromWhat === 'credit' ? (
              <AddPurchasePopout setBlurBack={setBlurBack} setReload={setReload} reload={reload} />
            ) : (
              <AddStockPopout setBlurBack={setBlurBack} setReload={setReload} reload={reload} setClickIndex={setClickIndex} clickIndex={clickIndex} />
            )}
          </div>
        </div>
    </div>
  )
}

export default BlurPopout

function ProfilePopout({ setBlurBack }) {
  return (
    <div className='Popout'>
      <div className='popout-header'>
        <h1>Profile</h1>
        <button className='popout-exit' onClick={() => setBlurBack(false)}>X</button>
      </div>
    </div>
  )
}

function AddStockPopout({ setBlurBack, setReload, reload, setClickIndex, clickIndex}) {
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
    const newStockRef = doc(collection(db, 'stocks'));
    await setDoc(newStockRef, data)
    setBlurBack(false)
    setReload(!reload)
    setClickIndex(0)
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

function AddExpensePopout({ setBlurBack, setReload, reload }) {
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
      return;
    }
    if(type.length >= 40) {
      // invalid string
      alert(`Please entre a valid type, (must be less then 40 characters).\nYours was: ${type.length}.`)
      setType('')
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
      return;
    }

    // all inputs are valid here (type, numVal, dateVal)
    addToDB({type: type, amount: (parseFloat(numVal.toFixed(2))), due: dateVal})
  }
  
  // add new col
  async function addToDB(data) {
    const newDebtRef = doc(collection(db, 'debts'));
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

function AddPurchasePopout({ setBlurBack, setReload ,reload }) {
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
      return;
    }
    if(type.length >= 40) {
      // invalid string
      alert(`Please entre a valid type, (must be less then 40 characters).\nYours was: ${type.length}.`)
      setType('')
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
      return;
    }

    // all inputs are valid here (type, numVal, dateVal)
    addToDB({type: type, amount: (parseFloat(numVal.toFixed(2))), due: dateVal})
  }

    // add new col
    async function addToDB(data) {
      const newDebtRef = doc(collection(db, 'credit'));
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
  );
}