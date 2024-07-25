import "../Styles/Menu.css"
import React, { useState } from 'react'
import StatsRow from "./StatsRow"
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

function Menu({ myStocks, error, myFinance, setClickIndex, setBlurBack, setFromWhat }) {
    const [toRemove, setToRemove] = useState(false)
    const [toAdd, setToAdd] = useState(false)

    if(error) {
        return (
            <div className="Menu-error">Could Not Load Data</div>
        )
    } else if(myStocks && myFinance.length === myStocks.length && myFinance) {
        let total = 0;
        myStocks.map((elem) => {
          total += elem.shares * elem.buyPrice
        })

        let dayDollar = 0;
        for(let i = 0; i < myStocks.length; i++) {
            dayDollar += ((myStocks[i].shares * myFinance[i].c) - (myStocks[i].shares * myFinance[i].pc))
        }
        const dayPercent = (dayDollar / total) * 100

        let textColor = GREEN_COLOR;
        if(dayDollar < 0) {
          textColor = RED_COLOR
        }
        return (
            <div className="Menu">
                <div className="menu-container">
                    <div className="menu-header">
                        <p>Your Stocks:</p>
                        <div className="menu-header-pl">
                            <p>Day $ P/L</p>
                            <p style={{color: textColor}}>{formatNum(dayDollar)}</p>
                        </div>
                        <div className="menu-header-pl">
                            <p>Day % P/L</p>
                            <p style={{color: textColor}}>{formatPercent(dayPercent)}</p>
                        </div>
                    </div>
                    <div className="menu-content">
                        <div className="menu-rows">
                            {myStocks.map((stock, index) => (
                                <StatsRow 
                                    stock={stock} 
                                    finance={myFinance[index]} 
                                    setClickedIndex={setClickIndex}
                                    key={index}
                                    index={index}
                                    toRemove={toRemove}
                                    toAdd={toAdd} 
                                    setBlurBack={setBlurBack} 
                                    setFromWhat={setFromWhat}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="menu-adder">
                        <div className="menu-button-container">
                            <button onClick={() => { setToAdd(!toAdd); setToRemove(false)}}>Add Shares</button>
                            <button onClick={() => { setToRemove(!toRemove); setToAdd(false)}}>Remove Shares</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="Menu-error">
                <div className="loader"></div>
            </div>
        )
    }

}

export default Menu