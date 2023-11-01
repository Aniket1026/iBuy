import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Footer from "./components/layout/Footer/footer.jsx";
import Header from "./components/layout/Header/header.jsx";
import Home from "./components/Home/home.jsx";
import ProductDetail from "./components/Product/productDetail.jsx";
import Products from "./components/Product/products.jsx";
import Register from "./components/User/register.jsx";
import Login from "./components/User/login.jsx";
import UserProfile from "./components/User/userProfile.jsx";
import Cart from "./components/Cart/cart.jsx";

import "./App.css";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = useSelector((state) => state.auth);
  return isAuth ? <Component /> : <Navigate to="/sign-in" />;
};

function App() {
  const { isAuth } = useSelector((state) => state.auth);
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/product/:productId"
            element={<PrivateRoute component={ProductDetail} />}
          />
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:pageNumber" element={<Products />} />
          <Route
            exact
            path="/sign-up"
            element={isAuth ? <Navigate to="/" /> : <Register />}
          />
          <Route
            exact
            path="/sign-in"
            element={isAuth ? <Navigate to="/" /> : <Login />}
          />
          <Route
            exact
            path="/account"
            element={<PrivateRoute component={UserProfile} />}
          />
          <Route
            exact
            path="/account/orders"
            element={<PrivateRoute component={Cart} />}
          />
        </Routes>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
