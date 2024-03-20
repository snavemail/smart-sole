import React, { useEffect, useState } from 'react';
import { useProfile } from '../../hooks/useProfile';
import './user-tests.css';
import { Test } from '../../types';
import TestComponent from '../../components/TestComponent';

export default function UserTests() {
  const { user, profile } = useProfile();
  const [userTests, setUserTests] = useState([]);

  useEffect(() => {
    const fetchUserTests = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/profiles/${profile.id}/tests`);
        const data = await response.json();
        setUserTests(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserTests();
  }, [profile.id]);

  return (
    <div className='tests-page-container'>
      <div className='header test-header'>
        <h1>{user.first_name} Tests</h1>
        <div>
          <a href='/test'>Add Test</a>
        </div>
      </div>
      <div className='testUserTests'>
        {userTests.map((test: Test) => (
          <TestComponent key={test.id} test={test} />
        ))}
      </div>
    </div>
  );
}
