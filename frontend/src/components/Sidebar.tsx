import React from 'react';
import { useLocation } from 'react-router-dom';
import '../css/navbar.css';

export default function Sidebar() {
  const location = useLocation();

  const hiddenNavbarRoutes = ['/search', '/add-user', '/search/', '/add-user/'];

  const hideNavbar = hiddenNavbarRoutes.includes(location.pathname);

  if (hideNavbar) {
    return null;
  }

  return (
    <div className='navbar-container'>
      <a href='/profile'>
        <div className='logo' />
      </a>

      <div className='links-container'>
        <a href='/search'>Search</a>
        <a href='/profile'>Profile</a>
        <a href='/tests'>Tests</a>
      </div>
    </div>
  );
}
