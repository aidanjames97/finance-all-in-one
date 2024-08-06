import React, { useState } from 'react'
import RadarChart from '../Charts/RadarChart';
import SideBarChart from '../Charts/SideBarChart';
import "../Styles/Loading.css"
import "../Styles/Overall.css"
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../API/Firebase';

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const DATE = new Date()

// formats numbers to currency
function formatToUsd(num) {
    return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
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

function Overall({ myDebts, error, setBlurBack, setFromWhat, setReload, reload }) {
    const [toRemove, setToRemove] = useState(false)

    if(error) {
        return (
            <div className='Investments-error'>Could Not Load Data</div>
        )
    } else if(myDebts) {
        if(myDebts.length === 0) {
            return (
                <div className='no-info'>
                    <h1>Add Expenses!</h1>
                    <button 
                    className='no-info-button'
                    onClick={() => { setBlurBack(true); setFromWhat('debts') }}
                >Add Expense</button>
                </div>
            );
        }
        let total = 0 // total debts
        let spending = []; // array for debt amounts
        let spendingTypes = []; // array for debt titles
        // mapping to local vars
        myDebts.map((elem) => {
        total += elem.amount
        spending.push(elem.amount)
        spendingTypes.push(elem.type)
        })

        return (
            <div className='Overall'>
                <div className='overall-wrapper'>
                <div className='overall-header'>
                    Overall Spending
                </div>
                <div className='overall-body-grid'>
                    <div className='overall-body-top'>
                        <RadarChart 
                            dataSpending={spending} 
                            dataSpendingTypes={spendingTypes} 
                        />
                        <div className='overall-top'>
                            <div className='overall-value'>
                                <h2>Amount: </h2>
                                <h1>{formatToUsd(total)}</h1>
                            </div>
                            <div className='overall-date'>
                                <h2>Today:</h2>
                                <h1>{MONTHS[DATE.getMonth()]} {DATE.getDate()}</h1>
                            </div>
                        </div>
                    </div>

                    <div className='overall-info'>
                        <div className='overall-row'>
                            {myDebts.map((item, index) => (
                                <OverallRow 
                                    item={item} 
                                    index={index} 
                                    toRemove={toRemove}
                                    setToRemove={setToRemove}
                                    setReload={setReload}
                                    reload={reload}
                                    key={index}
                                />
                            ))}
                        </div>
                        <div className="overall-adder">
                            <div className="overall-button-container">
                                <button onClick={() => { setToRemove(false); setBlurBack(true); setFromWhat('debts')}}>Add Expense</button>
                                <button onClick={() => { setToRemove(!toRemove) }}>Remove Expense</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='Overall-error'>
              <div className='loader'></div>
            </div>
        )
    }
}
export default Overall

function OverallRow({item, index, toRemove, setToRemove, setReload, reload}) {
    const [loading, setLoading] = useState(false)

    async function del(id) {
        await deleteDoc(doc(db, 'debts', id))
    }

    function removeExpense(id) {
        del(id)
        .then(() => {
            setLoading(false)
            setReload(!reload)
        })
    }

    if(loading) {
        return (
            <div className="Investments-error">
              <div className="loader"></div>
            </div>   
        )
    } 
    return (
        <div className='Overall-Row-container' key={index}>
            <div className='overall-list-item-wrapper'>
                <div className='overall-list-item'>
                <div className='overall-list-heading'>
                    <h1>{item.type.length < 14 ? item.type : item.type.substr(0,11) + '...'}</h1>
                    <h2>{formatToUsd(item.amount)}</h2>
                </div>
                <div className='overall-list-bar'>
                    <ToDisplayChart item={item} />
                </div>
                <div className='overall-list-date'>
                    <h2>Due:</h2>
                    <h1>{dateMonthDay(item.due)}</h1>
                </div>
                </div>
                {toRemove ? 
                (
                <button onClick={() => {
                    setLoading(true)
                    setToRemove(false);
                    removeExpense(item.id)
                }} className="stats-list-remove-button"
                >X</button>
                ) : (
                <></>
                )}
            </div>
            <span style={{backgroundColor:'rgba(173, 216, 230, 0.5)', width:'100%', height:'1px'}}></span>
        </div>
    );
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