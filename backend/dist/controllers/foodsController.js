"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFood = exports.createFood = exports.getFoodList = void 0;
const foodSchema_1 = __importDefault(require("../models/foodSchema"));
const mongoose_1 = __importDefault(require("mongoose"));
const getFoodList = async (req, res) => {
    const foodList = await foodSchema_1.default.find().sort({ createdAt: -1 });
    res.status(200).json(foodList);
};
exports.getFoodList = getFoodList;
const createFood = async (req, res) => {
    const { foodName, foodDescription } = req.body;
    try {
        const foodCreate = await foodSchema_1.default.create({
            foodName,
            foodDescription,
        });
        res.status(200).json(foodCreate);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createFood = createFood;
//update food interface
const updateFood = async (req, res) => {
    const { foodId } = req.params;
    const updatedFood = req.body;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(foodId)) {
            res.status(404).json({ error: "Not Found" });
            return;
        }
        const updatedFoodDocument = await foodSchema_1.default.findOneAndUpdate({ _id: foodId }, { $set: updatedFood }, { new: true });
        if (!updatedFoodDocument) {
            res.status(404).json({ error: "Food not found" });
            return;
        }
        res.status(200).json(updatedFoodDocument);
    }
    catch (error) {
        console.log("Food Update Error: ", error);
    }
};
exports.updateFood = updateFood;
//# sourceMappingURL=foodsController.js.map