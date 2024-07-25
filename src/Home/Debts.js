import React, { useEffect, useState } from 'react'
import "../Styles/Debts.css"
import RadarChart from '../Charts/RadarChart'
import SideBarChart from '../Charts/SideBarChart';
import "../Styles/Loading.css"

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

// formats numbers to currency
function formatToUsd(num) {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
}

// calcuates days from today to date given, returns how many days (int)
function dateDiff(dateDue) {
  const d = new Date(dateDue.seconds * 1000);
  const today = new Date()

  const diff = d - today
  const diffInDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if(diffInDays > 30) {
    return 30;
  }
  return diffInDays;
}

// calculates bar color for bar chart
function barColor(days) {
  if(days > 14) {
    return 'rgba(0, 255, 50, 0.8)';
  }
  return 'rgba(255, 0, 50, 0.8)';
}

// calculates bar fill color for bar chart
function barBackgroundColor(days) {
  if(days > 14) {
    return 'rgba(0, 255, 50, 0.2)';
  }
  return 'rgba(255, 0, 50, 0.2)';
}

// returns string for display from string date
function dateMonthDay(str) {
  let d = new Date(str * 1000);
  return MONTHS[d.getMonth()] + ' ' + d.getDate()
}

function Debts({ myDebts, error }) {
  if(error) {
    return (
      <div className='Debts-error'>Could Not Load Data</div>
    )
  } else if(myDebts) {
    return (
      <DebtsDisplay data={myDebts} />
    )
  } else {
    return (
      <div className='Debts-error'>
        <div className='loader'></div>
      </div>
    )
  }
}
export default Debts

function DebtsDisplay({ data }) {
  let total = 0 // total debts
  let spending = []; // array for debt amounts
  let spendingTypes = []; // array for debt titles
  // mapping to local vars
  data.map((elem) => {
    total += elem.amount
    spending.push(elem.amount)
    spendingTypes.push(elem.type)
  })

  return (
    <div className='Debts'>
      <div className='debts-left'>
        <div className='debts-value'>
          <h2>Amount: </h2>
          <h1>{formatToUsd(total)}</h1>
        </div>
        <div className='debts-chart'>
          <RadarChart dataSpending={spending} dataSpendingTypes={spendingTypes} />
        </div>
      </div>
      <div className='debts-body-info'>
        {data.map((item, index) => (
          <div className='debts-list-item-wrapper' key={index}>
            <div className='debts-list-item'>
              <div className='debts-list-heading'>
                <h1>{item.type.length < 12 ? item.type : item.type.substr(0,8) + '...'}</h1>
                <h2>{formatToUsd(item.amount)}</h2>
              </div>
              <div className='debts-list-bar'>
                <ToDisplayChart item={item} />
              </div>
              <div className='debts-list-date'>
                <h2>Due:</h2>
                <h1>{dateMonthDay(item.due)}</h1>
              </div>
            </div>
            <span style={{backgroundColor:'rgba(173, 216, 230, 0.5)', width:'100%', height:'1px'}}></span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ToDisplayChart({ item }) {
  if(dateDiff(item.due) < 0) {
    return (
      <div className='is-past-due'>
        <h1>PAST DUE</h1>
      </div>
    );
  } else if (dateDiff(item.due) === 0) {
    return (
      <div className='is-past-due'>
        <h1>DUE TODAY</h1>
      </div>
    );
  }
  return (
    <>
      <h1>0</h1>
      <SideBarChart dataIn={dateDiff(item.due)} barColorOne={barColor(dateDiff(item.due))} fillColor={barBackgroundColor(dateDiff(item.due))} label={["Days Until Due"]} sugMin={0} sugMax={30} />
      <h1>30</h1>
    </>
  );
}