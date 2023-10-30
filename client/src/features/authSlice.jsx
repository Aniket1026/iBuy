import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const URL = "https://ibuy-backend.onrender.com/api/v1";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
  withCredentials: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    user: null,
    status: "loading",
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.isAuth = action.payload.success;
        state.user = action.payload.user;
      })
      .addCase(userRegister.rejected, (state) => {
        state.user = null;
        state.error = false;
      })
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuth = action.payload.success;
        state.status = "fulfilled";
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.user = null;
        state.error = false;
        state.isAuth = false
      })
      .addCase(userLogout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.user = null; 
        state.isAuth = false;
        state.status = "fulfilled";
      })
      .addCase(userLogout.rejected, (state) => {
        state.error = "True";
      });
  },
});

export const userRegister = createAsyncThunk("user/register", async (data) => {
  try {
    const response = await axios.post(`${URL}/register`, data, config);
    Cookies.set("token", response.data.token, { expires: 1 });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
});

export const userLogin = createAsyncThunk("user/login", async (data) => {
  try {
    const response = await axios.post(`${URL}/login`, data, config);
    console.log(response.data.token);
    Cookies.set("token", response.data.token, { expires: 1 });
    return await response.data;
  } catch (error) {
    console.log(error);
  }
});

export const userLogout = createAsyncThunk("user/logout", async () => {
  try {
    const response = await axios.get(`${URL}/logout`, config);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});
export default authSlice.reducer;
