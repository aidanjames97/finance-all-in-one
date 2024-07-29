import React from 'react'
import BlurPopout from '../BlurPopout'

function SavingMain({ blurBack, setBlurBack, fromWhat }) {
  return (
    <div className='SavingMain'>
      {blurBack ? 
      (
        <BlurPopout setBlurBack={setBlurBack} fromWhat={fromWhat} />
      ) : (
      <></>
      )}
    </div>
  )
}

export default SavingMain