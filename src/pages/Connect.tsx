import React from 'react';
import { useBle } from '../hooks/useBle';
import '../css/connect.css';

export default function Connect() {
  const { connect } = useBle();
  return (
    <div className='connect-wrapper'>
      <button className='connect-button' onClick={connect}>
        Connect To Smart Sole
      </button>
    </div>
    // <div
    //   style={{
    //     height: '100vh',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   }}>
    //   {isConnected ? <h1>Connected {data}</h1> : <button onClick={connect}>Connect</button>}
    // </div>
  );
}
