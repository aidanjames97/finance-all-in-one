import React, { useState, useEffect } from 'react';
import LineGraph from "../Charts/LineChart";
import '../Styles/Chart.css';
import "../Styles/Loading.css"

// graph line colors constants
const GREEN_COLOR = 'rgba(0, 255, 80, 1)';
const RED_COLOR = 'rgba(255, 0, 80, 1)';

// to delete, sample data
let data = [];
let l = [];
let value = 10;
for(let i = 0; i < 365; i++) {
  let date = new Date();
  date.setHours(0,0,0,0)
  date.setDate(i);
  value += Math.round((Math.random() < 0.5 ? 1 : -0.7) * Math.random() * 10);
  data.push(value)
  l.push(date)
}
const sampleData = data;
const sampleLabel = l;

// formats numbers to currency
function formatToUsd(num) {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
}
function formatPercent(num) {
  return num.toFixed(2) + '%'
}

function Chart({ myStocks, error, myFinance }) {
  if(error) {
    return (
      <div className='Chart-error'>Could Not Load Data</div>
    )
  } else if (myStocks && myFinance && myFinance.length === myStocks.length) {
    let total = 0;
    myStocks.map((elem) => {
      total += elem.shares * elem.buyPrice
    })

    let dayDollar = 0;
    for(let i = 0; i < myStocks.length; i++) {
        dayDollar += (myStocks[i].shares * myFinance[i].d)
    }
    const dayPercent = (dayDollar / total) * 100

    let textStyle = GREEN_COLOR;
    if(dayDollar < 0) { textStyle = RED_COLOR }
  
    return (
      <div className='Chart'>
          <div className='chart-header'>
              <div className='chart-header-numbers'>
                  <h1>{formatToUsd(total)}</h1>
                  <p style={{ color: textStyle }}>{formatToUsd(dayDollar)} ({formatPercent(dayPercent)}) Today</p>
              </div>
              <div className='chart-header-title'>
                  <h1>My Portfolio</h1>
              </div>
          </div>
          <div className='chart-canvas'>
            <LineGraph dataIn={sampleData} labelIn={sampleLabel} lineColor={GREEN_COLOR} lineWidth='3' />
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