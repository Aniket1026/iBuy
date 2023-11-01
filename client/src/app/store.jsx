import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../features/productSlice.jsx'
import authReducer from '../features/authSlice.jsx'
import userReducer from '../features/userSlice.jsx'
import cartReducer from '../features/cartSlice.jsx'

export default configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    user: userReducer,
    cart: cartReducer,
  },
});

