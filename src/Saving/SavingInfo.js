import React from 'react'
import "../Styles/SavingInfo.css"

function SavingInfo() {
  return (
    <div className='SavingInfo'>
        <div className='saving-goal-wrapper'>
            <div className='saving-goal-container'>
                <SavingGoal />
            </div>
        </div>
        <div className='saving-current-wrapper'>
            <div className='saving-current-container'>
                <SavingCurrent />
            </div>
        </div>
        <div>
        </div>
    </div>
  )
}

export default SavingInfo

function SavingGoal() {
    return (
        <h1>Saving Goal</h1>
    )
}

function SavingCurrent() {
    return (
        <h1>Saving Current</h1>
    )
}