import logger, { Logger } from "pino";

export enum LoggerLevel {
  PRODUCTION = "info",
  DEBUG = "debug",
}

export const setupLogger = (level: LoggerLevel): Logger => {
  if (level === LoggerLevel.DEBUG) return setupDebugLogger(level);
  else return setupProductionLogger(level);
};

export const setupDebugLogger = (level = LoggerLevel.DEBUG): Logger => {
  const log = logger({
    formatters: {
      level: logLevel,
    },
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  });

  log.level = level; // This is now a string: 'debug'

  return log;
};

export const setupProductionLogger = (level: LoggerLevel): Logger => {
  const log = logger({
    formatters: {
      level: logLevel,
    },
  });

  log.level = level; // This is now a string: 'info'

  return log;
};
const logLevel = (label: string) => {
  return {
    level: label,
  };
};
