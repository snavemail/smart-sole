import React from 'react';
import { useBle } from '../../hooks/useBle';
import './connect.css';

export default function Connect() {
  const { connect } = useBle();

  const handleConnect = async () => {
    connect();
  };

  return (
    <div className='connect-wrapper'>
      <div className='connect-header-div'>
        <h1 className='connect-header-text'>
          <span>Welcome to Smart Sole</span>
        </h1>
      </div>
      <button className='connect-button' onClick={handleConnect}>
        Connect To Smart Sole
      </button>
    </div>
  );
}
