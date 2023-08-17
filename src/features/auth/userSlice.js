import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
} from '../../utils/localStorage'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  token: '',
}

//Login User
export const loginUser = createAsyncThunk(
  'login/',
  async (values, thunkAPI) => {
    try {
      const response = await customFetch.post('/login', {
        ...values,
      })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

//Register User
export const registerUser = createAsyncThunk(
  'register/',
  async (values, thunkAPI) => {
    try {
      const response = await customFetch.post('/register', {
        ...values,
      })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

//Logout User
export const logoutUser = createAsyncThunk('logout/', async (_, thunkAPI) => {
  try {
    const response = await customFetch.post('/logout')
    removeUserFromLocalStorage()
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload
        addUserToLocalStorage(payload)
        toast.success('Login Success')
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        toast.error(payload)
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.user = ''
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        toast.error(payload)
      })
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        toast.success('Register Success')
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        toast.error(payload)
      })
  },
})

export const { removeUser } = userSlice.actions
export default userSlice.reducer
