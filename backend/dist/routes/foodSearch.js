"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const foodsController_1 = require("../controllers/foodsController");
router.get('/:query', foodsController_1.getSearchList);
exports.default = router;
//# sourceMappingURL=foodSearch.js.map