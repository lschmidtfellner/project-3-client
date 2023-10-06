import axios from 'axios'
const LOCALSTORAGE_KEY='token'
const api = axios.create({
  baseURL: 'https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/',
  // baseURL: 'http://localhost:8000',

})
api.interceptors.request.use(config => {
    const token = localStorage.getItem(LOCALSTORAGE_KEY)
    config.headers.Authorization = token
    return config
})

export default api

