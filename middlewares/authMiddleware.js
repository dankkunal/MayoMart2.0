import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected routes token based authentication
export const requireSignin = (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next(); //next() is a function that calls the next middleware
  } catch (error) {
    console.log(error);
  }
};

//Admin routes token based authentication
export const adminMiddleware = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user.isAdmin) {
      return res.status(401).send({
        success: false,
        message: "Admin access denied",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      message: "Error in Admin Middleware",
      error,
    });
  }
};
