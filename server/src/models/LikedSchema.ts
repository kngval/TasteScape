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

const LikedModel = mongoose.model<Document>("Liked Recipes", LikedSchema);
export default LikedModel;
