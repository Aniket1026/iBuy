import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import { HiShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";

import CartItemCard from "./cartItemCard";
import './cart.css'

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems} = useSelector((state) => state.cart);

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <HiShoppingCart size={30} />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.response.product.name}>
                  <CartItemCard item={item} />
                  <div className="cartInput">
                    <button
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.response.product.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.response.product.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
