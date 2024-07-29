import './Styles/App.css';
import Header from "./Header";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Home/Home';
import Spending from './Debts/DebtsMain';
import Saving from "./Saving/SavingMain";
import Investments from "./Investments/InvestmentsMain";
import { db } from "./API/Firebase"
import { collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from "react"
import { key } from './API/api';
import axios from 'axios';

// global constants
const DEBTS_COL = collection(db, 'debts');
const STOCK_COL = collection(db, 'stocks');
const CREDIT_COL = collection(db, 'credit');

function App() {
  // get stock data
  const [myStocks, setMyStocks] = useState([]);
  const [myFinance, setMyFinance] = useState([]);
  const [myCredit, setMyCredit] = useState([]);
  const [myDebts, setMyDebts] = useState([]);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(true);
  const [blurBack, setBlurBack] = useState(false);
  const [fromWhat, setFromWhat] = useState(null);

  useEffect(() => {
    // firebase stock data
    const getFireData = async () => {
      const data = await getDocs(STOCK_COL)
      return(data.docs.map((elem) => ({ ...elem.data(), id: elem.id})))
    }
    // firebase debts data
    const getFireDebt = async() => {
      const data = await getDocs(DEBTS_COL)
      return(data.docs.map((elem) => ({ ...elem.data(), id: elem.id})))
    }
    // firebase credit data
    const getFireCreditData = async () => {
      const data = await getDocs(CREDIT_COL)
      return(data.docs.map((elem) => ({ ...elem.data(), id: elem.id})))
    }

    // fetching api data
    const fetchData = async (tickers) => {
      let outData = [];
      try {
        const responses = await Promise.all(
          tickers.map(ticker =>
            axios.get(`https://finnhub.io/api/v1/quote?symbol=${ticker.ticker}&token=${key}`)
          )
        );
        responses.map((elem) => {
          outData.push(elem.data)
        })
        setMyFinance(outData);
      } catch (error) {
        setError(error);
      }
    };

    // getting data for stocks
    getFireData()
    .then((result) => {
      setMyStocks(result)
      // after we have the stocks from db, get finance data from api
      fetchData(result);
    })
    .catch(error => setError(error))
    // getting data from debts
    getFireDebt()
    .then((result) => {
      setMyDebts(result)
    })
    .catch(error => setError(error))
    getFireCreditData()
    .then((result) => {
      setMyCredit(result)
    })
    .catch(error => setError(error))
    }, [reload])

  return (
    <div className="App">
      <BrowserRouter>
        <Header setReload={setReload} toReload={reload} setBlurBack={setBlurBack} setFromWhat={setFromWhat} />
        <Routes>
          <Route exact path='/' element={<Home myStocks={myStocks} myDebts={myDebts} myCredit={myCredit} error={error} myFinance={myFinance} blurBack={blurBack} setBlurBack={setBlurBack} fromWhat={fromWhat} />} />
          <Route exact path='/Spending' element={<Spending blurBack={blurBack} setBlurBack={setBlurBack} fromWhat={fromWhat} myDebts={myDebts} myCredit={myCredit} error={error} />} />
          <Route exact path='/Saving' element={<Saving blurBack={blurBack} setBlurBack={setBlurBack} fromWhat={fromWhat} />} />
          <Route exact path='/Investments' element={<Investments myStocks={myStocks} error={error} myFinance={myFinance} blurBack={blurBack} setBlurBack={setBlurBack} fromWhat={fromWhat} setFromWhat={setFromWhat} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
