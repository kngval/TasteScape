import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import foodRoutes from "./routes/foodRoutes";
import foodSearch from "./routes/foodSearch";
import "dotenv/config" 
const app = express();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's origin
    credentials: true,
  })
);
app.use("/profile", foodRoutes);
app.use("/Home", foodSearch);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(process.env.PORT, () => console.log("Server listening..."))
  )
  .catch((error: Error) => console.log(error));

mongoose.connection.on("error", (error: Error) => {
  console.log("MongoDB Connection Error : ", error);
});
