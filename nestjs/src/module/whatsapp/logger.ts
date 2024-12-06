// src/logger.ts
import Pino from 'pino';

const logger = Pino({
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: { colorize: true },
  },
}) as any;

export default logger;
