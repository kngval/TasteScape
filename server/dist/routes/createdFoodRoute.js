"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const CreatingRecipes_1 = require("../controllers/CreatingRecipes");
const authMiddleware_1 = require("../authMiddleware/authMiddleware");
router.use(authMiddleware_1.protectedRoutes);
router.get("/", CreatingRecipes_1.fetchCreatedRecipes);
router.post("/createRecipe", CreatingRecipes_1.createRecipe);
router.get("/:id", CreatingRecipes_1.getCreatedRecipeDetails);
router.delete("/:id", CreatingRecipes_1.deleteCreatedRecipe);
exports.default = router;
//# sourceMappingURL=createdFoodRoute.js.map