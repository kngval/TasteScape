"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFoodList = void 0;
const foodSchema_1 = __importDefault(require("models/foodSchema"));
const getFoodList = async (req, res) => {
    const foodList = await foodSchema_1.default.find().sort({ createdAt: -1 });
    res.status(200).json(foodList);
};
exports.getFoodList = getFoodList;
//# sourceMappingURL=foodsController.js.map