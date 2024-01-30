import mongoose from 'mongoose';

const LikedSchema = new mongoose.Schema({
        id: Number,
        title: String,
        image:String,
        liked: Boolean
})

const LikedModel = mongoose.model<Document>('Liked Recipes', LikedSchema)
export default LikedModel;