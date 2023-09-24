import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../features/productSlice";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/loader";
import ProductCard from "../Home/productCard";
// import Alert from "../layout/Alert/alert";
import "./products.css";

// const categories = [
//   "Laptop",
//   "Footwear",
//   "Bottom",
//   "Tops",
//   "Attire",
//   "Camera",
//   "SmartPhones",
// ];

const Products = () => {
  const dispatch = useDispatch();

  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Fragment>
      {status == "loading" ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <div className="filterBox"></div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
