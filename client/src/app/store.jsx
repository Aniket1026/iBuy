import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../features/productSlice.jsx'
import authReducer from '../features/authSlice.jsx'

export default configureStore({
  reducer: {
    products: productsReducer,
    auth:authReducer
  },
});

