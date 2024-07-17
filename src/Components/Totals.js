import React from 'react'
import "../Styles/Totals.css"
import DoughnutChart from '../Charts/DoughnutChart';

// for date display
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const date = new Date()

const colors = ["SkyBlue", "Green", "Coral","Yellow", "SteelBlue"]
const allTypes = [ {what: 'Checking', d:13016.33}, {what: 'Savings', d:81784.00}, {what: 'Stocks', d:87456.11}, {what: 'Retirement', d:45778.32}]

// calculate sum for netWorth and format for currency
const allTypesMoney = allTypes.map(allTypes => allTypes.d)
const netWorth = allTypesMoney.reduce((acc, curr) => acc + curr, 0);
const formattedNetWorth = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(netWorth);

function Totals() {
  return (
    <div className='Totals'>
      <div className='totals-heading'>
        <div className='totals-net-worth'>
          <h2>Net Worth: </h2>
          <h1>{formattedNetWorth}</h1>
        </div>
        <div className='totals-date'>
          <h2>{date.getFullYear()}</h2>
          <h1>{months[date.getMonth()]} {date.getDate()}</h1>
        </div>
      </div>
    
      <div className='totals-body'>
        <div className='totals-graph'>
          <DoughnutChart colors={colors} allTypes={allTypes}/>
        </div>
        <div className='totals-list'>
          {allTypes.map((item, index) => (
            <div className='totals-list-item' key={index} >
              <span style={{backgroundColor: colors[index], width:'5px', height:'30px', borderRadius:'2px'}}></span>
              <li key={index}>{item.what}</li>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Totals