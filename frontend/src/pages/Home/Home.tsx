import React from 'react';
import { useUserActions } from '../../hooks/user.actions';
import Navbar from '../../components/Navbar';
import Layout from '../../components/Layout';

export default function Home() {
  const userActions = useUserActions();
  return <div>Hello</div>;
}
