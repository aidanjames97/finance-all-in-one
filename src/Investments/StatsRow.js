import React, { useState } from "react";
import "../Styles/StatsRow.css"
import LineChart from "../Charts/LineChart"
import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../API/Firebase"

// graph line colors constants
const GREEN_COLOR = 'rgba(0, 255, 80, 1)';
const RED_COLOR = 'rgba(255, 0, 80, 1)';

// formats num given
function formatNum(num) {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
}
function formatPercent(num) {
  return num.toFixed(2) + '%'
}

// to delete, sample data
const sampleData = [65, 59, 80, 81, 56, 55, 40, 59, 66, 88, 78, 60]

function StatsRow({ stock, finance, setClickedIndex, index, toRemove, setToRemove, setReload, reload, clickIndex, user }) {
  const [loading, setLoading] = useState(false);

  let textColor = GREEN_COLOR;
  if(finance.dp < 0) {
    textColor = RED_COLOR
  }

  async function del(id) {
    await deleteDoc(doc(db, `users/${user.uid}/stocks`, id));
  }

  function removeStock(id) {
    del(id)
    .then(() => {
      setLoading(false)
      setReload(!reload)
      setClickedIndex(0)
    })
  }

  if(loading) {
    return (
      <div className="Investments-error">
        <div className="loader"></div>
      </div>   
    )
  }

  return (
    <div className="Stats-Row">
      <div className="stats-row-wrapper">
        <button 
          className='stats-list-item-wrapper'
          onClick={() => setClickedIndex(index)}
          >
          <div className='stats-list-item'>
            <div className='stats-list-item-header'>
              <h1>{stock.ticker}</h1>
              <h3>{formatNum(stock.buyPrice)}</h3>
            </div>
            <div className='stats-list-item-graph'>
              <LineChart 
                dataIn={sampleData} 
                labelIn={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
                lineColor={GREEN_COLOR} 
                scaleDisplay={false} 
                lineWidth='2' />
            </div>
            <div className='stats-list-item-info'>
              <h1>{formatNum(stock.shares * finance.c)}</h1>
              <h2 style={{color: textColor}}>{formatNum((stock.shares * finance.d))}</h2>
              <h2 style={{color: textColor}} >{formatPercent(finance.dp)}</h2>
            </div>
          </div>
        </button>
        {toRemove ? 
        (
          <button onClick={() => {
            setLoading(true)
            setToRemove(false);
            removeStock(stock.id);
          }} className="stats-list-remove-button"
          >X</button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default StatsRow;