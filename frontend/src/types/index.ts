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
  value: number;
};

export type Test = {
  id: number;
  name: string;
  start_time: string;
  duration: number;
  created_at: string;
  updated_at: string;
  profile_id: number;
};

export type Profile = {
  id: number;
  age?: number;
  weight?: number;
  height?: number;
  shoe_size: number;
  created_at: string;
  updated_at: string;
  user_id: number;
};
