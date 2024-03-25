import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from '../hooks/user.actions';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = getUser();

  return user ? <>{children}</> : <Navigate to='/login/' />;
}
