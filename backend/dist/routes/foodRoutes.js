"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const foodsController_1 = require("../controllers/foodsController");
const router = express_1.default.Router();
router.get('/foodlist', foodsController_1.getFoodList);
router.post('/foodlist', foodsController_1.createFood);
router.patch('/foodlist/:foodId', foodsController_1.updateFood);
exports.default = router;
//# sourceMappingURL=foodRoutes.js.map