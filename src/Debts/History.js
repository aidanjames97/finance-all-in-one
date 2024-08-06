import React from 'react'
import "../Styles/Loading.css"
import "../Styles/History.css"
import BarChart from "../Charts/BarChart"
import DoughnutHalf from "../Charts/DoughnutChartHalf"

// graph line colors constants
const GREEN_COLOR = 'rgba(0, 255, 80, 1)';
const RED_COLOR = 'rgba(255, 0, 80, 1)';

const sampleData = [650, 590, 800, 810, 560, 550, 400, 590, 660, 880, 780, 600]
const goal = 700
const avg = calcAvg(sampleData)

const moreSpend = avg - goal
const moreSpendPer = (avg-goal)/goal * 100

function calcAvg(arr) {
    const sum = arr.reduce((acc, currVal) => acc + currVal, 0);
    const avg = sum / arr.length
    return avg
}

const min = (Math.min(...sampleData))
const max = (Math.max(...sampleData))

const chartData = [(avg-min),(max-avg)]

// formats numbers to currency
function formatToUsd(num) {
    return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
}
function formatPercent(num) {
    return num.toFixed(2) + '%'
}
  

function History({ myDebts, error, setBlurBack, setFromWhat, setReload, reload }) {
    if(error) {
        return (
            <div className='History-error'>Could Not Load Data</div>
        )
    } else if(myDebts) {
        return (
            <div className='History'>
                <div className='history-wrapper'>
                <div className='history-header'>
                    History
                </div>
                <div className='history-body-grid'>
                    <div className='history-body-top'>
                        <BarChart 
                            dataIncome={sampleData}
                            barColorOne={'lightblue'}
                        />
                    </div>
                    <div className='history-info'>
                        <div className='history-info-top'>
                            <div className='history-average'>
                                <h1>Avg Spending:</h1>
                                <h3>{formatToUsd(avg)}</h3>
                            </div>
                            <span style={{backgroundColor:'rgba(173, 216, 230, 0.5)', width:'1px', height:'80%'}}></span>
                            <div className='history-change'>
                                <h3 style={{color: (moreSpend < 0 ? GREEN_COLOR : RED_COLOR)}}>{formatToUsd(moreSpend)}</h3>
                                <h3 style={{color: (moreSpend < 0 ? GREEN_COLOR : RED_COLOR)}}>{formatPercent(moreSpendPer)}</h3>
                            </div>
                            <span style={{backgroundColor:'rgba(173, 216, 230, 0.5)', width:'1px', height:'80%'}}></span>
                            <div className='history-goal'>
                                <h1>Your Goal:</h1>
                                <h3>{formatToUsd(goal)}</h3>
                            </div>
                        </div>
                        <div className='history-body-middle'>
                            <div className='history-body-chart'>
                                <DoughnutHalf 
                                    info={chartData}
                                    labels={['From Low', 'From High']}
                                />
                            </div>
                            <div className='history-body-middle-labels'>
                                <div className='history-middle-item'>
                                    <h3>Low:</h3>
                                    <h4>{formatToUsd(min)}</h4>
                                </div>
                                <span style={{backgroundColor:'rgba(173, 216, 230, 0.5)', width:'1px', height:'80%'}}></span>
                                <div className='history-middle-item'>
                                    <h3>Current:</h3>
                                    <h4>{formatToUsd(avg)}</h4>
                                </div>
                                <span style={{backgroundColor:'rgba(173, 216, 230, 0.5)', width:'1px', height:'80%'}}></span>
                                <div className='history-middle-item'>
                                    <h3>High:</h3>
                                    <h4>{formatToUsd(max)}</h4>
                                </div>
                            </div>
                            <div className="history-adder">
                                <div className="history-button-container">
                                    <button onClick={() => {setBlurBack(true); setFromWhat('profile')}} >Change Goals</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )  
    } else {
        return (
            <div className='History-error'>
              <div className='loader'></div>
            </div>
        )
    }
}

export default History