"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProfile = exports.getProfile = void 0;
const db_1 = require("../db/db");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const getProfile = async (req, res) => {
    const userId = req.user;
    try {
        const db = (0, db_1.getDb)();
        const Profile = await db.collection("profile").findOne({ userId });
        return Profile
            ? res.status(200).json(Profile)
            : res.status(400).json({ error: "Profile not found" });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getProfile = getProfile;
const editProfile = async (req, res) => {
    const profile = req.body;
    const userId = req.user;
    try {
        const db = (0, db_1.getDb)();
        const imgUrl = await cloudinary_1.default.uploader.upload(profile.image, {
            folder: "user-profile",
            upload_preset: "TasteScape",
        });
        const coverUrl = await cloudinary_1.default.uploader.upload(profile.cover, {
            folder: "user-profile",
            upload_preset: "TasteScape",
        });
        profile.image = imgUrl.secure_url;
        profile.cover = coverUrl.secure_url;
        const response = await db.collection("profile").updateOne({ userId }, {
            $set: {
                name: profile.name,
                image: profile.image,
                cover: profile.cover,
                userId,
            },
        }, { upsert: true });
        response
            ? res.status(200).json(response)
            : res.status(500).json({ error: "error editing profile" });
    }
    catch (error) {
        console.log(error);
    }
};
exports.editProfile = editProfile;
//# sourceMappingURL=profileControllers.js.map