// src/api/auth.ts
import axios from 'axios';

const API_BASE_URL = 'https://budget-tracker-backend-1-7iom.onrender.com';

export const loginUser = async (username: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/api/token/`, {
    username,
    password,
  });
  return response.data; // contains access and refresh tokens
};
