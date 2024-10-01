import { ErrorBase } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

export function errorHandler(err, req, res, next) {
    if(err instanceof ErrorBase) {
        return res.status(err.code).send(err.message);
    } else {
        //TEMP
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
}