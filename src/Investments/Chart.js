import React, { useState, useEffect } from 'react';
import LineGraph from "../Charts/LineChart";
import '../Styles/Chart.css';
import "../Styles/Loading.css"

const GREEN_COLOR = 'rgba(0, 255, 80, 1)';
// to delete, sample data
const sampleData = [65, 59, 80, 81, 56, 55, 40, 59, 66, 88, 78, 60]

// formats numbers to currency
function formatToUsd(num) {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
}

function Chart({ myStocks, error, myFinance }) {
  if(error) {
    return (
      <div className='Chart-error'>Could Not Load Data</div>
    )
  } else if (myStocks && myFinance) {
    let total = 0;
    myStocks.map((elem) => {
      total += elem.shares * elem.buyPrice
    })
  
    return (
      <div className='Chart'>
          <div className='chart-header'>
              <div className='chart-header-numbers'>
                  <h1>{formatToUsd(total)}</h1>
                  <p>+$44.56 (+0.04%) Today</p>
              </div>
              <div className='chart-header-title'>
                  <h1>My Portfolio</h1>
              </div>
          </div>
          <div className='chart-canvas'>
            <LineGraph dataIn={sampleData} lineColor={GREEN_COLOR} lineWidth='4' />
          </div>
      </div>
    )
  } else {
    return (
      <div className='Chart-error'>
        <div className='loader'></div>
      </div>  
    )
  }

}

export default Chart