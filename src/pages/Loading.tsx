import React, { useEffect, useState } from 'react';
import '../css/loading.css';
import RightPrintIcon from '../icons/RightPrintIcon';
import LeftPrintIcon from '../icons/LeftPrintIcon';
import { loadingStrings } from '../utils';
import { getRandomString } from '../utils/loading';

export default function Loading() {
  const [loadingText, setLoadingText] = useState('Loading');

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(getRandomString(loadingText, loadingStrings));
    }, 2000);
    return () => clearInterval(interval);
  }, [loadingText]);

  return (
    <div className='loading-screen'>
      <div className='left-foot foot-div'>
        <LeftPrintIcon />
      </div>
      <div className='right-foot foot-div'>
        <RightPrintIcon />
      </div>
      <div className='loading-container'>
        <p className='loading-text'>
          <span>{loadingText}...</span>
        </p>
      </div>
      <div className='next-div'>
        <a href='/graph'>Next (Graph)</a>
      </div>
      <div className='next-div'>
        <a href='/gif'>Next (GIF)</a>
      </div>
    </div>
  );
}
