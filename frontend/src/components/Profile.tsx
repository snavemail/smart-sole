import React from 'react';
import { Profile, User } from '../types';

export default function ProfileDetails({
  user,
  profile,
  loading,
}: {
  user: User;
  profile: Profile;
  loading: boolean;
}) {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !profile) {
    return <div>User or profile not found</div>;
  }

  return (
    <div className='main-div'>
      <h2>{user.first_name}</h2>
      <p>{user.email}</p>
      <p>{profile.dob}</p>
    </div>
  );
}
