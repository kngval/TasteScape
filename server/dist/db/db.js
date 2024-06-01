"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.connectToDb = void 0;
const mongodb_1 = require("mongodb");
const uri = process.env.MONGO_URI;
let db;
async function connectToDb() {
    try {
        const client = new mongodb_1.MongoClient(uri);
        await client.connect();
        console.log(`Connected to MongoDB`);
        db = client.db();
    }
    catch (error) {
        console.log("Error Connecting to MongoDB : ", error);
        throw error;
    }
}
exports.connectToDb = connectToDb;
function getDb() {
    if (!db) {
        throw new Error("Db not Connected...");
    }
    return db;
}
exports.getDb = getDb;
//# sourceMappingURL=db.js.map