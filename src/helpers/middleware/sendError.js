export default (req, res, next) => {
    res.sendError = err => {
        res.status(err.status || 500);
        res.json({
            code: err.status || 500,
            message: err.message || err
        });
    };
    next()
}