import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({

    foodName : {
        type: String,
        required: true
    },
    foodDescription : {
        type: String,

    },


})
const FoodModel = mongoose.model('Food', foodSchema)

export default FoodModel;