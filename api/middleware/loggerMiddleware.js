import logger from "../../config/monitoring/logger.js";

const logRequest = (req, res, next) => {
    const { method, url } = req;
    const start = process.hrtime();

    res.on('finish', () => {
        const [seconds, nanoseconds] = process.hrtime(start);
        const durationInMilliseconds = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);
        const { statusCode } = res;
        logger.info(`${method} ${url} ${statusCode} ${durationInMilliseconds}ms`);
    });

    next();
};

export default logRequest;
