import axios from 'axios';

const API_BASE_URL = 'http://localhost:2000';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/logout`);
    return response.data;
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};
