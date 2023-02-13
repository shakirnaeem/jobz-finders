export { errorHandler };

function errorHandler(err, res) {
    if (typeof (err) === 'string') {
        // custom application error
        const is404 = err.toLowerCase().endsWith('not found');
        const statusCode = is404 ? 404 : 400;
        return res.status(statusCode).json({ success: false, message: err, data: [] });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ success: false, message: 'Invalid Token', data: [] });
    }

    // default to 500 server error
    return res.status(500).json({ success: false, message: err.message, data: [] });
}