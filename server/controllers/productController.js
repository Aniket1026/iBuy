import { response } from "express";
import Product from "../model/productModel.js";

// -- Admin
export const createProducts = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
};

export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ success: true, products });
};

// -- get unique product details

export const productDetails = async(req,res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ success: false, message: "product not found" })
    }
   return res.status(200).json({ success: true, product })
    
  } catch (error) {
    return res.status(500).json(error)
  }
}

// -- update product
export const productUpdate = async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    res.status(500).json({ success: false, message: "Product not found" });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, product });
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    await Product.findByIdAndDelete(product._id);
    return res
      .status(200)
      .json({ success: true, message: "product deleted successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
