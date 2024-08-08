import React from 'react'
import BlurPopout from '../BlurPopout'
import "../Styles/SavingMain.css"
import BarChart from "../Charts/BarChart"
import SavingInfo from "./SavingInfo"

const sampleDataExp = [600, 500, 700, 610, 460, 350, 300, 490, 560, 800, 608, 440]
const goal = [550, 550, 550, 550, 550, 550, 550, 550, 550, 550, 550, 550]

function SavingMain({ blurBack, setBlurBack, fromWhat, setReload, reload, user, userData, setUserData, setAccessPage, setUser }) {
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
          setUser={setUser}
          userData={userData}
          setUserData={setUserData}
          setAccessPage={setAccessPage}
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
        <div className='saving-body-container'>
          <SavingInfo />
        </div>
      </div>
    </div>
  )
}

export default SavingMain