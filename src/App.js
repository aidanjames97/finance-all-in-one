import './Styles/App.css';
import Header from "./Components/Header";
import Totals from "./Components/Totals";
import Banking from "./Components/Banking";
import Investments from "./Components/Investments";
import Debts from "./Components/Debts.js"
import { useState } from 'react';

function App() {
  const [active, setActive] = useState('Home');

  return (
    <div className="App">
      <div className='header-wrapper'>
        <Header active={active} setActive={setActive} />
      </div>
      <div className='grid-display'>
        <div className='grid-wrapper'>
          <Totals />
        </div>
        <div className='grid-wrapper'>
          <Debts />
        </div>
        <div className='grid-wrapper'>
          <Banking />
        </div>
        <div className='grid-wrapper'>
          <Investments />
        </div>
      </div>
    </div>
  );
}

export default App;
