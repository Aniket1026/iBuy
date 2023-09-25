import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../features/productSlice";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/loader";
import ProductCard from "../Home/productCard";
// import Alert from "../layout/Alert/alert";
// import ReactPaginate from "react-paginate";
import "./products.css";
import { Pagination } from "./pagination";

const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [dispatch,currentPage]);

  const totalPage = Math.ceil(products.productCount / products.pageSize);

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
              products.products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
