import React from 'react'
import "./Investments.css"

const investments = [
  {tick: 'AAPL', amount: '80', buy: '217.33'},
  {tick: 'NVDA', amount: '100', buy: '100.33'},
  {tick: 'CPS', amount: '850', buy: '15.55'},
  {tick: 'MSFT', amount: '20', buy: '388.36'},
  {tick: 'AI', amount: '115', buy: '39.13'},
  {tick: 'TSLA', amount: '60', buy: '205.55'},
  {tick: 'INTC', amount: '100', buy: '39.13'},
  {tick: 'GOOG', amount: '115', buy: '200.15'},
]

const totalValuesNum = investments.map(investments => investments.amount * investments.buy)
const totalValues = totalValuesNum.map(totalValuesNum => Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalValuesNum))

function Investments() {
  return (
    <div className='Investments'>
      <div className='investments-left-side'>
        <div className='investments-heading'>
          <div className='investments-value'>
            <h2>Value: </h2>
            <h1>$TEMP.00</h1>
          </div>
        </div>
        <div className='investments-graph'>

        </div>
      </div>
      <div className='investments-right-side'>
        {investments.map((item, index) => (
          <div className='investments-list-item-wrapper' key={index}>
            <div className='investments-list-item'>
              <div className='investments-list-item-header'>
                <h1>{item.tick}</h1>
                <h3>$123.45</h3>
              </div>
              <div className='investments-list-item-graph'>

              </div>
              <div className='investments-list-item-info'>
                <h1>{totalValues[index]}</h1>
                <h2>+1,234.56</h2>
                <h2>%123.45</h2>
              </div>
            </div>
            <span style={{backgroundColor:'rgba(173, 216, 230, 0.5)', width:'100%', height:'1px'}}></span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Investments