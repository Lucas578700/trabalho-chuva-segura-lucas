import axios from 'axios';

const api = axios.create({
  baseURL: 'https://crud-user-mftn.onrender.com/',
});

export default api;
