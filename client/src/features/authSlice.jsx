import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import  Cookies from "js-cookie";

const URL = "http://localhost:5000/api/v1";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "http://localhost:5173",
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
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.status = "fulfilled";
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.user = null;
        state.error = false;
      })
  },
});

export const userLogin = createAsyncThunk(
  "user/login",
  async (data) => {
    try {
      const response = await axios.post(`${URL}/login`, data,config);
      Cookies.set("token", response.data.token, { expires: 1 });
      return await response.data;
    } catch (error) { 
      console.log(error);
    }
  }
);

export default authSlice.reducer;
