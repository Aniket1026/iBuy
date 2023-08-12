import User from "../model/userModel.js";
import sendToken from "../utils/jwtToken.js";

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
