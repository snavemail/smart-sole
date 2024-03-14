import React from 'react';
import './App.css';
import Connect from './pages/Connect';
import Test from './pages/Test';
import { useBle } from './hooks/useBle';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loading from './pages/Loading';
import Graph from './pages/Graph';
import NoPage from './pages/NoPage';
import Admin from './pages/Admin';
import User from './pages/User';
import Profile from './components/Profile';

function App() {
  const { isConnected } = useBle();
  return (
    <Router>
      <Routes>
        <Route index element={<Admin />} />
        <Route path='user/:userId' element={<User />} />
        <Route path='test/:profileId/' element={isConnected ? <Test /> : <Connect />} />
        <Route path='connect' element={<Connect />} />
        <Route path='test' element={<Test />} />
        <Route path='loading' element={<Loading />} />
        <Route path='graph' element={<Graph />} />
        <Route path='/*' element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
