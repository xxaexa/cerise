import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
} from '../../utils/localStorage'
import { toast } from 'react-toastify'
import axios from 'axios'

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  token: null,
}

//Login User
export const loginUser = createAsyncThunk(
  'login/',
  async (values, thunkAPI) => {
    try {
      const response = await axios.post(
        'https://laravel-api-10.cerise.id/api/login',
        {
          ...values,
        }
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

//Register User
export const registerUser = createAsyncThunk(
  'register/',
  async (values, thunkAPI) => {
    try {
      const response = await axios.post(
        'https://laravel-api-10.cerise.id/api/register',
        {
          ...values,
        }
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state, { payload }) => {
      state.user = ''
      state.token = null
      removeUserFromLocalStorage()
      if (payload) {
        toast.success(payload)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload
        state.isLoading = false
        state.token = payload.token
        addUserToLocalStorage(user)
        toast.success('Login Sukses')
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        toast.error(payload)
        alert(payload)
      })
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        toast.success('Register Success')
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        console.log(payload)
      })
  },
})

export const { logoutUser } = userSlice.actions
export default userSlice.reducer
