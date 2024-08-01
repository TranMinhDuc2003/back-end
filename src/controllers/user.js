import User from "../models/user.js";

export const showProfile = async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findById(req.user._id);
      return res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.find();
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
