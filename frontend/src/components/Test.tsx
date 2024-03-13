import React from 'react';
import { Test } from '../types';
import '../css/test-component.css';
import { formatDate } from '../utils';

export default function TestComponent({ test }: { test: Test }) {
  return (
    <div className='test-container'>
      <div className='top-row'>
        <span className='test-name'>{test.name}</span>
      </div>
      <div className='bottom-row'>
        <div className='left'>{formatDate(test.start_time)}</div>
        <div className='right'>{test.duration}ms</div>
      </div>
    </div>
  );
}
