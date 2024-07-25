import "../Styles/InvestmentsMain.css";
import Chart from "./Chart"
import Menu from "./Menu"
import Info from "./Info"
import { useEffect, useState } from "react";
import BlurPopout from "../BlurPopout";

function InvestmentsMain({ myStocks, error, myFinance, blurBack, setBlurBack, fromWhat, setFromWhat }) {
  const [singleStockInfo, setSingleStockInfo] = useState(myStocks[0])
  const [singleFinanceInfo, setSingleFinanceInfo] = useState(myFinance[0])
  const [clickIndex, setClickIndex] = useState(0)

  useEffect(() => {
    setSingleStockInfo(myStocks[clickIndex])
    setSingleFinanceInfo(myFinance[clickIndex])
  }, [clickIndex])

  return (
    <div className="InvestmentsMain">
      {blurBack ? 
      (
        <BlurPopout setBlurBack={setBlurBack} fromWhat={fromWhat} />
      ) : (
        <></>
      )}
      <div className='body-wrapper'>
          <div className='chart-wrapper'>
            <Chart myStocks={myStocks} error={error} myFinance={myFinance} />
          </div>
          <div className='menu-wrapper'>
            <Menu myStocks={myStocks} error={error} myFinance={myFinance} setClickIndex={setClickIndex} setBlurBack={setBlurBack} setFromWhat={setFromWhat} />
          </div>
      </div>
      <div className='info-wrapper'>
        <Info singleStockInfo={singleStockInfo} singleFinanceInfo={singleFinanceInfo} error={error} />
      </div>
    </div>
  );
}

export default InvestmentsMain;