import React from 'react'
import BlurPopout from '../BlurPopout'
import "../Styles/SavingMain.css"
import BarChart from "../Charts/BarChart"
import { reload } from 'firebase/auth'

const sampleDataExp = [600, 500, 700, 610, 460, 350, 300, 490, 560, 800, 608, 440]
const goal = [550, 550, 550, 550, 550, 550, 550, 550, 550, 550, 550, 550]

function SavingMain({ blurBack, setBlurBack, fromWhat, setReload, reload, user, userData, setUserData }) {
  return (
    <div className='SavingMain'>
      {blurBack ? 
      (
        <BlurPopout 
          setBlurBack={setBlurBack} 
          fromWhat={fromWhat}
          setReload={setReload}
          reload={reload}
          user={user}
          userData={userData}
          setUserData={setUserData}
        />
      ) : (
      <></>
      )}
      <div className='saving-chart-wrapper'>
        <BarChart 
          dataIncome={sampleDataExp}
          barColorOne={'lightblue'}
          dataThree={goal}
          colorThree={'lightgreen'}
        />
      </div>
      <div className='saving-body-wrapper'>

      </div>
    </div>
  )
}

export default SavingMain