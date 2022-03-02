import winston, { format, transports } from 'winston';

const currentDate = new Date();
const filename = `${currentDate.getUTCFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getUTCDate()}.log`;

// Set the Console logger.
const consoleLogger = new transports.Console({
  level: process.env.DEBUG_LEVEL || 'debug',
});

// Set the file logger.
const fileLogger = new transports.File({
  level: process.env.DEBUG_LEVEL || 'debug',
  dirname: './logs',
  filename: filename,
});

const logConfiguration = {
  transports: [consoleLogger, fileLogger],
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf((info) => `[${info.level.substring(0, 3)}] [${[info.timestamp]}] [${info.message}]`)
  ),
};

const logger: winston.Logger = winston.createLogger(logConfiguration);

export { logger };
