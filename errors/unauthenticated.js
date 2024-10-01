import { ErrorBase } from "./errorBase.js";
import { StatusCodes } from "http-status-codes";

export class UnauthenticatedError extends ErrorBase {
    constructor(message) {
        super(message, StatusCodes.UNAUTHORIZED);
    }
}