import React from 'react';
import LoginForm from '../../components/authentication/LoginForm';
import './login.css';

export default function Login() {
  return (
    <div className='auth-container'>
      <div className='auth-form'>
        <LoginForm />
      </div>
    </div>
  );
}
