import React from 'react'
import "../Styles/Loading.css"
import "../Styles/History.css"

function History({ myDebts, error }) {
    if(error) {
        return (
            <div className='History-error'>Could Not Load Data</div>
        )
    } else if(myDebts) {
        return (
            <div className='History'>
                <div className='overall-header'>
                    History
                </div>
            </div>
        )  
    } else {
        return (
            <div className='History-error'>
              <div className='loader'></div>
            </div>
        )
    }
}

export default History