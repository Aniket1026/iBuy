import React from "react";
import Footer from "./components/layout/Footer/footer.jsx";
import Header from "./components/layout/Header/header.jsx";
import Home from "./components/Home/home.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import ProductDetail from "./components/Product/ProductDetail.jsx";
import Products from "./components/Product/products.jsx";
import Register from "./components/User/register.jsx";
import Login from "./components/User/Login.jsx";
import { useSelector } from "react-redux";

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
          <Route exact path="/sign-up" element={<Register />} />
          <Route
            exact
            path="/sign-in"
            element={isAuth ? <Navigate to='/' /> : <Login />}
          />
        </Routes>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
