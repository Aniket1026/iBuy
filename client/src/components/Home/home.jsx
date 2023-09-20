import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";

import MetaData from "../layout/MetaData.jsx";
import { fetchProducts } from "../../features/productSlice.jsx";
import "./home.css";
import ProductCard from "./product.jsx";
import Loader from "../layout/Loader/loader.jsx";
import Alert from "../layout/Alert/alert.jsx";

const Home = () => {
  const dispatch = useDispatch();

  const { error, products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <React.Fragment>
      <MetaData title="iBuy" />
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        {error && <Alert message={error} />}
        {status == "loading" ? (
          <Loader />
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </React.Fragment>
  );
};

export default Home;
