export type SensorDatum = {
  timestamp: number;
  sensor0: number;
  sensor1: number;
  sensor2: number;
  sensor3: number;
  sensor4: number;
  sensor5: number;
};

export type SensorData = {
  timestamp: number[];
  sensor0: number[];
  sensor1: number[];
  sensor2: number[];
  sensor3: number[];
  sensor4: number[];
  sensor5: number[];
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

export type NivoGraphData = {
  id: string;
  color: string;
  data: { x: number; y: number }[];
};
