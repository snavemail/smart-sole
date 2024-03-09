import React from 'react';
import './App.css';
import Connect from './pages/Connect';
import Home from './pages/Home';
import { useBle } from './hooks/useBle';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loading from './pages/Loading';

function App() {
  const { isConnected } = useBle();
  return (
    <Router>
      <Routes>
        <Route index element={isConnected ? <Home /> : <Connect />} />
        <Route path='connect' element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route path='loading' element={<Loading />} />
        <Route path='/*' element={<div>404</div>} />
      </Routes>
    </Router>
  );
}

export default App;
