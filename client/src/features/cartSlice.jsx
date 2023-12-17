import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../contants/constant";

const URL = BACKEND_URL;

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
    shippingInfo:[],
    status: "idle",
    error: null,
  },
  reducers: {
    removeCartItem: (state, action) => {
      const cartItemIdToRemove = action.payload;
      console.log(action.payload);
      console.log(cartItemIdToRemove);
      state.cartItems = state.cartItems.filter(
        (item) => item.response.product._id !== cartItemIdToRemove
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.status = action.payload.response.success;
      state.cartItems.push(action.payload);
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
    builder.addCase(saveShippingInfo.fulfilled, (state, action) => {
      state.shippingInfo = action.payload;
      console.log(action.payload);
      localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
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

export const saveShippingInfo = createAsyncThunk(
  "shippingInfo/saveShippingInfoAsync",
  async (data) => {
    // localStorage.setItem("shippingInfo", JSON.stringify(data));
    return data;
  }
);

export const { removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;
