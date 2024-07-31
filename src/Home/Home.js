import React, { useEffect } from 'react'
import Totals from "./Totals";
import Banking from "./Banking";
import Investments from "./Investments";
import Debts from "./Debts.js"
import "../Styles/Home.css"
import BlurPopout from "../BlurPopout.js"

// myStocks: firebase stock, myDebts: firebase debts, error: any db or api error, 
// myFinance: finnhub api stock data, blurBack: popout blur T/F, 
// setBlurBack: setter for blurBack, fromWhat: string what popout is from
function Home( { myStocks, myDebts, error, myFinance, blurBack, setBlurBack, fromWhat, setFromWhat, setReload, reload }) {
  return (
    <div className="Home">
        {blurBack ? 
        (
            <BlurPopout 
                setBlurBack={setBlurBack} 
                fromWhat={fromWhat} 
                setReload={setReload} 
                reload={reload} 
            />
        ) : (
        <></>
        )}
        <div className='grid-display'>
            <div className='grid-wrapper'>
                <Totals />
            </div>
            <div className='grid-wrapper'>
                <Debts 
                    myDebts={myDebts} 
                    error={error} 
                    setBlurBack={setBlurBack} 
                    setFromWhat={setFromWhat} 
                />
            </div>
            <div className='grid-wrapper'>
                <Banking />
            </div>
            <div className='grid-wrapper'>
                <Investments 
                    myStocks={myStocks} 
                    error={error} 
                    myFinance={myFinance} 
                    setBlurBack={setBlurBack} 
                    setFromWhat={setFromWhat} 
                />
            </div>
        </div>
    </div>
  )
}

export default Home