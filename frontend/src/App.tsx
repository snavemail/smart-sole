import React from 'react';
import { useBle } from './hooks/useBle';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Connect from './pages/connect';
import Test from './pages/test';
import Loading from './pages/Loading';
import Graph from './pages/Graph';
import NoPage from './pages/NoPage';
import Admin from './pages/admin';
import UserDetails from './pages/user/';
import './App.css';
import AddUserPage from './pages/addUserPage';

function App() {
  const { isConnected } = useBle();
  return (
    <Router>
      <div className='ss-container'>
        <div className='navbar-container'>navbar</div>
        <div className='main-content'>
          <Routes>
            <Route index element={<Admin />} />
            <Route path='add-user' element={<AddUserPage />} />
            <Route path='user/:userId' element={<UserDetails />} />
            <Route path='test/:profileId/' element={isConnected ? <Test /> : <Connect />} />
            <Route path='connect' element={<Connect />} />
            <Route path='test' element={<Test />} />
            <Route path='loading' element={<Loading />} />
            <Route path='graph' element={<Graph />} />
            <Route path='/*' element={<NoPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
