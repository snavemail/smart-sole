import React from 'react';
import './App.css';
import Connect from './pages/Connect';
import Home from './pages/Home';
import { useBle } from './hooks/useBle';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const { isConnected } = useBle();
  console.log('isConnected:', isConnected);

  return (
    <Router>
      <Routes>
        <Route path='/' element={isConnected ? <Home /> : <Connect />} />
        <Route path='connect' element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route path='/*' element={<div>404</div>} />
      </Routes>
    </Router>
  );
}

export default App;
