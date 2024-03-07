import React from 'react';
import './App.css';
import Connect from './pages/Connect';
import Home from './pages/Home';
import { useBle } from './hooks/useBle';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const { isConnected } = useBle();
  return (
    <Router>
      <Routes>
        <Route path='/connect' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route index element={isConnected ? <Home /> : <Connect />} />
      </Routes>
    </Router>
  );
}

export default App;
