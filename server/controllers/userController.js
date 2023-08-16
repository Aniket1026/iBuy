import User from "../model/userModel.js";
import sendToken from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";

export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "Sample id",
        url: "sample url",
      },
    });

    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "user not able to create : " + error,
    });
  }
};

// user login route
export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Please enter email and password " });
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res
      .status(401)
      .json({ success: false, msg: "Invalid email or password" });
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return res
      .status(401)
      .json({ success: false, msg: "Incorrect email or passsword" });
  }
  sendToken(user, 200, res);
};

// user logout
export const userLogout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

// forgot password
export const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new Error("User not found"));
  }

  // get resetToken
  const resetToken = user.getPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordLink = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;
  const message = `Tap the link to reset your password 🤭 :- \n\n ${resetPasswordLink} `;

  try {
    await sendEmail({
      email: user.email,
      subject: "iBuy Password Reset 🤔",
      message,
    });
    res.status(200).json({
      sucess: true,
      message: `Email sent to ${user.email} successfully `,
    });
  } catch (error) {
    (user.resetPasswordToken = undefined),
      (user.resetPasswordExpire = undefined);
    await user.save({ validateBeforeSave: false });
    return next(new Error(error.message));
  }
};
