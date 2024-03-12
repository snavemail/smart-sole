import axios from 'axios';

export const getGraph = async () => {
  const res = await axios.get('https://localhost:8080/getGraph');
  return res;
};
