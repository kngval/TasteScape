"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const foodSchema = new mongoose_1.default.Schema({
    foodName: {
        type: String,
        required: true
    },
    foodDescription: {
        type: String,
    },
});
const FoodModel = mongoose_1.default.model('Food', foodSchema);
exports.default = FoodModel;
//# sourceMappingURL=foodSchema.js.map