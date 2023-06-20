import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
} from "../controllers/authControllers.js";
import {
  adminMiddleware,
  requireSignin,
} from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//Register || Method POST
router.post("/register", registerController);

//Login || Method POST
router.post("/login", loginController);

//Forgot Password || Method POST
router.post("/forgot-password", forgotPasswordController);

//test || Method GET
router.get("/test", requireSignin, adminMiddleware, testController);

//protected route auth || Method GET
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected route admin || Method GET
router.get("/admin-auth", requireSignin, adminMiddleware, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile || Method PUT
router.put("/update-profile", requireSignin, updateProfileController);
export default router;
