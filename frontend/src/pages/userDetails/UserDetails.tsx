import React from 'react';
import './user-details.css';
import { useProfile } from '../../hooks/useProfile';
import { numberToGender } from '../../utils';

export default function UserDetails() {
  const { user, profile } = useProfile();

  if (!user || !profile) {
    return <div>No User</div>;
  }

  return (
    <div className='container'>
      <h2>{user.first_name}</h2>
      <p>{user.email}</p>
      <p>{profile.dob}</p>
      <p>{numberToGender(profile.gender)}</p>
    </div>
  );
}
