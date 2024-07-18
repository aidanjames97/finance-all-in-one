import React from 'react'
import "../Styles/Debts.css"
import RadarChart from '../Charts/RadarChart'
import SideBarChart from '../Charts/SideBarChart';
import { db } from "../Firebase"
import { collection, getDocs } from "firebase/firestore"; 

const querySnapshot = await getDocs(collection(db, "debts"));

let debts = [];

querySnapshot.forEach((doc) => {
  debts.push({
    type: doc.data().type,
    amount: doc.data().amount,
    due: doc.data().due,
  })
});


// for date display
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const sp = debts.map(debts => debts.amount)
const ty = debts.map(debts => debts.type)

const netDebts = sp.reduce((acc, curr) => acc + curr, 0);

// formats numbers to currency
function formatToUsd(num) {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
}

// calcuates days from today to date given, returns that int
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
  return months[d.getMonth()] + ' ' + d.getDate()
}

function Debts() {
  return (
    <div className='Debts'>
      <div className='debts-left'>
        <div className='debts-value'>
          <h2>Amount: </h2>
          <h1>{formatToUsd(netDebts)}</h1>
        </div>
        <div className='debts-chart'>
          <RadarChart dataSpending={sp} dataSpendingTypes={ty} />
        </div>
      </div>
      <div className='debts-body-info'>
        {debts.map((item, index) => (
          <div className='debts-list-item-wrapper' key={index}>
            <div className='debts-list-item'>
              <div className='debts-list-heading'>
                <h1>{item.type.length < 12 ? item.type : '$$'}</h1>
                <h2>{formatToUsd(item.amount)}</h2>
              </div>
              <div className='debts-list-bar'>
                <h1>0</h1>
                <SideBarChart dataDaysDue={dateDiff(item.due)} barColorOne={barColor(dateDiff(item.due))} fillColor={barBackgroundColor(dateDiff(item.due))} />
                <h1>30</h1>
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

export default Debts