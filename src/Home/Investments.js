import React, { useState } from 'react';
import "../Styles/Investments.css";
import LineChart from "../Charts/LineChart";
import { db } from "../API/Firebase"
import { collection, getDocs } from "firebase/firestore"; 

// graph line colors
const greenColor = 'rgba(0, 255, 80, 1)';
const redColor = 'rgba(255, 0, 80, 1)';
// finding collection (table) from stock db in firebase
const querySnapshot = await getDocs(collection(db, "stocks"));
// investment totals per stock
let investments = [];
// getting data from db
querySnapshot.forEach((doc) => {
  investments.push({
    tick: doc.data().ticker,
    amount: doc.data().shares,
    buy: doc.data().buyPrice,
  })
});
// calculating investments and formatting to currency
const totalValuesNum = investments.map(investments => investments.amount * investments.buy)
const totalValues = totalValuesNum.map(totalValuesNum => Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalValuesNum))
// reducing digits and formatting to currency
const netValue = totalValuesNum.reduce((acc, curr) => acc + curr, 0);
const formattedNetValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(netValue);

// to delete, sample data
const sampleData = [65, 59, 80, 81, 56, 55, 40, 59, 66, 88, 78, 60]

// component being returned
function Investments() {
  return (
    <div className='Investments'>
      <div className='investments-left-side'>
        <div className='investments-heading'>
          <div className='investments-value'>
            <h2>Value: </h2>
            <h1>{formattedNetValue}</h1>
          </div>
        </div>
        <div className='investments-graph'>
          <LineChart dataIn={sampleData} lineColor='rgba(0, 255, 80, 1)' lineWidth='3'/>
        </div>
      </div>
      <div className='investments-right-side'>
        {investments.map((item, index) => (
          <div className='investments-list-item-wrapper' key={index}>
            <div className='investments-list-item'>
              <div className='investments-list-item-header'>
                <h1>{item.tick}</h1>
                <h3>${item.buy}</h3>
              </div>
              <div className='investments-list-item-graph'>
                <LineChart dataIn={sampleData} lineColor={'rgba(0, 255, 50, 1)'} scaleDisplay={false} lineWidth='2' />
              </div>
              <div className='investments-list-item-info'>
                <h1>{totalValues[index]}</h1>
                <h2 style={{color: greenColor}} >+1,234.56</h2>
                <h2 style={{color: redColor}} >%123.45</h2>
              </div>
            </div>
            <span style={{backgroundColor:'rgba(173, 216, 230, 0.5)', width:'100%', height:'1px'}}></span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Investments