import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";

//Configuring dotenv
dotenv.config();

//Database Connection
connectDB();

//REST Object
const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//ROUTES
app.use("/api/v1/auth", authRoutes);

//REST API
app.get("/", (req, res) => {
  res.send("<h1><center>HELLO WORLD</center></h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
