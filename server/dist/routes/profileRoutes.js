"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware_1 = require("../authMiddleware/authMiddleware");
const profileControllers_1 = require("../controllers/profileControllers");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.use(authMiddleware_1.protectedRoutes);
router.patch("/edit-profile", profileControllers_1.editProfile);
router.get("/", profileControllers_1.getProfile);
exports.default = router;
//# sourceMappingURL=profileRoutes.js.map