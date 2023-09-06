import Order from "../model/orderModel.js";
import Product from "../model/productModel.js";

// create nre order

export const newOrder = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
      
    res.status(201).json({ success: true, order })   
  } catch (error) {
      res.status(500).json({ success: false, msg: 'error while creating order' })
  }
};
