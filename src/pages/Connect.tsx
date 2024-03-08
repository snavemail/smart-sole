import React from 'react';
import { useBle } from '../hooks/useBle';
import '../css/connect.css';

export default function Connect() {
  const { connect } = useBle();

  const handleConnect = async () => {
    connect();
  };

  return (
    <div className='connect-wrapper'>
      <button className='connect-button' onClick={handleConnect}>
        Connect To Smart Sole
      </button>
    </div>
  );
}
