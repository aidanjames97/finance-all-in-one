import React from 'react'
import "./Debts.css"

function Debts() {
  return (
    <div className='Debts'>
      <div className='debts-heading'>
        <div className='debts-value'>
          <h2>Due: </h2>
          <h1>$TEMP.00</h1>
        </div>
      </div>
    </div>
  )
}

export default Debts