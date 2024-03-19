import React from 'react';
import AddUser from '../../components/AddUser';
import './add-user-page.css';
import ReturnIcon from '../../icons/ReturnIcon';

export default function AddUserPage() {
  return (
    <div className='add-user-container'>
      <div className='header-section'>
        <h1 className='add-header header'>
          <span>Add User</span>
        </h1>
        <div className='icon-container'>
          <a href={`/profile`} className='add-user-link'>
            <ReturnIcon />
          </a>
        </div>
      </div>
      <AddUser />
    </div>
  );
}
