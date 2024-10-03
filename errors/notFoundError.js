import { ErrorBase } from "./errorBase.js";
import { StatusCodes } from "http-status-codes"

export class NotFoundError extends ErrorBase {
    constructor(message) {
        super(message, StatusCodes.NOT_FOUND);
    }
}