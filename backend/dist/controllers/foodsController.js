"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFood = exports.getFoodList = void 0;
const foodSchema_1 = __importDefault(require("../models/foodSchema"));
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
            foodDescription
        });
        res.status(200).json(foodCreate);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createFood = createFood;
//# sourceMappingURL=foodsController.js.map