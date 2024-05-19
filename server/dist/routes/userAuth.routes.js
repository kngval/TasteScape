"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userAuth_controller_1 = require("../controllers/userAuth.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/signup", userAuth_controller_1.signupUser);
router.post("/login", userAuth_controller_1.loginUser);
exports.default = router;
//# sourceMappingURL=userAuth.routes.js.map