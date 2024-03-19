export type SensorData = {
  timestamp: number;
  sensorValues: number[];
};

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export type SearchUser = {
  label: string;
  value: User;
};

export type Test = {
  id: number;
  profile_id: number;
  name: string;
  start_time: string;
  duration: number;
};

export type Profile = {
  id: number;
  dob: string;
  gender: number;
  weight?: number;
  height?: number;
  shoe_size: number;
  user_id: number;
};

export type Size = {
  unit: string;
  size: string;
};
