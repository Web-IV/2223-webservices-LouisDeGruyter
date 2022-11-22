const winston = require('winston'); // import winston from 'winston';
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console(),
       
    ],
});
module.exports.getLogger = () => logger;