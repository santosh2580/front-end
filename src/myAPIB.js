import axios from 'axios';

// Set the base URL properly
const urlBackEnd = 'http://localhost:3000/banana'; // Include the full URL (protocol + domain)

let token = localStorage.getItem('token')
  ? JSON.parse(localStorage.getItem('token'))
  : null;

const myApiB = axios.create({
  baseURL: urlBackEnd,  // Use baseURL here
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

// Interceptor for adding token to the headers if it's available
myApiB.interceptors.request.use(async (req) => {
  let token = localStorage.getItem('token');
  if (token) token = JSON.parse(token);

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log('Token is not available.');
  }

  return req;
});

export default myApiB;
