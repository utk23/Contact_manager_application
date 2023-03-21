const errorHandler = (err, req, resp, next) => {
    const statusCode = resp.statusCode ? resp.statusCode : 500;
    if (statusCode === 400) {
        resp.json({ title: "validation failed", message: err.message, stackTrace: err.stack })

    }
    else if (statusCode === 404) {
        resp.json({ title: "Not Found", message: err.message, stackTrace: err.stack })
    }
    else if (statusCode === 401) {
        resp.json({ title: "Unauthorized", message: err.message, stackTrace: err.stack })
    }
    else if (statusCode === 403) {
        resp.json({ title: "Forbidden", message: err.message, stackTrace: err.stack })
    }
    else if (statusCode === 500) {
        resp.json({ title: "Server Error", message: err.message, stackTrace: err.stack })
    }
    else {
        console.log("No error, all good!");
    }

}
module.exports = errorHandler;