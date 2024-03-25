import React from 'react';
import RegistrationForm from '../../components/authentication/RegistrationForm';
import './registration.css';

export default function Registration() {
  return (
    <div className='auth-container'>
      <div className='auth-form'>
        <RegistrationForm />
      </div>
    </div>
  );
}
