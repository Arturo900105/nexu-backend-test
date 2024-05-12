
const registerValidationRules = (req, res, next) => {
    if (req.body.average_price < 100000) {
        throw new Error('The param average_price most be greater than 100000');
    }
    next();
};

module.exports = {
    registerValidationRules
};