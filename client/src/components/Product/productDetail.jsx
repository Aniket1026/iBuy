import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../../features/productSlice.jsx";
import "./productDetail.css";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productDetails } = useSelector(
    (state) => state.products
  );
  const { productId } = useParams();

  useEffect(() => {
    console.log("Before dispatching fetchProductDetails");
    dispatch(fetchProductDetails(productId));
    console.log("After dispatching fetchProductDetails");
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="productDetails">
        <Carousel className="rounded-xl">
          {productDetails &&
            productDetails.product.images.map((item, i) => (
              <img
                className="h-full w-full object-cover"
                key={i}
                src={item.url}
                alt={`${i} Slide`}
              />
            ))}
        </Carousel>
      </div>
    </React.Fragment>
  );
};

export default ProductDetail;
