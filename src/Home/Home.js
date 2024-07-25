import React, { useEffect } from 'react'
import Totals from "./Totals";
import Banking from "./Banking";
import Investments from "./Investments";
import Debts from "./Debts.js"
import "../Styles/Home.css"
import BlurPopout from "../BlurPopout.js"

function Home( { myStocks, myDebts, error, myFinance, blurBack, setBlurBack, fromWhat }) {
  return (
    <div className="Home">
        {blurBack ? 
        (
            <BlurPopout setBlurBack={setBlurBack} fromWhat={fromWhat} />
        ) : (
        <></>
        )}
        <div className='grid-display'>
            <div className='grid-wrapper'>
                <Totals />
            </div>
            <div className='grid-wrapper'>
                <Debts myDebts={myDebts} error={error} />
            </div>
            <div className='grid-wrapper'>
                <Banking />
            </div>
            <div className='grid-wrapper'>
                <Investments myStocks={myStocks} error={error} myFinance={myFinance} />
            </div>
        </div>
    </div>
  )
}

export default Home