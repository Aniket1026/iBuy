import crypto from "crypto";
import cloudinary from 'cloudinary'
import User from "../model/userModel.js";
import sendToken from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";

export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      //   folder: 'avatars',
      //   width: 150,
      //   crop: 'scale'
      // })
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        msg: "Please enter all the fields",
      });
    }
    if (User.findOne({ email })) {
      return res.status(400).json({
        success: false,
        msg: "User already exists",
      });
    }
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "",
        url: "",
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
  try {
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
  } catch (error) {
    res.status(400).json({ sucess: false, msg: "error in user login" });
  }
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
  )}/api/v1/password/reset/${resetToken}`;
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

// reset password
export const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ msg: "Inavlid or expired token " });
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({ msg: "password does not match !!!" });
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordToken = undefined;

    await user.save();
    sendToken(user, 200, res);
  } catch (error) {
    console.log("Reset Password error");
  }
};

// get user detail

export const getUserDetail = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("User detail caanot be fetched ");
  }
};

export const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return res.status(400).json({ msg: "entered password is incorrect" });
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).json({ msg: " password does not match " });
    }

    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ success: false, msg: "password cannot be updated" });
  }
};

export const updateUserProfile = async (res, req) => {
  try {
    const newData = {
      name: req.body.name,
      email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.body.id, newData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ sucess: false, msg: "profile cannot be updated" });
  }
};

// Admin route
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(400).json({ success: false, msg: "error in getAllUsers" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, msg: "user not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, msg: "error in get Users" });
  }
};

// update user Role by admin
export const updateUserRole = async (req, res) => {
  try {
    const newData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ sucess: false, msg: "profile Role cannot be updated" });
  }
};

// delete user by admin
export const removeUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, msg: "user not found" });
    }
    await user.deleteOne();

    res.status(201).json({ success: true, msg: "user removed successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ sucess: false, msg: "profile cannot be removed" });
  }
};
