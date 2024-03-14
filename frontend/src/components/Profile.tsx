import React from 'react';
import { Profile, User } from '../types';
import { numberToGender } from '../utils';

export default function ProfileDetails({ user, profile }: { user: User; profile: Profile }) {
  if (!user || !profile) {
    return <div>User or profile not found</div>;
  }

  return (
    <div className='main-div'>
      <h2>{user.first_name}</h2>
      <p>{user.email}</p>
      <p>{profile.dob}</p>
      <p>{numberToGender(profile.gender)}</p>
    </div>
  );
}
