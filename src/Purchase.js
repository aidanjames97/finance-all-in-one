import React from 'react'
import "./Styles/Purchase.css"

function Purchase({ setDisplayPurchases, selectedPurchase, user, signIn, setAccessPage }) {
    return (
        <div className='purchase-popout'>
          <div className='purchase-wrapper'>
            <div className='purchase-container'>
                <div className='purchase-header-container'>
                    <h1>Purchase {selectedPurchase} Subscription</h1>
                    <button onClick={() => setDisplayPurchases(false)}>X</button>
                </div>
                <div className='purchase-body-container'>
                {user ? (
                    <div className='body-not-signed-in'>
                        <h1>Go to dashboard to make purchase</h1>
                        <button
                            onClick={() => {setAccessPage(true); setDisplayPurchases(false)}}
                        >Dashboard</button>
                    </div>
                ) : (
                    <div className='body-not-signed-in'>
                        <h1>Please sign in to make a purchase</h1>
                        <button
                            onClick={() => {signIn()}}
                        >Sign In</button>
                    </div>
                )}
                </div>
            </div>
          </div>
        </div>
    )
}

export default Purchase