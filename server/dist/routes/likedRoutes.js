"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const foodsController_1 = require("../controllers/foodsController");
const authMiddleware_1 = require("../authMiddleware/authMiddleware");
const router = express_1.default.Router();
router.use(authMiddleware_1.protectedRoutes);
router.get("/", foodsController_1.fetchLikedRecipe);
router.delete("/:id", foodsController_1.removeLikedRecipe);
exports.default = router;
//# sourceMappingURL=likedRoutes.js.map