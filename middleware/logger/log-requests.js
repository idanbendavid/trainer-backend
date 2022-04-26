import logger from "./log-doc";

async function logRequests(request, response, next) {

    const msg = `${request.method} Request to ${request.originalUrl}`;

    logger.info(msg);

    next();
}

// collect message and deliver it to logger

export default logRequests;
