const validation = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 'Error',
                code: 400,
                message: error.details[0].message,
            });
        }
        next();
    };
};

module.exports = validation;
