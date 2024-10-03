import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

import { BadRequest, UnauthenticatedError } from "../errors/index.js";
import { UserModel } from "../models/user.js";

export async function login(req, res) {
    const { username, password } = req.body;

    if(!username || !password) {
        throw new BadRequest("Must include a username and password when logging in.");
    }

    //Try to fetch user.
    const user = await UserModel.findOne({username: username});
    if(!user) {
        invalidCredentials();
    }

    //Verify password.
    const isPassCorrect = await bcrypt.compare(password, user.password);
    if(!isPassCorrect) {
        invalidCredentials();
    }

    //User has successfully logged in. Create token to identify them.
    const token = createToken(user);

    return res.status(StatusCodes.OK).json({"token": token});
}

export async function register(req, res) {
    const { username, password } = req.body;

    if(!username || !password) {
        throw new BadRequest("Must include a username and password when registering.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //Try to register user. Will throw if there's an issue.
    const user = await UserModel.create({username: username, password: hashedPassword});

    //User has successfully registered and is now logged-in. Create token to identify them.
    const token = createToken(user);
    
    return res.status(StatusCodes.OK).json({"token": token});
}

function createToken(user) {
    return jwt.sign(
        { username: user.username, userID: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
}

//Shared error message if username or password is incorrect.
function invalidCredentials() {
    throw new UnauthenticatedError("Username or password is incorrect. Please try again.");
}