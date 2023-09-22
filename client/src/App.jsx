import React from "react";
import Footer from "./components/layout/Footer/footer.jsx";
import Header from "./components/layout/Header/header.jsx";
import Home from "./components/Home/home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ProductDetail from "./components/Product/ProductDetail.jsx";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:productId" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
