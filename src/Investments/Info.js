import React, { useEffect, useState } from 'react'
import "../Styles/Loading.css"
import "../Styles/Info.css"
import SideBarChart from '../Charts/SideBarChart';
import DoubleLineChart from '../Charts/DoubleLineChart';

// graph line colors constants
const GREEN_COLOR = 'rgba(0, 255, 80, 1)';
const RED_COLOR = 'rgba(255, 0, 80, 1)';
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// returns string for display from string date
function dateMonthDay(str) {
  let d = new Date(str * 1000);
  return MONTHS[d.getMonth()] + ' ' + d.getDate()
}

// formats num given
function formatNum(num) {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
}

function formatPercent(num) {
  return num.toFixed(2) + '%'
}

// to delete, sample data
const sampleData = [65, 59, 80, 81, 56, 55, 40, 59, 66, 88, 78, 60]

function Info({ myStocks, myFinance, clickIndex, error }) {
  if(error) {
    return (
      <div className="Investments-error">Could Not Load Data</div>
    )
  } else if (myStocks.length === 0) {
    return (
      <div className='Investments-error'>No Stock Data To Display</div>
    )
  } else if (myStocks && myFinance && myStocks.length === myFinance.length) {
    let textColor = GREEN_COLOR;
    if(myFinance[clickIndex].d < 0) {
      textColor = RED_COLOR
    }
    return (
      <div className='Info'>
        <div className='info-left-text-wrapper'>
          <div className='info-left-text'>
            <h1>{myStocks[clickIndex].ticker}</h1>
            <h2>{formatNum(myFinance[clickIndex].c)}</h2>
            <h4 style={{color: textColor}}>{formatNum(myFinance[clickIndex].d)}</h4>
            <span className='info-left-divider'></span>
            <h4>$ P/L Day:</h4>
            <h3 style={{color: textColor}}>{formatNum((myStocks[clickIndex].shares * myFinance[clickIndex].d))}</h3>
            <h4>% P/L Day:</h4>
            <h3 style={{color: textColor}}>{formatPercent(myFinance[clickIndex].dp)}</h3>
          </div>
        </div>
        <div className='info-chart'>
          <DoubleLineChart 
            dataIn={[65, 69, 80, 61, 66, 77, 40, 52, 62, 32, 68, 60]} 
            lineColor={GREEN_COLOR} 
            lineWidth='3' 
            dataTwo={[62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62]} />
        </div>
        <div className='info-right-body'>
          <div className='info-right-body-header'>
            <h1>Bought {myStocks[clickIndex].shares} shares {dateMonthDay(myStocks[clickIndex].buyDate)}, at: {formatNum(myStocks[clickIndex].buyPrice)}</h1>
          </div>
          <div className='info-right-high-low'>
            <div className='info-right-hl'>
              <h4>Day's Low</h4>
              <h2>{formatNum(myFinance[clickIndex].l)}</h2>
            </div>
            <div className='info-right-body-chart'>
              <div style={{height: '50%'}}>
                <SideBarChart 
                  dataIn={myFinance[clickIndex].c - myFinance[clickIndex].l} 
                  barColorOne={GREEN_COLOR} 
                  fillColor={GREEN_COLOR} 
                  label={["HighLow"]} 
                  sugMin={0} 
                  sugMax={myFinance[clickIndex].h - myFinance[clickIndex].l} 
                />
              </div>
            </div>
            <div className='info-right-hl'>
              <h4>Day's High</h4>
              <h2>{formatNum(myFinance[clickIndex].h)}</h2>
            </div>
          </div>
          <div className='info-right-open-close'>
            <div className='info-right-oc'>
              <h4>Book Value:</h4>
              <h2>{formatNum(myStocks[clickIndex].shares * myStocks[clickIndex].buyPrice)}</h2>
            </div>
            <span className='info-right-divider'></span>
            <div className='info-right-oc'>
              <h4>Market Value:</h4>
              <h2>{formatNum(myStocks[clickIndex].shares * myFinance[clickIndex].c)}</h2>
            </div>
            <span className='info-right-divider'></span>
            <div className='info-right-oc'>
              <h4>Total $ P/L:</h4>
              <h2>{formatNum((myStocks[clickIndex].shares * myFinance[clickIndex].c) - (myStocks[clickIndex].shares * myStocks[clickIndex].buyPrice))}</h2>
            </div>
            <span className='info-right-divider'></span>
            <div className='info-right-oc'>
              <h4>Total % P/L:</h4>
              <h2>{formatPercent((((myStocks[clickIndex].shares * myFinance[clickIndex].c) - (myStocks[clickIndex].shares * myStocks[clickIndex].buyPrice)) / (myStocks[clickIndex].shares * myStocks[clickIndex].buyPrice))*100)}</h2>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="Info-error">
          <div className="loader"></div>
      </div>
  )
  }
}
export default Info