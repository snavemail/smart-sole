import React from 'react';
import { useBle } from './hooks/useBle';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Connect from './pages/connect';
import Test from './pages/test';
import Loading from './pages/Loading';
import Graph from './pages/Graph';
import NoPage from './pages/noPage/NoPage';
import SearchPage from './pages/search';
import UserDetails from './pages/userDetails';
import './App.css';
import AddUserPage from './pages/addUserPage';
import Navbar from './components/Navbar';

function App() {
  const { isConnected } = useBle();
  return (
    <Router>
      <div className='ss-container'>
        <Navbar />
        <div className='main-content'>
          <Routes>
            <Route index element={<Navigate to='/search' replace />} />
            <Route path='search' element={<SearchPage />} />
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
