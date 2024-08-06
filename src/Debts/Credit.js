import React, { useState } from 'react'
import "../Styles/Loading.css"
import "../Styles/Credit.css"
import RadarChart from '../Charts/RadarChart'
import SideBarChart from '../Charts/SideBarChart'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../API/Firebase'

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

function Credit({ myCredit, error, setBlurBack, setFromWhat, setReload, reload }) {
    const [toRemove, setToRemove] = useState(false)

    if(error) {
        return (
            <div className='Credit-error'>Could Not Load Data</div>
        )
    } else if(myCredit) {
        if(myCredit.length === 0) {
            return (
                <div className='no-info'>
                    <h1>Add Your Purchases!</h1>
                    <button 
                    className='no-info-button'
                    onClick={() => { setBlurBack(true); setFromWhat('credit') }}
                >Add Purchase</button>
                </div>
            );
        }
        let total = 0 // total debts
        let spending = []; // array for debt amounts
        let spendingTypes = []; // array for debt titles
        // mapping to local vars
        myCredit.map((elem) => {
            total += elem.amount
            spending.push(elem.amount)
            spendingTypes.push(elem.type)
        })
        return (
            <div className='Credit'>
                <div className='credit-wrapper'>
                <div className='credit-header'>
                    Credit Cards
                </div>
                <div className='credit-body-grid'>
                    <div className='credit-body-top'>
                        <RadarChart 
                            dataSpending={spending} 
                            dataSpendingTypes={spendingTypes} 
                        />
                        <div className='credit-top'>
                            <div className='credit-value'>
                                <h2>Amount: </h2>
                                <h1>{formatToUsd(total)}</h1>
                            </div>
                            <div className='credit-date'>
                                <h2>Due:</h2>
                                <h1>{MONTHS[DATE.getMonth()]} {DATE.getDate() + 2}</h1>
                            </div>
                        </div>
                    </div>

                    <div className='credit-info'>
                        <div className='credit-row'>
                            {myCredit.map((item, index) => (
                                <CreditRow 
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
                        <div className="credit-adder">
                            <div className="credit-button-container">
                                <button onClick={() => { setToRemove(false); setBlurBack(true); setFromWhat('credit')}}>Add Purchase</button>
                                <button onClick={() => { setToRemove(!toRemove) }}>Remove Purchase</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='Credit-error'>
              <div className='loader'></div>
            </div>
        )
    }
}

export default Credit

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

function CreditRow({ item, index, toRemove, setToRemove, setReload, reload }) {
    const [loading, setLoading] = useState(false)

    async function del(id) {
        await deleteDoc(doc(db, 'credit', id))
    }

    function removePurchase(id) {
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
        <div className='Credit-Row-container' key={index}>
            <div className='credit-list-item-wrapper'>
                <div className='credit-list-item'>
                    <div className='credit-list-heading'>
                        <h1>{item.type.length < 14 ? item.type : item.type.substr(0,11) + '...'}</h1>
                        <h2>{formatToUsd(item.amount)}</h2>
                    </div>
                    <div className='credit-list-date'>
                        <h2>Due:</h2>
                        <h1>{dateMonthDay(item.due)}</h1>
                    </div>
                    {toRemove ? 
                        (
                        <button onClick={() => {
                            setLoading(true)
                            setToRemove(false);
                            removePurchase(item.id)
                        }} className="stats-list-remove-button"
                        >X</button>
                        ) : (
                        <></>
                    )}
                </div>
            </div>
            <span style={{backgroundColor:'rgba(173, 216, 230, 0.5)', width:'100%', height:'1px'}}></span>
        </div>
    );
}