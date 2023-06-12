import axios from 'axios';
const publicRequest = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});
export const privateRequest = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});
//TO DO :: 401 status => refresh토큰으로 access토큰 재발급

export default publicRequest;
