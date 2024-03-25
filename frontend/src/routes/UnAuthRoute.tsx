import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from '../hooks/user.actions';

export default function UnAuthRoute({ children }: { children: React.ReactNode }) {
  const { user } = getUser();

  return user ? <Navigate to='/' /> : <>{children}</>;
}
