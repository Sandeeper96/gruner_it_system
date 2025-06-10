import axios from 'axios';
import config from './config';
console.log("BASE_URL",config);

const http = axios.create({
  baseURL: "http://172.18.2.60:5000",
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false // change to true if using cookies/sessions
});

export default http;
