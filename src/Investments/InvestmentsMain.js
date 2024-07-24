import "../Styles/InvestmentsMain.css";
import Chart from "./Chart"
import Menu from "./Menu"
import Info from "./Info"
import { useState } from "react";

function InvestmentsMain({ myStocks, error, myFinance }) {
  const [singleStockInfo, setSingleStockInfo] = useState(myStocks[0])
  const [singleFinanceInfo, setSingleFinanceInfo] = useState(myFinance[0])

  return (
    <div className="InvestmentsMain">
      <div className='body-wrapper'>
          <div className='chart-wrapper'>
            <Chart myStocks={myStocks} error={error} myFinance={myFinance} />
          </div>
          <div className='menu-wrapper'>
            <Menu myStocks={myStocks} error={error} myFinance={myFinance} />
          </div>
      </div>
      <div className='info-wrapper'>
        <Info singleStockInfo={singleStockInfo} singleFinanceInfo={singleFinanceInfo} error={error} />
      </div>
    </div>
  );
}

export default InvestmentsMain;