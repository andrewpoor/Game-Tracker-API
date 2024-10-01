import { ErrorBase } from "./errorBase.js";
import { StatusCodes } from "http-status-codes";

export class BadRequest extends ErrorBase {
    constructor(message) {
        super(message, StatusCodes.BAD_REQUEST);
    }
}