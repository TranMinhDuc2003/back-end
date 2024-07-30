import Cart from "../models/cart.js";

export const getAllCart = async (req, res, next) => {
  try {
    const data = await Cart.find();
    if (data) {
      return res.status(200).json({
        success: true,
        data,
        message: "get cart ok",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getCartDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Cart.findById(id);
    if (data) {
      return res.status(200).json({
        success: true,
        data,
        message: "get cart detail ok",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getCartUser = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.params.id }).populate({
      path: "products",
      populate: {
        path: "product",
        model: Product,
      },
    });
    // if (!cart) throw new ApiError(404, "Cart Not Found");
    res.status(StatusCodes.OK).json(cart);
  } catch (error) {
    next(error);
  }
};

export const createCart = async (req, res, next) => {
  try {
    const { quantity, user, product } = req.body;
    let cart = await Cart.findOne({ user });
    if (cart) {
      // Giỏ hàng đã tồn tại, kiểm tra xem sản phẩm đã có trong giỏ hàng hay chưa
      const productIndex = cart.products.findIndex(
        (item) => item.product && item.product.toString() === product
      );

      if (productIndex === -1) {
        // Nếu sản phẩm này chưa từng có trong giỏ hàng, cần thêm sản phẩm này cùng số lượng vào giỏ hàng,
        cart.products.push({ product, quantity });
      } else {
        // Nếu sản phẩm này đã có trong giỏ hàng, cần cập nhật số lượng sản phẩm trong giỏ hàng,
        cart.products[productIndex].quantity += quantity;
      }
      await cart.save();
      return res.status(200).json({
        success: true,
        data: cart,
        message: "Cập nhật giỏ hàng thành công",
      });
    } else {
      // Giỏ hàng chưa tồn tại, tạo giỏ hàng mới
      const data = await Cart.create({
        user,
        products: [{ product, quantity }],
      });

      return res.status(201).json({
        success: true,
        data,
        message: "Tạo giỏ hàng thành công",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteProductCart = async (req, res, next) => {
  try {
    const { userId, id } = req.params;
    const data = await Cart.findOne({ user: userId });
    if (!data) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const newProductCart = data.products.filter((item) => item.product != id);

    const updateCart = await Cart.findByIdAndUpdate(
      data._id,
      { products: newProductCart },
      { new: true }
    );

    if (data && updateCart) {
      return res.status(200).json({
        success: true,
        data,
        message: "delete product cart successfult",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteCart = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Cart.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({
        message: "not found",
      });
    }
    return res.status(200).json({
      success: true,
      data,
      message: "Delete cart successfuly",
    });
  } catch (error) {
    next(error);
  }
};
