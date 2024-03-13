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
};
