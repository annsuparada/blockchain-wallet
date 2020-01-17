import React from 'react';
import Chain from './components/Chain'
import Balance from './components/Balance'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>My wallet</h1>
      </header>
      <Balance />
      <Chain />
      
    </div>
  );
}

export default App;
