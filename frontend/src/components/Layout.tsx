import React from 'react';
import Navbar from './Navbar';
import '../css/layout.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <div className='main-wrapper'>{children}</div>
    </>
  );
};

export default Layout;
