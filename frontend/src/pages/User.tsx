import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Profile, Test, User } from '../types';
import Loading from './Loading';
import '../css/user-details.css';
import TestComponent from '../components/Test';
import ProfileDetails from '../components/Profile';

export default function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userTests, setUserTests] = useState<Test[]>([]);
  const [id, setId] = useState<number>(0);
  const [showProfile, setShowProfile] = useState<boolean>(true);

  const handleTestClick = (testId: number) => {
    setShowProfile(false);
    setId(testId);
  };

  const showProfilePage = () => {
    setShowProfile(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userResponse = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!userResponse.ok) {
          throw new Error('User not found');
        }
        const user = await userResponse.json();
        setUser(user);

        const profileResponse = await fetch(
          `http://127.0.0.1:8000/api/get-user-profile/${user.id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (!profileResponse.ok) {
          throw new Error('Profile not found');
        }
        const profile = await profileResponse.json();
        setProfile(profile);

        const testsResponse = await fetch(
          `http://127.0.0.1:8000/api/get-user-tests/${profile.id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (!testsResponse.ok) {
          throw new Error('Tests not found');
        }
        const tests = await testsResponse.json();
        setUserTests(tests);
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

  if (!user || !profile) {
    return <div>No User</div>;
  }

  return (
    <div className='container'>
      <div className='grid-left'>
        <div className='username'>
          <h1 className='profile-name-wrapper'>
            <span onClick={showProfilePage} className='profile-name'>
              {user.first_name} {user.last_name}
            </span>
          </h1>

          <p>{profile.dob}</p>
          {profile.shoe_size && <p>{profile.shoe_size}</p>}
        </div>
        <div className='tests-wrapper'>
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
          <a className='start-test-button' href={`/test/${profile.id}`}>
            Start Test
          </a>
        </div>
      </div>
      <div className='content'>
        {showProfile ? (
          <ProfileDetails user={user} profile={profile} loading={loading} />
        ) : (
          <>
            <h1>Graphs</h1>
            <p>This is the main content area of the page.</p>
            <p>{id}</p>
          </>
        )}
      </div>
    </div>
  );
}
