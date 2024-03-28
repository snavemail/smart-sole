import React from 'react';
import LoginForm from './LoginForm';
import '@/css/auth.css';

export default function Login() {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <LoginForm />
      </div>
    </div>
  );
}
