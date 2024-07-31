import React from 'react'
import BlurPopout from '../BlurPopout'
import "../Styles/DebtsMain.css"
import Credit from './Credit'
import History from './History'
import Overall from './Overall'

function DebtsMain({ blurBack, setBlurBack, setFromWhat, fromWhat, myDebts, error, setReload, reload, myCredit }) {
  return (
    <div className='DebtsMain'>
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
        <div className='debts-grid-wrapper'>
          <div className='debts-credit-left'>
            <Credit 
              myCredit={myCredit} 
              error={error}
              setBlurBack={setBlurBack}
              setFromWhat={setFromWhat}
              setReload={setReload}
              reload={reload}
          />
          </div>
          <div className='debts-history-centre'>
            <History 
              myDebts={myDebts} 
              error={error} 
            />
          </div>
          <div className='debts-overall-right'>
            <Overall 
              myDebts={myDebts} 
              error={error} 
              setBlurBack={setBlurBack}
              setFromWhat={setFromWhat}
              setReload={setReload}
              reload={reload}
            />
          </div>
        </div>
    </div>
  )
}

export default DebtsMain