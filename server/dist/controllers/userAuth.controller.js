"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.loginUser = exports.signupUser = void 0;
const db_1 = require("../db/db");
const bcrypt_1 = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signupUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: "Please add all FIelds" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Please provide a valid email address" });
        }
        if (password.length < 7) {
            return res.status(400).json({ error: "Password must be at least 7 characters long" });
        }
        const db = (0, db_1.getDb)();
        const userExists = await db.collection("users").findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const user = await db.collection("users").insertOne({
            email,
            password: hashedPassword,
        });
        return user
            ? res.status(200).json({
                _id: user.insertedId,
                email,
                token: (0, exports.generateToken)(user.insertedId),
            })
            : res.status(400).json({ error: "error creating new user" });
    }
    catch (error) {
        console.log(error);
    }
};
exports.signupUser = signupUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(500).json({ error: "Please add all fields" });
        }
        if (email && password) {
            const db = (0, db_1.getDb)();
            const user = await db.collection("users").findOne({ email });
            if (!user) {
                return res.status(500).json({ error: "User does not exist" });
            }
            if (user && (await (0, bcrypt_1.compare)(password, user.password))) {
                return res.status(200).json({
                    id: user._id,
                    email,
                    token: (0, exports.generateToken)(user._id),
                    status: "logged in successfully",
                });
            }
            else {
                return res.status(500).json({ error: "Invalid login credentials" });
            }
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.loginUser = loginUser;
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {});
};
exports.generateToken = generateToken;
//# sourceMappingURL=userAuth.controller.js.map