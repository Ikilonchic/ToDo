import appRoot from 'app-root-path';
import winston from 'winston';

const options = {
    info: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 10,
    },
    debug: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
    error: {
        level: 'error',
        filename: `${appRoot}/logs/error.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 10,
    },
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.info),
        new winston.transports.File(options.error),
        new winston.transports.Console(options.debug),
    ],
    exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
    write: (message: any) => logger.info(message)
};

export default logger;