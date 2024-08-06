import React from 'react'
import BlurPopout from '../BlurPopout'
import "../Styles/SavingMain.css"
import BarChart from "../Charts/BarChart"

const sampleDataExp = [600, 500, 700, 610, 460, 350, 300, 490, 560, 800, 608, 440]
const goal = [550, 550, 550, 550, 550, 550, 550, 550, 550, 550, 550, 550]

function SavingMain({ blurBack, setBlurBack, fromWhat }) {
  return (
    <div className='SavingMain'>
      {blurBack ? 
      (
        <BlurPopout setBlurBack={setBlurBack} fromWhat={fromWhat} />
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