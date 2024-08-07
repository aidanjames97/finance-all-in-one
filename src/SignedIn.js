import React, { useState, useEffect } from 'react'
import { key } from './API/api';
import axios from 'axios';
import Header from "./Header";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Home/Home';
import Spending from './Debts/DebtsMain';
import Saving from "./Saving/SavingMain";
import Investments from "./Investments/InvestmentsMain";
import { db } from "./API/Firebase"
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

function SignedIn({ user, setUser }) {
   // get stock data
  const [myStocks, setMyStocks] = useState([]);
  const [myFinance, setMyFinance] = useState([]);
  const [myCredit, setMyCredit] = useState([]);
  const [myDebts, setMyDebts] = useState([]);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(true);
  const [blurBack, setBlurBack] = useState(false);
  const [fromWhat, setFromWhat] = useState(null);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // firebase stock data
    const getFireData = async () => {
      const data = await getDocs(collection(db, `users/${user.uid}/stocks`))
      return(data.docs.map((elem) => ({ ...elem.data(), id: elem.id})))
    }
    // firebase debts data
    const getFireDebt = async() => {
      const data = await getDocs(collection(db, `users/${user.uid}/debts`))
      return(data.docs.map((elem) => ({ ...elem.data(), id: elem.id})))
    }
    // firebase credit data
    const getFireCreditData = async () => {
      const data = await getDocs(collection(db, `users/${user.uid}/credit`))
      return(data.docs.map((elem) => ({ ...elem.data(), id: elem.id})))
    }

    // firebase user data
    const getFireUserData = async () => {
      const docSnap = await getDoc(doc(db, "users", user.uid));
      return(docSnap.data())
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
      fetchData(result.slice(1)); // remove sample entry
      
      setMyStocks(result.slice(1)) // removing sample entry
      // after we have the stocks from db, get finance data from api
    })
    .catch(error => setError(error))
    // getting data from debts
    getFireDebt()
    .then((resultDebts) => {
      getFireCreditData()
        .then((result) => {
          setMyCredit(result.slice(1)); // removing sample entry
          let tmp = resultDebts.slice(1); // removing sample entry
          const tmpCredit = result.slice(1);
          if(tmpCredit.length > 1) {
            let totalCredit = 0; // total due on credit card
            tmpCredit.map((elem) => {
              totalCredit += elem.amount
            })
            tmp.push({amount: totalCredit, type: "Credit Card", due: new Date()})
          }
          setMyDebts(tmp)
        })
    })
    .catch(error => setError(error))

    getFireUserData()
    .then((res) => {
      setUserData(res)
    })
    .catch(error => { setError(error); console.log(error) })
    }, [reload])

    return (
        <div className="App">
          <BrowserRouter>
            <Header setReload={setReload} toReload={reload} setBlurBack={setBlurBack} setFromWhat={setFromWhat} />
            <Routes>
              <Route exact path='/' element={
                <Home 
                  myStocks={myStocks} 
                  myDebts={myDebts} 
                  error={error} 
                  myFinance={myFinance} 
                  blurBack={blurBack} 
                  setBlurBack={setBlurBack} 
                  fromWhat={fromWhat} 
                  setFromWhat={setFromWhat} 
                  setReload={setReload} 
                  reload={reload}
                  user={user}
                  setUser={setUser}
                  userData={userData}
                  setUserData={setUserData}
                />} 
              />
              <Route exact path='/Spending' element={
                <Spending 
                  blurBack={blurBack} 
                  setBlurBack={setBlurBack}
                  setFromWhat={setFromWhat}
                  fromWhat={fromWhat} 
                  myDebts={myDebts} 
                  error={error} 
                  setReload={setReload} 
                  reload={reload}
                  myCredit={myCredit}
                  userData={userData}
                  setUserData={setUserData}
                  user={user}
                />} 
              />
              <Route exact path='/Saving' element={
                <Saving 
                  blurBack={blurBack} 
                  setBlurBack={setBlurBack} 
                  fromWhat={fromWhat}
                  setReload={setReload}
                  reload={reload}
                  user={user}
                  userData={userData}
                  setUserData={setUserData}
                />} 
              />
              <Route exact path='/Investments' element={
                <Investments 
                  myStocks={myStocks} 
                  error={error} 
                  myFinance={myFinance} 
                  blurBack={blurBack} 
                  setBlurBack={setBlurBack} 
                  fromWhat={fromWhat} 
                  setFromWhat={setFromWhat} 
                  setReload={setReload} 
                  reload={reload}
                  user={user}
                  userData={userData}
                  setUserData={setUserData}
                />}
              />
            </Routes>
          </BrowserRouter>
        </div>
      );
}

export default SignedIn