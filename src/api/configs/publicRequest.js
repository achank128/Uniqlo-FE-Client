import axios from 'axios';
import queryString from 'query-string';

const getAccessToken = async () => {
  var token = localStorage.getItem('token');
  return token;
}

// Set up default config for http requests here
const publicRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});

publicRequest.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

publicRequest.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }
  return response;
}, (error) => {
  throw error;
});

export default publicRequest;