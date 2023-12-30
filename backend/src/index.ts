import express from "express";
import cors from "cors";
import mongoose from "mongoose";

require("dotenv").config();
const app = express();

//middleware
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(process.env.PORT, () => console.log("Server listening..."))
  ).catch((error : Error) => console.log(error));

mongoose.connection.on("MongoDB Connection Error:", (error: Error) => {
  console.log(error);
});
