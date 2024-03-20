import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { SearchUser, User } from '../../types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './search.css';
import UserPlusIcon from '../../icons/UserPlusIcon';
import { useProfile } from '../../hooks/useProfile';

function formatUsers(users: User[]) {
  return users.map(user => {
    return {
      label: `${user.first_name} ${user.last_name} (${user.email})`,
      value: user,
    };
  });
}

export default function SearchPage() {
  const { setProfileData } = useProfile();
  const [users, setUsers] = useState<SearchUser[]>([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users');
      setUsers(formatUsers(response.data));
      // successToast('Users fetched successfully');
    } catch (error: any) {
      // errorToast('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const handleChange = async (selectedOption: SearchUser | null) => {
    if (selectedOption) {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/profile/${selectedOption.value.id}`,
      );
      setProfileData(selectedOption.value, response.data);
      navigate(`/profile`);
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
        <div className='icon-container'>
          <a href={`/add-user`} className='add-user-link'>
            <UserPlusIcon />
          </a>
        </div>
      </div>
      <Select className='selector' options={users} onChange={handleChange} />
    </div>
  );
}
