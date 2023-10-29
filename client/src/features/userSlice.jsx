import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://ibuy-backend.onrender.com/api/v1";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
  withCredentials: true,
};

const initialState = {
  userDetails: null,
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userDetails = action.payload.user;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async () => {
    try {
      const response = await axios.get(`${URL}/profile`, config);
      return response.data.user;
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
);

export default userSlice.reducer;
