import StatusCodes from "http-status-codes";

const notFoundMiddleware = (err, req, res, next) => {
    res.status(StatusCodes.NOT_FOUND).json({ message: "Not Found from Error Handler Middleware" });
}

export default notFoundMiddleware;