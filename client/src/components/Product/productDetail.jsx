import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../../features/productSlice.jsx";
import "./productDetail.css";
import { Rating } from "@material-tailwind/react";
import Loader from "../layout/Loader/loader.jsx";
import Alert from "../layout/Alert/alert.jsx";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { error, status, productDetails } = useSelector(
    (state) => state.products
  );

  const increaseQuantity = () => {
    console.log(quantity);
    if (productDetails.product.Stock <= quantity) return;
    setQuantity(quantity + 1);
    console.log(quantity);
  };

  const decreaseQuantity = () => {
    console.log(quantity);
    if (1 >= quantity) return;
    setQuantity(quantity - 1);
    console.log(quantity);
  };

  useEffect(() => {
    console.log("Before dispatching fetchProductDetails");
    dispatch(fetchProductDetails(productId));
    console.log("After dispatching fetchProductDetails");
  }, [dispatch]);

  return (
    <React.Fragment>
      {error && <Alert message={error} />}
      {status == "loading" ? (
        <Loader />
      ) : (
        <div className="ProductDetails">
          <div className="detailsCard">
            <Carousel className="rounded-xl">
              {/* <div> */}
              {productDetails &&
                productDetails.product.images.map((item, i) => (
                  <img
                    className=" w-full object-cover"
                    key={i}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
              {/* </div> */}
            </Carousel>
          </div>
          <div>
            <div className="detailsBlock-1">
              <h2>{productDetails.product.name}</h2>
              <p>productDetails # {productDetails.product._id}</p>
            </div>
            <div className="detailsBlock-2">
              <Rating />
              <span className="detailsBlock-2-span">
                {" "}
                ({productDetails.product.numOfReviews} Reviews)
              </span>
            </div>
            <div className="detailsBlock-3">
              <h1>{`₹${productDetails.product.price}`}</h1>
              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                  <button onClick={decreaseQuantity}>-</button>
                  <input readOnly type="number" value={quantity} />
                  <button onClick={increaseQuantity}>+</button>
                </div>
                <button
                  disabled={productDetails.product.Stock < 1 ? true : false}
                >
                  Add to Cart
                </button>
              </div>

              <p>
                Status:
                <b
                  className={
                    productDetails.product.Stock < 1 ? "redColor" : "greenColor"
                  }
                >
                  {productDetails.product.Stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
            </div>
            <div className="detailsBlock-4">
              Description : <p>{productDetails.product.description}</p>
            </div>
            <button className="submitReview">Submit Review</button>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>
        </div>
      )}
    </React.Fragment>
  );
};

export default ProductDetail;
