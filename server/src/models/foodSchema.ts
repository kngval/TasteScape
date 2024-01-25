import mongoose from "mongoose";


export interface Food {
    foodName: string;
    foodDescription?: string;
}


const foodSchema = new mongoose.Schema({

    foodName : {
        type: String,
        required: true
    },
    foodDescription : {
        type: String,
    },


})
const FoodModel = mongoose.model<Food & Document>('Food', foodSchema)

export default FoodModel;