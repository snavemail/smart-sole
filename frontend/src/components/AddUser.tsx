import React, { useEffect, useState } from 'react';
import { cmSizes, euSizes, ukSizes, usSizes } from '../constants';
import '../css/add-user.css';
import { Size } from '../types';

export default function AddUser() {
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [gender, setGender] = useState<number>(0); //0-M, 1-F, 2-Other
  const [error, setError] = useState<string>('');
  const [size, setSize] = useState<Size>({ unit: 'US', size: '' });
  const [sizeChart, setSizeChart] = useState(usSizes);

  useEffect(() => {
    switch (size.unit) {
      case 'US':
        setSizeChart(usSizes);
        break;
      case 'EU':
        setSizeChart(euSizes);
        break;
      case 'UK':
        setSizeChart(ukSizes);
        break;
      case 'CM':
        setSizeChart(cmSizes);
        break;
      default:
        setSizeChart(usSizes);
    }
  }, [size]);

  const handleSizeUnitChange = (event: any) => {
    setSize({ unit: event.target.value, size: size.size });
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

      const profileResponse = await fetch(`http://127.0.0.1:8000/api/profiles/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          dob: dob,
          gender: gender,
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
      setSize({ unit: size.unit, size: '' });
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
        <div className='birth-gender-row'>
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
          <div className='gender-input'>
            <label htmlFor='gender'>
              Gender <span className='required'>*</span>
            </label>
            <select id='gender' onChange={e => setGender(parseInt(e.target.value))} value={gender}>
              <option value={0}>Male</option>
              <option value={1}>Female</option>
              <option value={2}>Other</option>
              <option value={3}>Prefer not to say</option>
            </select>
          </div>
        </div>

        <div className='name-row'>
          <div className='shoe-size-input'>
            <label htmlFor='shoe-size-unit'>Select Size Unit:</label>
            <div className='unit-selector-wrapper'>
              <div className='select-unit'>
                <select id='shoe-size-unit' onChange={handleSizeUnitChange} value={size.unit}>
                  <option value='US'>US</option>
                  <option value='EU'>EU</option>
                  <option value='UK'>UK</option>
                  <option value='CM'>CM</option>
                </select>
              </div>
              <div className='select-size'>
                <select
                  value={size.size}
                  onChange={e => setSize({ unit: size.unit, size: e.target.value })}>
                  <option value=''>Select Size</option>
                  {sizeChart.map(size => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
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
