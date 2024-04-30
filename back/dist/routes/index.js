"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersControllers_1 = require("../controllers/usersControllers");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = (0, express_1.Router)();
router.post("/users", usersControllers_1.createUser);
router.get("/users", auth_1.default, usersControllers_1.getUsers);
router.delete("/users", usersControllers_1.deleteUser);
exports.default = router;
