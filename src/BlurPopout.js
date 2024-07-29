import React from 'react'
import "./Styles/BlurPopout.css"

function BlurPopout({ setBlurBack, fromWhat }) {
  return (
    <div className='blur-background-wrapper'>
        <div className='blur-popout-wrapper'>
          <div className='blur-popout-container'>
            {fromWhat === 'profile' ? 
            (
              <ProfilePopout setBlurBack={setBlurBack} />
            ) : (
              <AddStockPopout setBlurBack={setBlurBack} />
            )}
          </div>
        </div>
    </div>
  )
}

export default BlurPopout

function ProfilePopout({ setBlurBack }) {
  return (
    <div className='Profile-Popout'>
      <div className='profile-popout-header'>
        <h1>Profile</h1>
        <button className='popout-exit' onClick={() => setBlurBack(false)}>X</button>
      </div>
    </div>
  )
}

function AddStockPopout({ setBlurBack }) {
  return (
    <div className='Add-Stock-Popout'>
      <div className='profile-popout-header'>
        <h1>Add Stock</h1>
        <button className='popout-exit' onClick={() => setBlurBack(false)}>X</button>
      </div>
    </div>
  )
}