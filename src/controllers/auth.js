import User from "../models/user";
import { generateToken } from "../ultis/jwt";
import { comparePassword, hassPassword } from "../ultis/password";

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const useExists = await User.findOne({ email });
    console.log(useExists);
    if (useExists) {
      return res.status(400).json({
        message: "email da ton tai",
      });
    }

    const hassPass = hassPassword(password);
    if (!hassPass) {
      return res.status(400).json({
        message: "ma hoa that bai",
      });
    }

    const user = await User.create({
      email,
      password: hassPass,
    });

    return res.status(201).json({
      success: true,
      user,
      message: "dang ky thanh cong",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
		const useExists = await User.findOne({ email });
		// console.log(useExists);
		if (!useExists) {
			return res.status(404).json({
				message: "Email chua dang ky!",
			});
		}

   const isMatch = comparePassword(password, useExists.password);
		if (!isMatch) {
			return res.status(400).json({
				message: "Mat khau khong dung!",
			});
		}
    const token = generateToken({ _id: useExists._id }, "100d");
		useExists.password = undefined;

		return res.status(200).json({
			success: true,
			user: useExists,
			accessToken: token,
			message: "Login successfully!",
		});

  } catch (error) {
    next(error);
  }
};
