import React from 'react'
import "./Styles/BlurPopout.css"

function BlurPopout({ setBlurBack, fromWhat }) {
  return (
    <div className='blur-background-wrapper'>
        <div className='blur-popout-wrapper'>
            <div className='blur-popout-container'>
                <button onClick={() => setBlurBack(false)}>X</button>
            </div>
            <h1>{fromWhat}</h1>
        </div>
    </div>
  )
}

export default BlurPopout