import api from './apiConfig'
import axios from 'axios';

// ... rest of your auth.js file

const LOCALSTORAGE_KEY='token'




export async function signin(username, password) {
  try {
    const response = await api.post('/auth/signin', { username, password });
    localStorage.setItem(LOCALSTORAGE_KEY, response.data.token)
    console.log(LOCALSTORAGE_KEY)
    return response.data;
  } catch (error) {
    console.error("Error during signin:", error);
    return { success: false, error: error.message };
}
}
export async function signup(username, email, password) {
  try {
    const response = await api.post('/auth/signup', { username, email, password });
    console.log('success')
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
    console.error("Backend Error:", error.response.data);
    return { success: false, error: error.message };
}
}




export const getUserInfo = async () => {
  try {
    const response = await api.get('/auth/isTokenValid', {
      headers: { "x-auth-token": localStorage.getItem('token') }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get user information:', error);
    return { error: error.message };
  }
};

export const isTokenValid = () => {
  const token = localStorage.getItem('token');

  if (token) {
    // Send a request to your backend to check the token's validity
    return api.get('/isTokenValid')
      .then(response => {
        const { valid } = response.data;
        return valid;
      })
      .catch(error => {
        console.error('Failed to validate token:', error);
        return false;
      });
  }

  return false;
};


