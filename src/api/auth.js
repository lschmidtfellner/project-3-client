import api from './apiConfig'
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

export async function isTokenValid() {
  try {
    const response = await api.get('/auth/isTokenValid');
    return response.data;
  } catch (error) {
    console.error("Error during token validation:", error);
    return { success: false, error: error.message };
  }
}

export async function getCarDetails() {
  
}