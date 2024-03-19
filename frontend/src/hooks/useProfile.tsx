import * as React from 'react';
import { useState, PropsWithChildren, createContext, useContext } from 'react';
import { Profile, User } from '../types';

type ProfileHookType = {
  setProfileData: (user: User, profile: Profile) => void;
  user: User;
  profile: Profile;
};

export const ProfileContext = createContext<ProfileHookType>({
  setProfileData: () => {},
  user: {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
  },
  profile: {
    id: 0,
    dob: '',
    gender: 0,
    user_id: 0,
    shoe_size: 0,
  },
});

const ProfileProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>({
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
  });
  const [profile, setProfile] = useState<Profile>({
    id: 0,
    dob: '',
    gender: 0,
    user_id: 0,
    shoe_size: 0,
  });

  const setProfileData = (user: User, profile: Profile) => {
    setUser(user);
    setProfile(profile);
    console.log('Setting profile data', user, profile);
  };

  return (
    <ProfileContext.Provider value={{ setProfileData, user, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;

export const useProfile = (): ProfileHookType => {
  return useContext(ProfileContext);
};
