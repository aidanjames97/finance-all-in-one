import React from 'react'
import BlurPopout from '../BlurPopout'
import "../Styles/DebtsMain.css"
import Credit from './Credit'
import History from './History'
import Overall from './Overall'

function DebtsMain({ blurBack, setBlurBack, setFromWhat, fromWhat, myDebts, error, setReload, reload, myCredit, userData, setUserData, user }) {
  return (
    <div className='DebtsMain'>
        {blurBack ? 
        (
          <BlurPopout 
            setBlurBack={setBlurBack} 
            fromWhat={fromWhat} 
            setReload={setReload} 
            reload={reload}
            userData={userData}
            user={user}
            setUserData={setUserData}
          />
        ) : (
        <></>
        )}
        <Credit 
          myCredit={myCredit} 
          error={error}
          setBlurBack={setBlurBack}
          setFromWhat={setFromWhat}
          setReload={setReload}
          reload={reload}
        />
        <History 
          myDebts={myDebts} 
          error={error} 
          setBlurBack={setBlurBack}
          setFromWhat={setFromWhat}
          setReload={setReload}
          reload={reload}
          userData={userData}
        />
        <Overall 
          myDebts={myDebts} 
          error={error} 
          setBlurBack={setBlurBack}
          setFromWhat={setFromWhat}
          setReload={setReload}
          reload={reload}
        />
    </div>
  )
}

export default DebtsMain