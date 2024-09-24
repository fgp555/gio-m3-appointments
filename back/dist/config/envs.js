"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.PASSAPP = exports.USER = void 0;
require("dotenv/config");
exports.USER = process.env.USER;
exports.PASSAPP = process.env.PASSAPP;
exports.PORT = process.env.PORT;
