import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"
import { BadRequest, UnauthenticatedError } from "../errors/index.js";

let storedUsername = "Alice";
let storedPassword = "Password1";

export function login(req, res) {
    const { username, password } = req.body;

    if(!username || !password) {
        throw new BadRequest("Must include a username and password when logging in.");
    }

    if(username != storedUsername || password != storedPassword) {
        throw new UnauthenticatedError("Username or password is not correct. Please try again.");
    }

    //User has successfully logged in. Create token to identify them.
    const token = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn: "7d"});

    return res.status(StatusCodes.OK).json({"token": token});
}

export function register(req, res) {
    const { username, password } = req.body;

    if(!username || !password) {
        throw new BadRequest("Must include a username and password when registering.");
    }

    storedUsername = username;
    storedPassword = password;
    
    return res.status(StatusCodes.OK).send(`${username} is registered!`);
}