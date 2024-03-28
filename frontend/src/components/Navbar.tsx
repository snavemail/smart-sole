import React, { useEffect, useRef, useState } from 'react';
import { randomAvatar } from '../utils';
import '../css/navbar.css';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../hooks/user.actions';

export default function Navbar() {
  const { user } = getUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setDropdownOpen(false);
    }
  };

  return (
    <nav className='navbar'>
      <div className='navbar-brand'>
        <a href='/home'>
          <h1>SENS</h1>
        </a>
      </div>
      {user && (
        <div className='dropdown' onClick={toggleDropdown} ref={dropdownRef}>
          <div className='circle-img'>
            <img src={randomAvatar()} alt='Avatar' />
          </div>
          {dropdownOpen && (
            <div className='dropdown-menu'>
              <a href='/settings'>Settings</a>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
