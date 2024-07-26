import User from "../models/user.js";
import { sendEmail } from "../ultis/email.js";
import { generateToken } from "../ultis/jwt.js";
import { comparePassword, hassPassword } from "../ultis/password.js";

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

export const forgotPassword = async (req,res,next) => {
  try {
    const {email} = req.body
    const user = await User.findOne({email})

    if(!user){
      return res.status(404).json({
        message: "email chua duoc dang ky"
      })
    }

    const newPass = Math.random().toString(36).slice(-8)
    const hassPass = hassPassword(newPass)

    if(!hassPass){
      return res.status(500).json({
        message: "ma hoa that bai"
      })
    }
    
    user.password = hassPass
    await user.save()

    const emailSubject = "Password Reset in Node.js App by @tduc8110"
    const emailText = `your new password is: ${newPass}`
    await sendEmail(email, emailSubject,emailText)
    return res.status(200).json({
      message: "reset password successfuly"
    })
  } catch (error) {
    next(error)
  }
}