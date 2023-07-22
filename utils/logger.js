import dotenv from 'dotenv';
import { createLogger, format, transports } from 'winston';

dotenv.config(); // Loads .env file contents into process.env

let logger = createLogger({
    transports: [
        new transports.Console({
            level: 'error'
        }),
        new transports.File({
            filename: process.env.LOG_FILE_PATH || 'logs/server.log',
            maxsize: 1 * 1024 * 1024, // 1MB
            maxFiles: 10, // max files count
        })
    ],
    format: format.combine(
        format.timestamp({ format: 'DD-MMM-YYYY HH:mm:ss' }),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    ),
});

export default logger;
