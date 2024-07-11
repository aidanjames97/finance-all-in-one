import './App.css';
import Header from "./Header";
import Totals from "./Totals";
import Banking from "./Banking";
import Investments from "./Investments";
import Debts from "./Debts.js"

function App() {
  return (
    <div className="App">
      <div className='header-wrapper'>
        <Header active={'Home'} />
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
