import jwt from "jsonwebtoken"
import User from "../model/userModel.js"
import CustomError from "../utils/CustomError.js"

export const isUserAuthenticated = async(req,res,next) => {
    const { token } = req.cookies
    if (!token) {
        return next(new Error("Please login to access this resource "))
    }
    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(decodedData.id)
    next()
}

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403)
            return next( new CustomError(`Role ${req.user.role} is not allowed to access this resource`))
        }
        next()
    }
}
