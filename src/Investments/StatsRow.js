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

function StatsRow(props) {
  let textColor = GREEN_COLOR;
  if(props.dayPercent < 0) {
    textColor = RED_COLOR
  }
  return (
    <div className='stats-list-item-wrapper'>
      <div className='stats-list-item'>
        <div className='stats-list-item-header'>
          <h1>{props.name}</h1>
          <h3>${props.buyPrice}</h3>
        </div>
        <div className='stats-list-item-graph'>
          <LineChart dataIn={sampleData} lineColor={GREEN_COLOR} scaleDisplay={false} lineWidth='2' />
        </div>
        <div className='stats-list-item-info'>
          <h1>{formatNum(props.shares * props.currentPrice)}</h1>
          <h2 style={{color: textColor}}>{formatNum(((props.shares * props.currentPrice) - (props.shares * props.openPrice)))}</h2>
          <h2 style={{color: textColor}} >{formatPercent(props.dayPercent)}</h2>
        </div>
      </div>
      <span style={{backgroundColor:'rgba(173, 216, 230, 0.2)', width:'100%', height:'1px'}}></span>
    </div>
  );
}

export default StatsRow;