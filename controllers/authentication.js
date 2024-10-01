import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { BadRequest, UnauthenticatedError } from "../errors/index.js";

let storedUsername;
let storedPassHash;

export async function login(req, res) {
    const { username, password } = req.body;

    if(!username || !password) {
        throw new BadRequest("Must include a username and password when logging in.");
    }

    const isPassCorrect = await bcrypt.compare(password, storedPassHash);

    if(username != storedUsername || !isPassCorrect) {
        throw new UnauthenticatedError("Username or password is not correct. Please try again.");
    }

    //User has successfully logged in. Create token to identify them.
    const token = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn: "7d"});

    return res.status(StatusCodes.OK).json({"token": token});
}

export async function register(req, res) {
    const { username, password } = req.body;

    if(!username || !password) {
        throw new BadRequest("Must include a username and password when registering.");
    }

    storedUsername = username;
    storedPassHash = await bcrypt.hash(password, 10);
    
    return res.status(StatusCodes.OK).send(`${username} is registered!`);
}