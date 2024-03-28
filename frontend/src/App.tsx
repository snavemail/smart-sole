import React from 'react';
import { useBle } from './hooks/useBle';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './routes/ProtectedRoute';
import UnAuthRoute from './routes/UnAuthRoute';
import Registration from './pages/AuthPages/Registration';
import Login from './pages/AuthPages/Login';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import Layout from './components/Layout';
import Profile from './pages/Profile';

function App() {
  const { isConnected } = useBle();
  return (
    <BrowserRouter>
      <Layout>
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
          <Route
            path='/settings'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
