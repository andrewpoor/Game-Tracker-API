import jwt from "jsonwebtoken"
import { UnauthenticatedError } from "../errors/index.js";

export function authMiddleware(req, res, next) {
    //Get authorizarion header.
    const auth = req.headers.authorization;
    if(!auth || !auth.startsWith("Bearer ")) {
        noTokenError()
    }

    //Extract token from header.
    const token = auth.split(" ")[1];
    if(!token) {
        noTokenError()
    }

    //Verify token and extract payload. Will throw an error if verification fails.
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    //Attach token payload to req for next middleware to use.
    req.user = {username: payload.username};

    return next();
}

function noTokenError() {
    throw new UnauthenticatedError("No Bearer token included in authorization headers.");
}