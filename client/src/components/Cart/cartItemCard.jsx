import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeCartItem } from "../../features/cartSlice";
import "./cartItemCard.css";

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const removeItem = () => {
    console.log(item.response.product._id);
    dispatch(removeCartItem(item.response.product._id));
  };
  return (
    <div className="CartItemCard">
      <img src={item.response.product.images[0].url} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.response.product.price}`}</span>
        <p onClick={removeItem}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
