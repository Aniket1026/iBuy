import Product from "../model/productModel.js";
import { ApiFeature } from "../utils/ApiFeature.js";
import CustomError from "../utils/CustomError.js";

// -- Admin
export const createProducts = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ msg: "error in product creating : " + error });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const pageSize = 5;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeature(Product.find(), req.query)
      .search()
      .filter()
      .pagination(pageSize);
    const products = await apiFeature.query;
    res.status(200).json({ success: true, products, productCount });
  } catch (error) {
    res.status(500).json({ msg: "Cannot fetch all products " + error });
  }
};

// -- get unique product details

export const productDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new CustomError("product not found", 404));
    }
    return res.status(200).json({ success: true, product });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// -- update product
export const productUpdate = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ msg: "Cannot update product details " + error });
  }
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

export const productReview = async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);
    if (!product)
      return res
        .status(400)
        .json({ success: false, msg: "product not found for review" });

    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;

    let avg = 0;
    product.ratings = product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });
    return res.status(201).json({ success: true, msg: "review added" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, msg: "error in submitting product review" });
  }
};

// get all reviews of a product

export const getAllReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.query.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, msg: "cannot find the product " });

    res.status(200).json({ success: true, reviews: product.reviews });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "caanot get reviews " });
  }
};

// delete reviews from a product

export const deleteReview = async (req, res) => {
  try {
    const product = await Product.findById(req.query.productId);
    if (!product)
      return res
        .status(404)
        .json({ success: false, msg: "cannot find the product " });

    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
    let avg = 0;
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
    product.ratings = avg / reviews.length;
    product.reviews = reviews;
    product.numOfReviews = reviews.length;

    await product.save({ runValidators: false,validateBeforeSave:false });
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Failed to delete review" });
  }
};
