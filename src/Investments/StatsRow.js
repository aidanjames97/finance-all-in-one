import React from "react";
import "../Styles/StatsRow.css"
import LineChart from "../Charts/LineChart"

// graph line colors constants
const GREEN_COLOR = 'rgba(0, 255, 80, 1)';
const RED_COLOR = 'rgba(255, 0, 80, 1)';

// formats num given
function formatNum(num) {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
}
function formatPercent(num) {
  return num.toFixed(2) + '%'
}

// to delete, sample data
const sampleData = [65, 59, 80, 81, 56, 55, 40, 59, 66, 88, 78, 60]

function StatsRow({ stock, finance, setClickedIndex, index, toRemove, setToRemove }) {
  let textColor = GREEN_COLOR;
  if(finance.dp < 0) {
    textColor = RED_COLOR
  }
  return (
    <div className="Stats-Row">
      <div className="stats-row-wrapper">
        <button 
          className='stats-list-item-wrapper'
          onClick={() => setClickedIndex(index)}
          >
          <div className='stats-list-item'>
            <div className='stats-list-item-header'>
              <h1>{stock.ticker}</h1>
              <h3>${stock.buyPrice}</h3>
            </div>
            <div className='stats-list-item-graph'>
              <LineChart dataIn={sampleData} lineColor={GREEN_COLOR} scaleDisplay={false} lineWidth='2' />
            </div>
            <div className='stats-list-item-info'>
              <h1>{formatNum(stock.shares * finance.c)}</h1>
              <h2 style={{color: textColor}}>{formatNum(((stock.shares * finance.c) - (stock.shares * finance.o)))}</h2>
              <h2 style={{color: textColor}} >{formatPercent(finance.dp)}</h2>
            </div>
          </div>
        </button>
        {toRemove ? 
        (
          <button onClick={() => { alert(`delete row at index: ${index}, which is ticker: ${stock.ticker}`); setToRemove(false) }} className="stats-list-remove-button">X</button>
        ) : (
          <></>
        )}
      </div>
      <span style={{backgroundColor:'rgba(173, 216, 230, 0.2)', width:'100%', height:'1px'}}></span>
    </div>
  );
}

export default StatsRow;