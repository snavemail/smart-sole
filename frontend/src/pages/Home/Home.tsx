import React from 'react';
import { useUserActions } from '../../hooks/user.actions';

export default function Home() {
  const userActions = useUserActions();
  return (
    <div>
      <h1>Home</h1>
      <button onClick={userActions.logout}>Logout</button>
    </div>
  );
}
