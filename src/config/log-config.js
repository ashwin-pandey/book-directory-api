const winston = require('winston');

/**
 * Log format
 */
const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(
        info => `${info.timestamp}: ${info.level}: ${info.message}`
    )
);

/**
 * Create logger
 */
const infoLogger = winston.createLogger({
    'level': 'info',
    'transports': [
        new winston.transports.File({
            filename: './logs/info.log',
            format: logFormat,
            level: 'info'
        }),
        new winston.transports.Console({
            format: winston.format.simple(),
            colorize: true
        })
    ]
});

const errorLogger = winston.createLogger({
    'level': 'error',
    'transports': [
        new winston.transports.File({
            filename: './logs/error.log',
            format: logFormat,
            level: 'error'
        }),
        new winston.transports.Console({
            format: winston.format.simple(),
            colorize: true
        })
    ]
});

/**
 * Export
 */
module.exports = {
    'infoLogger': infoLogger,
    'errorLogger': errorLogger
};