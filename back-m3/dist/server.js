"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRouter_1 = __importDefault(require("./routes/indexRouter"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const server = (0, express_1.default)();
server.use((0, morgan_1.default)("dev"));
server.use(express_1.default.static(path_1.default.join(__dirname, "../../front", "dist")));
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use("/api", indexRouter_1.default);
server.get("*", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "../../front/dist", "index.html"));
});
exports.default = server;