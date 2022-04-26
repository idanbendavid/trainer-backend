const { createLogger, transports, format } = require("winston");
const config = require("../../config.json");

const logger = createLogger({
    level: "info",
    transports: [
        new transports.File({ filename: config.development.logFile })
    ],
    format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD hh:mm:ss" }),
        format.printf(log => `${log.level}\t${log.timestamp}:\t${log.message}`)
    )
});

// write the message that's been recieved from log request into log file 
export default logger;



