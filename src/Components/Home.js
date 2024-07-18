import React from 'react'
import Totals from "./Totals";
import Banking from "./Banking";
import Investments from "./Investments";
import Debts from "./Debts.js"
import "../Styles/Home.css"

function Home() {
  return (
    <div className="Home">
        <div className='grid-display'>
            <div className='grid-wrapper'>
                <Totals />
            </div>
            <div className='grid-wrapper'>
                <Debts />
            </div>
            <div className='grid-wrapper'>
                <Banking />
            </div>
            <div className='grid-wrapper'>
                <Investments />
            </div>
        </div>
    </div>
  )
}

export default Home