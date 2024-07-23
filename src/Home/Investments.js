import React, { useState, useEffect } from 'react';
import "../Styles/Investments.css";
import LineChart from "../Charts/LineChart";
import { db } from '../API/Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { finnhubClient } from "../API/StockInfo";
import axios from 'axios';
import { key } from '../API/api';

// graph line colors constants
const GREEN_COLOR = 'rgba(0, 255, 80, 1)';
const RED_COLOR = 'rgba(255, 0, 80, 1)';
const STOCK_COL = collection(db, 'stocks')
const BASE_URL = "https://finnhub.io/api/v1/quote?symbol=";

// formats num given
function formatNum(num) {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
}

// to delete, sample data
const sampleData = [65, 59, 80, 81, 56, 55, 40, 59, 66, 88, 78, 60]

function Investments() {
  const [data, setStockData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // getting firebase data (from firestore)
    const getFireData = async () => {
      const fromCol = await getDocs(STOCK_COL)
      return(fromCol.docs.map((elem) => ({ ...elem.data(), id: elem.id})))
    }

    getFireData()
    .then((result) => {
      setStockData(result)
    })
    .catch(error => setError(error))
  }, []);

  if(error) {
    return (
      <div className='Investments-error'>Could Not Load Data</div>
    )
  } else if (data) {
    return (
      <DataDisplay data={data} />
    )
  } else {
    return (
      <div className='Investments-error'>
        <div className='loader'></div>
      </div>
    )
  }
}
export default Investments

function DataDisplay({ data }) {
  let total = 0
  data.map((elem) => {
    total += (elem.buyPrice * elem.shares)
  })

  return (
    <div className='Investments'>
      <div className='investments-left-side'>
        <div className='investments-heading'>
          <div className='investments-value'>
            <h2>Value: </h2>
            <h1>{formatNum(total)}</h1>
          </div>
        </div>
        <div className='investments-graph'>
          <LineChart dataIn={sampleData} lineColor={GREEN_COLOR} lineWidth='3'/>
        </div>
      </div>

      <div className='investments-right-side'>
        {data.map((item, index) => (
        <div className='investments-list-item-wrapper' key={index}>
          <div className='investments-list-item'>
            <div className='investments-list-item-header'>
              <h1>{item.ticker}</h1>
              <h3>${item.buyPrice}</h3>
            </div>
            <div className='investments-list-item-graph'>
              <LineChart dataIn={sampleData} lineColor={GREEN_COLOR} scaleDisplay={false} lineWidth='2' />
            </div>
            <div className='investments-list-item-info'>
              <h1>{formatNum(item.shares * item.buyPrice)}</h1>
              <h2 style={{color: GREEN_COLOR}}>1</h2>
              <h2 style={{color: RED_COLOR}} >%123.45</h2>
            </div>
          </div>
          <span style={{backgroundColor:'rgba(173, 216, 230, 0.5)', width:'100%', height:'1px'}}></span>
        </div>
        ))}
      </div>
    </div>
  )
}