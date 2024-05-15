const logger = require("../../config/monitoring/logger.cjs");
const handleError = async (err, req, res, next) => {
    const {code, statusCode, message} = err;
    const response = () => {
        switch (code) {
            case 'ECONNREFUSED':
                return "We can connect to de DB"
            case '42P01':
                return "The table referenced in the query does not exist in the database"
        }
        return message
    }
    logger.error(`Error: ${response()}`, {stack: err.stack});
    res.status(statusCode || 500).json({
        status: "error",
        statusCode,
        code,
        message: response()
    });
};

module.exports = {
    handleError
};
