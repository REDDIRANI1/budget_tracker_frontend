// src/api/auth.ts
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const loginUser = async (username: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/api/token/`, {
    username,
    password,
  });
  return response.data; // contains access and refresh tokens
};
