import axios from 'axios';
import { LoginData, RegisterData, UserData } from '@/types';
import { useRouter } from 'next/navigation';

function useUserActions() {
  const router = useRouter();
  const baseURL = 'http://localhost:8000/api';

  return {
    login,
    register,
    logout
  };

  // Login the user
  async function login(data: LoginData) {
    const res = await axios.post(`${baseURL}/auth/login/`, data);
    setUserData(res.data);
    router.push('/');
  }

  // Register the user
  async function register(data: RegisterData) {
    const res = await axios.post(`${baseURL}/auth/register/`, data);
    // Registering the account and tokens in the store
    setUserData(res.data);
    router.push('/');
  }

  // Logout the user
  function logout() {
    localStorage.removeItem('auth');
    router.push('/login');
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
      user: data.user
    })
  );
}

export { useUserActions, getUser, getAccessToken, getRefreshToken };
