import React from 'react';
import AddUser from '../../components/AddUser';
import './add-user-page.css';

export default function AddUserPage() {
  return (
    <div className='add-user-container'>
      <h1 className='add-header header'>
        <span>Add User</span>
      </h1>
      <AddUser />
    </div>
  );
}
