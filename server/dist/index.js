"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const foodRoutes_1 = __importDefault(require("./routes/foodRoutes"));
const foodSearch_1 = __importDefault(require("./routes/foodSearch"));
require("dotenv").config();
const app = (0, express_1.default)();
//middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // Replace with your frontend's origin
    credentials: true,
}));
app.use("/profile", foodRoutes_1.default);
app.use("/Home", foodSearch_1.default);
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => app.listen(process.env.PORT, () => console.log("Server listening...")))
    .catch((error) => console.log(error));
mongoose_1.default.connection.on("error", (error) => {
    console.log("MongoDB Connection Error : ", error);
});
//# sourceMappingURL=index.js.map