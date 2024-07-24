import Product from "../models/Product";

export const getAllProduct = async (req, res, next) => {
  try {
    const data = await Product.find();

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

    const data = await Product.findById(id);
    console.log(data);

    if (data) {
        return res.status(200).json({
          success: true,
          data,
          message: "lay san pham theo id thanh cong",
        });
      }
  } catch (error) {
   next(error)
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const body = req.body;

    const data = await Product.create(body);
    console.log(data);

    if (data) {
        return res.status(200).json({
          success: true,
          data,
          message: "tao san pham thanh cong",
        });
      }
  } catch (error) {
   next(error)
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
    next(error)
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
   next(error)
  }
};
