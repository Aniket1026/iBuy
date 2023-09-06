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

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, msg: "error while creating order" });
  }
};

// get single order

export const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) return res.status(404).json({ msg: "Cannot find the order" });

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, msg: "error while getting order" });
  }
};

// get all orders of user
export const myOrders = async (req, res) => {
  try {
    const order = await Order.find({ user: req.user._id });
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, msg: "error while getting order" });
  }
};
