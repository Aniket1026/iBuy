import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:5000/api/v1";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
  withCredentials: true,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    quantity: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.status = action.payload.response.success;
      state.cartItems.push(action.payload.response.product);
      state.quantity.push(action.payload.quantity);
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  },
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }) => {
    try {
      console.log(productId);
      const response = await axios.get(`${URL}/product/${productId}/`, config);
      return { response: response.data, quantity };
    } catch (error) {
      console.log(error);
      return { error: "Failed to add " };
    }
  }
);

export default cartSlice.reducer;
