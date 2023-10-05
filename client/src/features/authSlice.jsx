import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:5000/api/v1";

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
    const response = await axios.post(`${URL}/login`,data);
    return await response.data;
  }
);

export default authSlice.reducer;
