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

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productDetails: null,
    status: "loading",
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const fetchProducts = createAsyncThunk("products/fetchAll", async (currentPage) => {
  const response = await axios.get(`${URL}/products/?page=${currentPage}`);
  return await response.data;
});

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (productId) => {
    try {
      const response = await axios.get(`${URL}/product/${productId}/`,config);
      return await response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export default productsSlice.reducer;
