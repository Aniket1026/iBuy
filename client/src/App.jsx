import React from "react";
import Footer from "./components/layout/Footer/footer.jsx";
import Header from "./components/layout/Header/header.jsx";
import Home from "./components/Home/home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ProductDetail from "./components/Product/ProductDetail.jsx";
import Products from "./components/Product/products.jsx";
import Register from "./components/User/register.jsx";
import Login from "./components/User/Login.jsx";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:productId" element={<ProductDetail />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:pageNumber" element={<Products />} />
          <Route exact path="/sign-up" element={<Register />} />
          <Route exact path="/sign-in" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
