import React from 'react';
import { useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const hiddenNavbarRoutes = ['/search', '/add-user', '/search/', '/add-user/'];

  const hideNavbar = hiddenNavbarRoutes.includes(location.pathname);

  if (hideNavbar) {
    return null;
  }

  return <div className='navbar-container'>navbar</div>;
}

export default Navbar;
