import React from 'react';
import { useBle } from './hooks/useBle';
import './App.css';

function App() {
  const { connect, isConnected, data } = useBle();
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {isConnected ? <h1>Connected {data}</h1> : <button onClick={connect}>Connect</button>}
    </div>
  );
}

export default App;
