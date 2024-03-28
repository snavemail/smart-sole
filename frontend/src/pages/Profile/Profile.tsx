import React, { useState } from 'react';
import { getUser } from '../../hooks/user.actions';
import './profile.css';
import { randomAvatar } from '../../utils';
import EditIcon from '../../icons/EditIcon';
import { formatDate } from '../../utils';

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const { user } = getUser();
  const profileData = [
    { label: 'Name', value: `${user.first_name} ${user.last_name}` },
    { label: 'Date Of Birth', value: formatDate(user.dob as string) },
    { label: 'Gender', value: user.gender },
    { label: 'Weight', value: user.weight },
    { label: 'Height', value: user.height },
    { label: 'Shoe Size', value: user.shoe_size }
  ];
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted');
  };
  return (
    <div className="profile-wrapper">
      <div className="profile">
        <div className="profile-header">
          <h1>Profile</h1>
          <button
            className="edit-icon-btn"
            onClick={() => setEditMode(!editMode)}
          >
            <EditIcon />
          </button>
        </div>

        <hr />
        <div className="content">
          {editMode ? (
            <form action="#" onClick={handleFormSubmit}>
              <div className="avatar-wrapper centered-grid">
                <div className="profile-label">Photo</div>
                <div className="profile-value profile-avatar">
                  <img src={randomAvatar()} alt="Avatar" />
                </div>
              </div>
              {profileData.map((item, index) => {
                return (
                  <div className="centered-grid" key={index}>
                    <div className="profile-label">{item.label}</div>
                    <input
                      type="text"
                      className="profile-value"
                      defaultValue={item.value}
                      placeholder={item.label}
                    />
                  </div>
                );
              })}
              <div className="submit-btn-wrapper">
                <button type="submit" className="submit-btn">
                  Save
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="avatar-wrapper centered-grid">
                <div className="profile-label">Photo</div>
                <div className="profile-value profile-avatar">
                  <img src={randomAvatar()} alt="Avatar" />
                </div>
              </div>
              {profileData.map((item, index) => {
                return (
                  <div className="centered-grid" key={index}>
                    <div className="profile-label">{item.label}</div>
                    <div className="profile-value">
                      {item.value || item.label}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
