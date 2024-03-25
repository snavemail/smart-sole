import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginData, RegisterData, UserData } from '../types';

function useUserActions() {
  const navigate = useNavigate();
  const baseURL = 'http://localhost:8000/api';

  return {
    login,
    register,
    logout,
  };

  // Login the user
  async function login(data: LoginData) {
    try {
      const res = await axios.post(`${baseURL}/auth/login/`, data);
      setUserData(res.data);
      navigate('/');
    } catch (err: any) {
      throw err;
    }
  }

  // Register the user
  async function register(data: RegisterData) {
    try {
      const res = await axios.post(`${baseURL}/auth/register/`, data);
      // Registering the account and tokens in the store
      setUserData(res.data);
      navigate('/');
    } catch (err: any) {
      throw err;
    }
  }

  // Logout the user
  function logout() {
    localStorage.removeItem('auth');
    navigate('/login');
  }
}

function getUser() {
  const auth = JSON.parse(localStorage.getItem('auth') || '{}') || null;
  if (auth) {
    return auth;
  } else {
    return null;
  }
}

// Get the access token
function getAccessToken() {
  const auth = JSON.parse(localStorage.getItem('auth') || '{}');
  return auth.access;
}

// Get the refresh token
function getRefreshToken() {
  const auth = JSON.parse(localStorage.getItem('auth') || '{}');
  return auth.refresh;
}

// Set the access, token and user property
function setUserData(data: UserData) {
  localStorage.setItem(
    'auth',
    JSON.stringify({
      access: data.access,
      refresh: data.refresh,
      user: data.user,
    }),
  );
}

export { useUserActions, getUser, getAccessToken, getRefreshToken };
