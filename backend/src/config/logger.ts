import winston from 'winston';
import { validateEnv } from './env.config';
const { format, createLogger, transports } = winston;
const { printf, combine, timestamp, colorize, uncolorize } = format;

const { NODE_ENV } = validateEnv();

const winstonFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp}: ${level}: ${stack || message}`;
});

export const logger = createLogger({
  level: NODE_ENV === 'development' ? 'debug' : 'info',
  format: combine(
    timestamp(),
    winstonFormat,
    NODE_ENV === 'development' ? colorize() : uncolorize()
  ),
  transports: [new transports.Console()],
});
