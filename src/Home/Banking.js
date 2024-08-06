import React from 'react'
import "../Styles/Banking.css"
import DoubleBarChart from "../Charts/DoubleBarChart"
import LineChart from '../Charts/LineChart'

const sampleData = [65, 59, 80, 81, 56, 55, 40, 59, 66, 88, 78, 60]
const sampleDataExp = [60, 50, 70, 61, 46, 35, 30, 49, 56, 80, 68, 44]
const netSavings = formatToUsd(56789.10)

function getAverage(arr) {
  if(arr.length === 0) return 0;

  let sum = 0;
  for(let i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum / arr.length;
}

function formatToUsd(num) {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
}

function Banking() {
  return (
    <div className='Banking'>
      <div className='banking-value-wrapper'>
        <div className='banking-value-left'>
          <div className='banking-value-left-wrapper'>
            <h2>Avg. Inc: </h2>
            <h1>{formatToUsd(getAverage(sampleData))}</h1> 
          </div>
          <div className='banking-value-left-wrapper'>
            <h2>Avg. Exp: </h2>
            <h1>{formatToUsd(getAverage(sampleDataExp))}</h1> 
          </div>
        </div>
        <div className='banking-value-right'>
          <h2>Savings: </h2>
          <h1>{netSavings}</h1>
        </div>
      </div>
      <div className='banking-chart-wrapper'>
        <DoubleBarChart dataIncome={sampleData} dataExpenses={sampleDataExp} barColorOne={'rgba(0, 255, 255, 1)'} barColorTwo={'rgba(255, 255, 0, 1)'} />
        <LineChart 
          dataIn={sampleData}
          labelIn={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
          lineColor={'rgba(0, 255, 80, 1)'} 
          lineWidth={3}
        />
      </div>
      <div className='banking-legend-wrapper'>
        <div className='banking-legend-left'>
          <LegendElement color={'rgba(0, 255, 255, 1)'} name={'Income'} />
          <LegendElement color={'rgba(255, 255, 0, 1)'} name={'Expenses'} />
        </div>
        <div className='banking-legend-right'>
          <LegendElement color={'rgba(0, 255, 80, 1)'} name={'Saving'} />
        </div>
      </div>
    </div>
  )
}
export default Banking

function LegendElement({ color, name }) {
  return (
    <div className='banking-legend'>
        <span style={{backgroundColor: color, width:'5px', height:'30px', borderRadius:'2px'}}></span>
        <h3>{name}</h3>
    </div>
  )
}