import React from 'react';
import { Link } from 'react-router-dom';
import './nopage.css';

export default function NoPage() {
  return (
    <div className='no-page-container'>
      <h1 className='title'>404</h1>
      <p className='message'>Oops! Page not found.</p>
      <Link to='/' className='button'>
        Go back to Home
      </Link>
    </div>
  );
}
