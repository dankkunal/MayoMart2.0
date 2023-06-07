import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    // Validations
    if (!name) {
      return res.send({
        error: "Name is required",
      });
    }
    if (!email) {
      return res.send({
        error: "Email is required",
      });
    }
    if (!password) {
      return res.send({
        error: "Password is required",
      });
    }
    if (!phone) {
      return res.send({
        error: "Phone is required",
      });
    }
    if (!address) {
      return res.send({
        error: "Address is required",
      });
    }

    const existingUser = await userModel.findOne({ email });

    // Check if user already exists
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already registered, please login",
        existingUser,
      });
    }

    //Register user
    const hashedPassword = await hashPassword(password);
    //Save user to database
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//Login Controller POST
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validations
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        error: "Invalid email or password",
      });
    }
    //Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        error: "Email is not registered",
      });
    }
    //Check if password is correct
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        success: false,
        error: "Invalid password",
      });
    }
    //Create token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "User logged in successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

//test Controller GET
export const testController = (req, res) => {
  res.send("Protected route");
};
