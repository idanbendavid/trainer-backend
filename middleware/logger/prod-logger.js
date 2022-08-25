const { createLogger, format, transports } = require("winston");
const config = require("../../config.json");

function productionLogger() {
    return createLogger({
        level: "info",
        format: format.combine(
            format.timestamp(),
            format.errors({stack : true}),
            format.json(log => `${log.level}\t${log.timestamp}\t${log.message || log.stack}`)
        ),
        // defaultMeta: { meta data }
        transports: [
            new transports.File({ filename: config.production.logFile })
        ],
    });
}

module.exports = productionLogger