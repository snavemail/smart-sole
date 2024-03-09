import React, { useEffect, useState } from 'react';
import '../css/loading.css';
import RightPrintIcon from '../icons/RightPrintIcon';
import LeftPrintIcon from '../icons/LeftPrintIcon';

export default function Loading() {
  return (
    <div className='loading-screen'>
      <div className='left-foot foot-div'>
        <LeftPrintIcon />
      </div>
      <div className='right-foot foot-div'>
        <RightPrintIcon />
      </div>
      <div className='loading-text'>Loading...</div>
    </div>
  );
}
