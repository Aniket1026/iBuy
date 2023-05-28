import User from "../model/userModel.js";

export const userRegister = async (req, res) => {
  try {
      const { name, email, password } = req.body;
      if (User.find({ email })) {
          return res.status(301).json({msg:'User already exists'})
      }

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "Sample id",
        url: "sample url",
      },
    });
    res.status(201).json({ success: true, msg: "User created successfully",user });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "user not able to create : " + error,
    });
  }
};
