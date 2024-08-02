// import Order from "../models/orderModel.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
import User from "../models/user.js";


// Tạo đơn hàng mới
export const createOrder = async (req, res, next) => {
  try {
    const { user, products, total } = req.body;

    // Kiểm tra xem người dùng có tồn tại không
    const userExists = await User.findById(user);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Kiểm tra xem các sản phẩm có tồn tại không
    for (let item of products) {
      const productExists = await Product.findById(item.product);
      if (!productExists) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }
    }

    const newOrder = new Order({ user, products, total });
    await newOrder.save();

    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    next(error);
  }
};

// Lấy thông tin tất cả các đơn hàng
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("user").populate("products.product");
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

// Lấy thông tin một đơn hàng theo ID
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate("user").populate("products.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

// Cập nhật đơn hàng
export const updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("user").populate("products.product");
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    next(error);
  }
};

// Xóa đơn hàng
export const deleteOrder = async (req, res, next) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    next(error);
  }
};
