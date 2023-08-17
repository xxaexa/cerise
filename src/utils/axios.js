import axios from 'axios'
import { getUserFromLocalStorage } from './localStorage'

const customFetch = axios.create({
  baseURL: 'https://laravel-api-10.cerise.id/api',
})

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage()
  if (user) {
    config.headers['Authorization'] = `Bearer ${user.token}`
  }
  return config
})

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
  }
  return thunkAPI.rejectWithValue(error.response.data.msg)
}

export default customFetch
