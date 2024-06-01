"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const foodSearch_1 = __importDefault(require("../routes/foodSearch"));
const likedRoutes_1 = __importDefault(require("../routes/likedRoutes"));
const createdFoodRoute_1 = __importDefault(require("../routes/createdFoodRoute"));
const profileRoutes_1 = __importDefault(require("../routes/profileRoutes"));
const userAuth_routes_1 = __importDefault(require("../routes/userAuth.routes"));
require("dotenv/config");
const db_1 = require("../db/db");
const app = (0, express_1.default)();
const PORT = process.env.PORT;
(0, db_1.connectToDb)()
    .then(() => {
    //middleware
    app.use((0, cors_1.default)({
        origin: "http://localhost:5173",
        methods: "GET,POST,PUT,PATCH,DELETE",
        credentials: true,
    }));
    app.use(express_1.default.json({ limit: "50mb" }));
    app.options("/favorites/:id", (0, cors_1.default)()); // Handle OPTIONS for DELETE
    app.use("/Home", foodSearch_1.default); //Route for first mount in /Home
    app.use("/favorites", likedRoutes_1.default); //Route for liked recipes
    app.use("/my-recipes", createdFoodRoute_1.default); //Route for creating Recipes
    app.use("/profile", profileRoutes_1.default);
    app.use("/", userAuth_routes_1.default);
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
})
    .catch((error) => {
    console.log("Failed to connect to MongoDB: ", error);
});
//# sourceMappingURL=index.js.map