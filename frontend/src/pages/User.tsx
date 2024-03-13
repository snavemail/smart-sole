import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Profile, Test, User } from '../types';
import Loading from './Loading';
import '../css/user-details.css';
import TestComponent from '../components/Test';

export default function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userTests, setUserTests] = useState<Test[]>([]);
  const [id, setId] = useState<number>(0);

  const handleTestClick = (testId: number) => {
    setId(testId);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userResponse = await axios.get(`http://127.0.0.1:8000/api/users/${userId}`);
        setUser(userResponse.data);
        const profileResponse = await axios.get(
          `http://127.0.0.1:8000/api/get-user-profile/${userResponse.data.id}`,
        );
        setProfile(profileResponse.data);

        const testsResponse = await axios.get(
          `http://127.0.0.1:8000/api/get-user-tests/${profileResponse.data.id}`,
        );
        setUserTests(testsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchData();
    }
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
        <div className='test-wrapper'>
          {userTests
            .sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime())
            .map(test => (
              <button
                className={`test-button ${test.id === id ? `test-selected` : ''}`}
                onClick={() => handleTestClick(test.id)}>
                <TestComponent key={test.id} test={test} />
              </button>
            ))}
        </div>
        <div className='button-container'>
          <button className='start-test-button'>Start Test</button>
        </div>
      </div>
      <div className='content'>
        <h1>Graphs</h1>
        <p>This is the main content area of the page.</p>
        <p>{id}</p>
      </div>
    </div>
  );
}
