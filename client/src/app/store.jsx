import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../features/productSlice.jsx'

export default configureStore({
  reducer: {
    products: productsReducer,
  },
});

