import './Styles/App.css';
import Header from "./Components/Header";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Components/Home';
import Spending from './Debts/DebtsMain';
import Saving from "./Saving/SavingMain";
import Investments from "./Investments/InvestmentsMain";
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/Spending' element={<Spending />} />
          <Route exact path='/Saving' element={<Saving />} />
          <Route exact path='/Investments' element={<Investments />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
