import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import foodSearch from "./routes/foodSearch";
import likedRoutes from "./routes/likedRoutes";
import createdFoodRoutes from "./routes/createdFoodRoute";
import "dotenv/config";
const app = express();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);
app.options("/favorites/:id", cors()); // Handle OPTIONS for DELETE
app.use("/Home", foodSearch); //Route for first mount in /Home
app.use("/favorites", likedRoutes); //Route for liked recipes
app.use("/my-recipes",createdFoodRoutes); //Route for creating Recipes
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(
        `Server listening on port http://localhost:${process.env.PORT}...`
      )
    )
  )
  .catch((error: Error) => console.log(error));

mongoose.connection.on("error", (error: Error) => {
  console.log("MongoDB Connection Error : ", error);
});
