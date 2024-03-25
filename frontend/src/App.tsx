import React from 'react';
import { useBle } from './hooks/useBle';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { useProfile } from './hooks/useProfile';
import ProtectedRoute from './routes/ProtectedRoute';
import UnAuthRoute from './routes/UnAuthRoute';
import Registration from './pages/Registration';
import Login from './pages/Login';

function App() {
  const { isConnected } = useBle();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              {/* <Home /> */}
              <div>Home</div>
            </ProtectedRoute>
          }
        />
        <Route path='/register/' element={<Registration />} />
        <Route path='/login/' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
