import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"

let storedUsername = "Alice";
let storedPassword = "Password1";

export function login(req, res) {
    if(storedUsername == req.body.username && storedPassword == req.body.password) {
        const token = jwt.sign({username: storedUsername}, process.env.JWT_SECRET, {expiresIn: "7d"});
        return res.status(StatusCodes.OK).json({"token": token});
    } else {
        throw new Error("Temp error. Login failed!");
    }
}

export function register(req, res) {
    const { username, password } = req.body;

    if(username && password) {
        storedUsername = username;
        storedPassword = password;
        return res.status(StatusCodes.OK).send(`${username} is registered!`);
    } else {
        throw new Error("Temp error. Must include username and password to register!");
    }
    
}