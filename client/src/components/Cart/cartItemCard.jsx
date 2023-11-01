import React from "react";
import { Link } from "react-router-dom";
import "./cartItemCard.css";

const CartItemCard = ({ item }) => {
  return (
    <div className="CartItemCard">
      <img src={item.response.product.images[0].url} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.response.product.price}`}</span>
        <p>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
