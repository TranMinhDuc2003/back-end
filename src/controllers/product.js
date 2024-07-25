import Category from "../models/category.js";
import Product from "../models/product.js";

export const getAllProduct = async (req, res, next) => {
  try {
    const data = await Product.find().populate("category");

    if (data) {
      return res.status(200).json({
        success: true,
        data,
        message: "lay san pham thanh cong",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getOneProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    const data = await Product.findById(id).populate("category");
    console.log(data);

    if (data) {
      return res.status(200).json({
        success: true,
        data,
        message: "lay san pham theo id thanh cong",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    console.log("createProduct");
    const data = await Product.create(req.body);
    if (data) {
      console.log(data);
      const updateCategory = await Category.findByIdAndUpdate(
        req.body.category,
        {
          $push: { products: data._id },
        },
        { new: true }
      );
      if (data && updateCategory) {
        return res.status(201).json({
          success: true,
          data,
          message: "Tao san pham thanh cong!",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Product.findByIdAndDelete(id);
    console.log(data);

    if (data) {
      return res.status(200).json({
        success: true,
        data,
        message: "xoa san pham thanh cong",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const data = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    console.log(data);

    if (data) {
      return res.status(200).json({
        success: true,
        data,
        message: "sua san pham thanh cong",
      });
    }
  } catch (error) {
    next(error);
  }
};
