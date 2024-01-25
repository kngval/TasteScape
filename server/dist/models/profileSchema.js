"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const profileSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    }
});
const ProfileModel = mongoose_1.default.model('Profile', profileSchema);
exports.default = ProfileModel;
//# sourceMappingURL=profileSchema.js.map