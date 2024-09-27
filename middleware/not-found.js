import StatusCodes from "http-status-codes"

export function urlNotFound(req, res) {
    return res.status(StatusCodes.NOT_FOUND).send("Route does not exist.");
}