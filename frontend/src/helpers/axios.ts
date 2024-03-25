import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { getAccessToken, getRefreshToken, getUser } from '../hooks/user.actions';

const axiosService = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosService.interceptors.request.use(async config => {
  config.headers.Authorization = `Bearer ${getAccessToken()}`;
  return config;
});

axiosService.interceptors.response.use(
  res => Promise.resolve(res),
  err => Promise.reject(err),
);

const refreshAuthLogic = async (failedRequest: any) => {
  try {
    const response = await axios.post(
      '/auth/refresh/',
      {
        refresh: getRefreshToken(),
      },
      {
        baseURL: 'http://localhost:8000/api',
      },
    );

    const { access } = response.data;
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + access;
    localStorage.setItem(
      'auth',
      JSON.stringify({
        access,
        refresh: getRefreshToken(),
        user: getUser(),
      }),
    );
  } catch (err) {
    localStorage.removeItem('auth');
  }
};

createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export async function fetcher(url: string) {
  const res = await axiosService.get(url);
  return res.data;
}
export default axiosService;
