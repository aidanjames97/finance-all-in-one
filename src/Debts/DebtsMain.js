import React from 'react'
import BlurPopout from '../BlurPopout'
import "../Styles/DebtsMain.css"
import Credit from './Overall'
import History from './History'
import Overall from './Credit'

function DebtsMain({ blurBack, setBlurBack, fromWhat, myDebts, error }) {
  return (
    <div className='DebtsMain'>
        {blurBack ? 
        (
          <BlurPopout setBlurBack={setBlurBack} fromWhat={fromWhat} />
        ) : (
        <></>
        )}
        <div className='debts-grid-wrapper'>
          <div className='debts-credit-left'>
            <Credit myDebts={myDebts} error={error} />
          </div>
          <div className='debts-history-centre'>
            <History myDebts={myDebts} error={error} />
          </div>
          <div className='debts-overall-right'>
            <Overall myDebts={myDebts} error={error} />
          </div>
        </div>
    </div>
  )
}

export default DebtsMain