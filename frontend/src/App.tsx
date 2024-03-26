import React from 'react';
import { useBle } from './hooks/useBle';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './routes/ProtectedRoute';
import UnAuthRoute from './routes/UnAuthRoute';
import Registration from './pages/AuthPages/Registration';
import Login from './pages/AuthPages/Login';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage/LandingPage';

function App() {
  const { isConnected } = useBle();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <UnAuthRoute>
              <LandingPage />
            </UnAuthRoute>
          }
        />
        <Route
          path='/register/'
          element={
            <UnAuthRoute>
              <Registration />
            </UnAuthRoute>
          }
        />
        <Route
          path='/login/'
          element={
            <UnAuthRoute>
              <Login />
            </UnAuthRoute>
          }
        />
        <Route
          path='/home'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
