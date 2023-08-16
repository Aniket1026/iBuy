import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import crypto from 'crypto'

dotenv.config()

const userScehma = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [2, "Name should have more than 2 characters"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter email"],
    validate: [validator.isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: [6, "password should be more than 6 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userScehma.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT token
userScehma.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
}

// comparing password
userScehma.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

// reset password
userScehma.methods.getPasswordResetToken = function () {
  // Generating token
  const resetToken = crypto.randomBytes(20).toString('hex')
  
  // hasing and adding resetPasswordToken to user schema
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
  return resetToken;
}


const User = mongoose.model("User", userScehma);
export default User;
