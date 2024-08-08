import "../Styles/InvestmentsMain.css";
import Chart from "./Chart"
import Menu from "./Menu"
import Info from "./Info"
import { useEffect, useState } from "react";
import BlurPopout from "../BlurPopout";

function InvestmentsMain({ myStocks, error, myFinance, blurBack, setBlurBack, fromWhat, setFromWhat, setReload, reload, user, userData, setUserData, setAccessPage, setUser }) {
  const [clickIndex, setClickIndex] = useState(0)

  return (
    <div className="InvestmentsMain">
      {blurBack ? 
      (
        <BlurPopout 
          setBlurBack={setBlurBack} 
          fromWhat={fromWhat} 
          setReload={setReload} 
          reload={reload} 
          setClickIndex={setClickIndex} 
          clickIndex={clickIndex}
          user={user}
          userData={userData}
          setUserData={setUserData}
          setAccessPage={setAccessPage}
          setUser={setUser}
        />
      ) : (
        <></>
      )}
      <div className='body-wrapper'>
          <div className='chart-wrapper'>
            <Chart myStocks={myStocks} error={error} myFinance={myFinance} />
          </div>
          <div className='menu-wrapper'>
            <Menu myStocks={myStocks} error={error} myFinance={myFinance} setClickIndex={setClickIndex} setBlurBack={setBlurBack} setFromWhat={setFromWhat} setReload={setReload} reload={reload} clickIndex={clickIndex} user={user} />
          </div>
      </div>
      <div className='info-wrapper'>
        <Info myStocks={myStocks} myFinance={myFinance} clickIndex={clickIndex} error={error} />
      </div>
    </div>
  );
}

export default InvestmentsMain;