import React, { useState } from 'react';
import '../css/add-user.css';
import ShoeSizeInput from './ShoeSize';

export default function AddUser({ onAddUser }: { onAddUser: () => void }) {
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const json = JSON.stringify({
      email,
      first_name: firstName,
      last_name: lastName,
    });
    console.log(json);

    try {
      const userResponse = await fetch('http://127.0.0.1:8000/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          first_name: firstName,
          last_name: lastName,
        }),
      });
      if (!userResponse.ok) {
        console.log(userResponse);
        throw new Error('Failed to add user');
      }
      const user = await userResponse.json();
      const userId = user.id;

      console.log('userId', userId);
      console.log('dob', dob);

      const profileResponse = await fetch(`http://127.0.0.1:8000/api/profiles/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          dob: dob,
        }),
      });
      if (!profileResponse.ok) {
        throw new Error('Failed to create profile');
      }
      setEmail('');
      setFirstName('');
      setLastName('');
      setDob('');
      setError('');
      onAddUser();
      alert('User and profile created successfully');
    } catch (e) {
      setError('Error adding user');
    }
  };

  return (
    <div className='add-user-wrapper'>
      <form action='post' className='user-form' onSubmit={handleSubmit}>
        <div className='email-input'>
          <label htmlFor='email'>
            Email: <span className='required'>*</span>
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='name-row'>
          <div className='fname-input'>
            <label htmlFor='fname'>
              First Name: <span className='required'>*</span>
            </label>
            <input
              type='text'
              id='fname'
              name='fname'
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className='lname-input'>
            <label htmlFor='lname'>
              Last Name: <span className='required'>*</span>
            </label>
            <input
              type='text'
              id='lname'
              name='lname'
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className='dob-input'>
          <label htmlFor='dob'>
            Date of Birth: <span className='required'>*</span>
          </label>
          <input
            type='date'
            id='dob'
            name='dob'
            value={dob}
            onChange={e => setDob(e.target.value)}
            required
          />
        </div>
        <div className='name-row'>
          <ShoeSizeInput />
        </div>
        <div className='submit-button'>
          <button type='submit'>Add User</button>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
}
