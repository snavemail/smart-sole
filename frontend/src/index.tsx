import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BLEProvider from './hooks/useBle';
import { ToastContainer } from 'react-toastify';
import ProfileProvider from './hooks/useProfile';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ProfileProvider>
      <BLEProvider>
        <App />
        <ToastContainer />
      </BLEProvider>
    </ProfileProvider>
  </React.StrictMode>,
);
