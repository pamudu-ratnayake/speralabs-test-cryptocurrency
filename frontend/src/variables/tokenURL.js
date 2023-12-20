import axios from 'axios';

//---------url--------------
const API = axios.create({ baseURL: 'http://localhost:8070' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export default API;