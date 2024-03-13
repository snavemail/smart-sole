import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { SearchUser, User } from '../types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/admin.css';
import AddUser from '../components/AddUser';

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

  const fetchUsers = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/users/');
    setUsers(formatUsers(response.data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (selectedOption: SearchUser | null) => {
    if (selectedOption) {
      navigate(`/users/${selectedOption.value}`);
    } else {
      console.log('No option selected');
    }
  };

  const handleAddUser = () => {
    fetchUsers();
  };

  return (
    <div className='admin-wrapper'>
      <div className='select-user'>
        <h1>
          <span>Select User</span>
        </h1>
        <Select className='selector' options={users} onChange={handleChange} />
      </div>
      <div className='add-user'>
        <h1>
          <span>Add User</span>
        </h1>
        <AddUser onAddUser={handleAddUser} />
      </div>
    </div>
  );
}
