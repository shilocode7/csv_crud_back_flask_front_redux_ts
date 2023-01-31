import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { DimondsManage } from './features/student/DimondsManage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DimondsManage></DimondsManage>
      </header>
    </div>
  );
}

export default App;
