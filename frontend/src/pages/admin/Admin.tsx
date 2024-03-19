import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { SearchUser, User } from '../../types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './admin.css';
import { errorToast, successToast } from '../../toasts';
import UserPlusIcon from '../../icons/UserPlusIcon';

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
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users/');
      setUsers(formatUsers(response.data));
      successToast('Users fetched successfully');
    } catch (error: any) {
      // errorToast('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const handleChange = (selectedOption: SearchUser | null) => {
    if (selectedOption) {
      navigate(`/user/${selectedOption.value}`);
    } else {
      console.log('No option selected');
    }
  };

  return (
    <div className='select-user-wrapper'>
      <div className='header-section'>
        <h1 className='add-header header'>
          <span>Search User</span>
        </h1>
        <div>
          <a href={`/add-user`} className='add-user-link'>
            <UserPlusIcon />
          </a>
        </div>
      </div>
      <Select className='selector' options={users} onChange={handleChange} />
    </div>
  );
}
