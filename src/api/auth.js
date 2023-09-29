import api from './apiConfig'
const LOCALSTORAGE_KEY='token'

export async function signin(username, password) {
  try {
    const response = await api.post('/auth/signin', { username, password });
    localStorage.setItem(LOCALSTORAGE_KEY, response.data.token);
    localStorage.setItem('loggedIn', 'true'); // This line is new

    // Store the user data in localStorage, if it's included in the response
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    console.log(LOCALSTORAGE_KEY);
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

export async function isTokenValid() {
  try {
    const response = await api.get('/auth/isTokenValid');
    return response.data;
  } catch (error) {
    console.error("Error during token validation:", error);
    return { success: false, error: error.message };
  }
}

export async function getCarDetails(userId) {
  try {
    const response = await api.get(`/auth/users/${userId}/email`);
    return response.data;
  } catch (error) {
    console.error("Error while fetching user email:", error);
    return { success: false, error: error.message };
  }
}
