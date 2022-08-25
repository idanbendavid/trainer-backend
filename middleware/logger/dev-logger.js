const { createLogger, format, transports } = require("winston");
const config = require("../../config.json");

function developmentLogger() {
    return createLogger({
        level: "debug",
        format: format.combine(
            format.timestamp({ format: "YYYY-MM-DD hh:mm:ss" }),
            format.errors({stack : true}),
            format.printf(log => `${log.level}\t${log.timestamp}:\t${log.message || log.stack}`)
        ),
        transports: [
            new transports.File({ filename: config.development.logFile })
        ],
    });
}

// write the message that's been recieved from log request into log file 

module.exports = developmentLogger