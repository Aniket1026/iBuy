import jwt from "jsonwebtoken"
import User from "../model/userModel.js"

export const isUserAuthenticated = async(req,res,next) => {
    const { token } = req.cookies
    if (!token) {
        return next(new Error("Please login to access this resource "))
    }
    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(decodedData._id)
    next()
    console.log(token)
}
