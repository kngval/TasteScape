import express from "express";
import cors from "cors";
import foodSearch from "./routes/foodSearch";
import likedRoutes from "./routes/likedRoutes";
import createdFoodRoutes from "./routes/createdFoodRoute";
import profileRoutes from "./routes/profileRoutes"
import "dotenv/config";
import { connectToDb } from "./db/db";
const app = express();
const PORT = process.env.PORT;

connectToDb()
  .then(() => {
    //middleware
    app.use(
      cors({
        origin: "http://localhost:5173",
        methods: "GET,POST,PUT,PATCH,DELETE",
        credentials: true,
      })
    );
    app.use(express.json({ limit: "50mb" }));
    app.options("/favorites/:id", cors()); // Handle OPTIONS for DELETE
    app.use("/Home", foodSearch); //Route for first mount in /Home
    app.use("/favorites", likedRoutes); //Route for liked recipes
    app.use("/my-recipes", createdFoodRoutes); //Route for creating Recipes
    app.use("/profile",profileRoutes)
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB: ", error);
  });
