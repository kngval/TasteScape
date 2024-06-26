"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const foodsController_1 = require("../controllers/foodsController");
const authMiddleware_1 = require("../authMiddleware/authMiddleware");
router.use(authMiddleware_1.protectedRoutes);
router.get("/:query", foodsController_1.fetchRandomRecipe);
router.get("/:query", foodsController_1.getSearchList);
router.get("/recipe/:id", foodsController_1.getRecipeDetails);
router.post("/", foodsController_1.addLikedRecipe);
exports.default = router;
//# sourceMappingURL=foodSearch.js.map