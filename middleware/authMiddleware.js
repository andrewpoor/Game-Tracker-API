import jwt from "jsonwebtoken"
import { UnauthenticatedError } from "../errors/index.js";

export function authMiddleware(req, res, next) {
    //Get authorizarion header.
    const auth = req.headers.authorization;
    if(!auth || !auth.startsWith("Bearer ")) {
        throw new UnauthenticatedError("No Bearer token included in authorization headers.");
    }

    //Extract token from header.
    const token = auth.split(" ")[1];

    try {
        //Verify token and extract payload. Will throw if the token is invalid or empty.
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        //Attach token payload to req for next middleware to use.
        req.user = {name: payload.username, id: payload.userID};
    } catch(error) {
        throw new UnauthenticatedError("Invalid authorisation token.");
    }
    
    return next();
}