import mongoose from "mongoose";

const LikedSchema = new mongoose.Schema({
  id: Number,
  title: String,
  image: String,
  isLiked: {
    type: Boolean,
    default: false,
  },
});

const LikedModel = mongoose.model<Document>("likedRecipes", LikedSchema);
export default LikedModel;
