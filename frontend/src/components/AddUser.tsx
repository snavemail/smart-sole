import React, { useState } from 'react';
import '../css/add-user.css';
import { cmSizes, euSizes, ukSizes, usSizes } from '../constants';
import '../css/shoe-size.css';

export default function AddUser({ onAddUser }: { onAddUser: () => void }) {
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [selectedSizeUnit, setSelectedSizeUnit] = useState('US');
  const [usSize, setUsSize] = useState('');
  const [euSize, setEuSize] = useState('');
  const [ukSize, setUkSize] = useState('');
  const [cmSize, setCmSize] = useState('');

  const handleSizeUnitChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSelectedSizeUnit(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

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
        throw new Error('Failed to add user');
      }
      const user = await userResponse.json();
      const userId = user.id;
      console.log('user', user);

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
      setUsSize('');
      setEuSize('');
      setCmSize('');
      setUkSize('');
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
          <div className='shoe-size-input'>
            <label htmlFor='shoe-size-unit'>Select Size Unit:</label>
            <div className='unit-selector-wrapper'>
              <div className='select-unit'>
                <select
                  id='shoe-size-unit'
                  onChange={handleSizeUnitChange}
                  value={selectedSizeUnit}>
                  <option value='US'>US</option>
                  <option value='EU'>EU</option>
                  <option value='UK'>UK</option>
                  <option value='CM'>CM</option>
                </select>
              </div>
              <div className='select-size'>
                {selectedSizeUnit === 'US' && (
                  <select value={usSize} onChange={e => setUsSize(e.target.value)}>
                    <option value=''>Select Size</option>
                    {usSizes.map(size => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                )}
                {selectedSizeUnit === 'EU' && (
                  <select value={euSize} onChange={e => setEuSize(e.target.value)}>
                    <option value=''>Select Size</option>
                    {euSizes.map(size => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                )}
                {selectedSizeUnit === 'UK' && (
                  <select value={ukSize} onChange={e => setUkSize(e.target.value)}>
                    <option value=''>Select Size</option>
                    {ukSizes.map(size => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                )}
                {selectedSizeUnit === 'CM' && (
                  <select value={cmSize} onChange={e => setCmSize(e.target.value)}>
                    <option value=''>Select Size</option>
                    {cmSizes.map(size => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='submit-button'>
          <button type='submit' className='add-user-button'>
            Add User
          </button>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
}
