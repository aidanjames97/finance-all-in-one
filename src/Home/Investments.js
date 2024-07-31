import React from 'react';
import "../Styles/Investments.css";
import LineChart from "../Charts/LineChart";
import "../Styles/Loading.css"

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

// myStocks: firebase stock, error: any db or api error, 
// myFinance: finnhub api stock data
function Investments({ myStocks, error, myFinance, setBlurBack, setFromWhat }) {
  if(error) {
    return (
      <div className='Investments-error'>Could Not Load Data</div>
    )
  } else if (myStocks && myStocks && myFinance.length == myStocks.length) {
    if(myStocks.length === 0) {
      return (
        <div className='no-info'>
          <h1>Add Your Holdings!</h1>
          <button 
            className='no-info-button'
            onClick={() => {setBlurBack(true); setFromWhat('stock')}}
          >Add Holdings</button>
        </div>
      );
    }
    return (
      <DataDisplay data={myStocks} myFinance={myFinance} />
    )
  } else {
    return (
      <div className='Investments-error'>
        <div className='loader'></div>
      </div>
    )
  }
}
export default Investments

function DataDisplay({ data, myFinance }) {
  let total = 0;
  let colorArr = [];
  data.map((elem) => {
    total += (elem.buyPrice * elem.shares)
  })
  myFinance.map((elem) => {
    if(elem.dp > 0) {
      colorArr.push(GREEN_COLOR)
    } else {
      colorArr.push(RED_COLOR)
    }
  })

  let dayDollar = 0;
  for(let i = 0; i < data.length; i++) {
    dayDollar += (data[i].shares * myFinance[i].d)
  }
  let textColor = GREEN_COLOR
  if(dayDollar < 0) {
    textColor = RED_COLOR
  }

  return (
    <div className='Investments'>
      <div className='investments-left-side'>
        <div className='investments-heading'>
          <div className='investments-value'>
            <h2>Value: </h2>
            <div className='investments-value-row'>
              <h1>{formatNum(total)}</h1>
              <h3 style={{color: textColor}} >{formatNum(dayDollar)}</h3>
            </div>
          </div>
        </div>
        <div className='investments-graph'>
          <LineChart 
            dataIn={sampleData}
            labelIn={sampleLabel}
            lineColor={GREEN_COLOR} 
            scaleDisplay={true} 
            lineWidth='2'
          />
        </div>
      </div>

      <div className='investments-right-side'>
        {data.map((item, index) => (
        <div className='investments-list-item-wrapper' key={index}>
          <div className='investments-list-item'>
            <div className='investments-list-item-header'>
              <h1>{item.ticker}</h1>
              <h3>{formatNum(item.buyPrice)}</h3>
            </div>
            <div className='investments-list-item-graph'>
              <LineChart 
                dataIn={sampleData}
                labelIn={sampleLabel}
                lineColor={GREEN_COLOR} 
                scaleDisplay={false} 
                lineWidth='1' 
              />
            </div>
            <div className='investments-list-item-info'>
              <h1>{formatNum(item.shares * myFinance[index].c)}</h1>
              <h2 style={{color: colorArr[index]}}>{formatNum((myFinance[index].d * item.shares))}</h2>
              <h2 style={{color: colorArr[index]}} >{formatPercent(myFinance[index].dp)}</h2>
            </div>
          </div>
          <span style={{backgroundColor:'rgba(173, 216, 230, 0.5)', width:'100%', height:'1px'}}></span>
        </div>
        ))}
      </div>
    </div>
  )
}