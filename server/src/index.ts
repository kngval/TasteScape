import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import foodRoutes from "./routes/foodRoutes";
import foodSearch from "./routes/foodSearch";
import likedRoutes from "./routes/likedRoutes"
import "dotenv/config" 
const app = express();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: '*', 
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);
app.use("/profile", foodRoutes);
app.use("/Home", foodSearch);
app.use("/favorites",likedRoutes)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}...`))
  )
  .catch((error: Error) => console.log(error));

mongoose.connection.on("error", (error: Error) => {
  console.log("MongoDB Connection Error : ", error);
});
