import Order from "../model/orderModel.js";
import Product from "../model/productModel.js";
import { order } from "../routes/orderRoute.js";

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

// get all orders by admin

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    res.status(200).json({ success: true, orders, totalAmount });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, msg: "Error while fetching all orders" });
  }
};

// update product status
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(400).json({ msg: "no order found" });
    }

    if (order.orderStatus === "Delivered") {
      return res
        .status(400)
        .json({ msg: "You have already delivered this order" });
    }

    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "error in updating status ",
    });
  }
};

async function updateStock(id, quantity) {
  try {
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false });
  } catch (error) {
    console.log(error);
  }
}

// delete Order -- Admin
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(400).json({ msg: "Order not found with this Id" });
    }

    await Order.findByIdAndDelete(order._id);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
