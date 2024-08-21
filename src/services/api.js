// src/services/api.js
import axios from 'axios';

export const fetchNextActionItems = () => {
  return axios.get('http://localhost:5000/nextActionItems'); // Use the mock server URL
};
