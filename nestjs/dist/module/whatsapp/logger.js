"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = require("pino");
const logger = (0, pino_1.default)({
    level: 'info',
    transport: {
        target: 'pino-pretty',
        options: { colorize: true },
    },
});
exports.default = logger;
//# sourceMappingURL=logger.js.map