import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { SearchUser, User } from '../types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function formatUsers(users: User[]) {
  return users.map(user => {
    return {
      label: `${user.first_name} ${user.last_name} (${user.email})`,
      value: user.id,
    };
  });
}

export default function Admin() {
  const [users, setUsers] = useState<SearchUser[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/users/');
      return response.data;
    };
    const listUsers = fetchUsers();

    listUsers.then((data: User[]) => {
      setUsers(formatUsers(data));
    });
  }, []);

  const handleChange = (selectedOption: SearchUser | null) => {
    if (selectedOption) {
      navigate(`/users/${selectedOption.value}`);
    } else {
      console.log('No option selected');
    }
  };

  return (
    <div className='admin-wrapper'>
      <div>
        <h1>
          <span>Admin</span>
        </h1>
      </div>
      <Select className='selector' options={users} onChange={handleChange} />
    </div>
  );
}
