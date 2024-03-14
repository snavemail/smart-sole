import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Profile, User } from '../types';

export default function ProfileDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
    return <div>Loading...</div>;
  }

  if (!user || !profile) {
    return <div>User or profile not found</div>;
  }

  return (
    <div className='main-div'>
      <h2>Profile Details</h2>
    </div>
  );
}
