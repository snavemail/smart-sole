import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Test, User } from '../types';
import Loading from './Loading';
import '../css/user-details.css';

export default function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userTests, setUserTests] = useState<Test[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}`);
      setUser(response.data);
      setLoading(false);
    };
    fetchUser();
  }, [userId]);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <div>No User</div>;
  }

  return (
    <div className='container'>
      <div className='grid-left'>
        <div className='username'>
          <h1>
            <span>
              {user.first_name} {user.last_name}
            </span>
          </h1>
        </div>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </div>
      <div className='content'>
        {/* Main content area */}
        <h1>Content Area</h1>
        <p>This is the main content area of the page.</p>
      </div>
    </div>
  );
}
