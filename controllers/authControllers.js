import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    // Validations
    if (!name) {
      return res.send({
        message: "Name is required",
      });
    }
    if (!email) {
      return res.send({
        message: "Email is required",
      });
    }
    if (!password) {
      return res.send({
        message: "Password is required",
      });
    }
    if (!phone) {
      return res.send({
        message: "Phone is required",
      });
    }
    if (!address) {
      return res.send({
        message: "Address is required",
      });
    }
    if (!answer) {
      return res.send({
        message: "Answer is required",
      });
    }

    const existingUser = await userModel.findOne({ email });

    // Check if user already exists
    if (existingUser) {
      return res.status(200).send({
        success: false,
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
      answer,
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
        message: "Invalid email or password",
      });
    }
    //Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is not registered",
      });
    }
    //Check if password is correct
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    //Create token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Logged in successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        isAdmin: user.isAdmin,
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

//Forgot Password Controller POST
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    //validations
    if (!email) {
      res.status(404).send({
        success: false,
        message: "Email is required",
      });
    }
    if (!answer) {
      res.status(404).send({
        success: false,
        message: "Answer is required",
      });
    }
    if (!newPassword) {
      res.status(404).send({
        success: false,
        message: "Password is required",
      });
    }
    //Check
    const user = await userModel.findOne({ email, answer });
    //Check if user exists
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or answer",
      });
    }
    const hashedNewPassword = await hashPassword(newPassword);
    //Update password
    await userModel.findByIdAndUpdate(user._id, {
      password: hashedNewPassword,
    });
    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Forgot Password",
    });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;
    const user = await userModel.findById(req.user._id);
    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and should be min 6 characters long",
      });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        phone: phone || user.phone,
        address: address || user.address,
        password: hashedPassword || user.password,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in updating profile",
    });
  }
};

//test Controller GET
export const testController = (req, res) => {
  res.send("Protected route");
};
