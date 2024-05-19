"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedRoutes = void 0;
const db_1 = require("../db/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongodb_1 = require("mongodb");
const protectedRoutes = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            // Encoded Token
            token = req.headers.authorization.split(" ")[1];
            console.log("EncodedToken", token);
            // Verify token and assert its type
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            console.log("Decoded Token", decodedToken);
            const tokenId = decodedToken.id;
            console.log("TOKEN ID : ", tokenId);
            // Get user from token
            const db = (0, db_1.getDb)();
            const userDB = await db
                .collection("users")
                .findOne({ _id: new mongodb_1.ObjectId(decodedToken.id) }, { projection: { _id: 1 } });
            console.log("USER FROM DB", userDB);
            req.user = userDB._id.toString();
            console.log('REQ.USER : ', req.user);
            next();
        }
        catch (error) {
            console.log(error);
            res.status(401).json({ error: "Not Authorized" });
        }
    }
    if (!token) {
        res.status(401).json({ error: "Not Authorized, No Token" });
    }
};
exports.protectedRoutes = protectedRoutes;
//# sourceMappingURL=authMiddleware.js.map