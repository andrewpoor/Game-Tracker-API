import jwt from "jsonwebtoken"

export function authMiddleware(req, res, next) {
    //Get authorizarion header.
    const auth = req.headers.authorization;
    if(!(auth && auth.startsWith("Bearer "))) {
        throw new Error("Temp error. No JWT present in request!");
    }

    //Extract token from header.
    const token = auth.split(" ")[1];
    if(!token) {
        throw new Error("Temp error. No JWT present in request!");
    }

    //Verify token and extract payload.
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    //Attach token payload to req for next middleware to use.
    req.user = {username: payload.username};

    return next();
}