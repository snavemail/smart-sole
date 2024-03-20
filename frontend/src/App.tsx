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
import { useProfile } from './hooks/useProfile';
import UserTests from './pages/userTests';

function App() {
  const { isConnected } = useBle();
  const { user, profile } = useProfile();
  const validData = user && profile;
  return (
    <Router>
      <div className='ss-container'>
        <Navbar />
        <div className='main-content'>
          <Routes>
            <Route
              index
              element={
                validData ? <Navigate to='/profile' replace /> : <Navigate to='/search' replace />
              }
            />
            <Route path='search' element={<SearchPage />} />
            <Route path='add-user' element={<AddUserPage />} />
            <Route
              path='profile'
              element={validData ? <UserDetails /> : <Navigate to='/search' replace />}
            />
            <Route
              path='tests'
              element={validData ? <UserTests /> : <Navigate to='/search' replace />}
            />
            <Route
              path='test'
              element={
                validData ? isConnected ? <Test /> : <Connect /> : <Navigate to='/search' replace />
              }
            />
            <Route path='/*' element={<NoPage />} />
            {/*Not needed just for testing */}
            <Route path='connect' element={<Connect />} />
            <Route path='test' element={<Test />} />
            <Route path='loading' element={<Loading />} />
            <Route path='graph' element={<Graph />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
