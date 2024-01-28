import mongoose from 'mongoose';

const LikedSchema = new mongoose.Schema({
    LikedRecipe : {
        id: Number,
        title: String,
        liked: Boolean
    }
})

const LikedModel = mongoose.model<Document>('Liked Recipes', LikedSchema)
export default LikedModel;