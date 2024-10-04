import { StatusCodes } from "http-status-codes";

export function errorHandler(err, req, res, next) {
    let code = err.code || StatusCodes.INTERNAL_SERVER_ERROR;
    let msg = err.message || "Something went wrong. Try again later.";
    
    if(err.code && err.code == 11000) {
        //Duplicate error (tried to enter a second copy of a unique field).
        code = StatusCodes.BAD_REQUEST;
        const key = Object.keys(err.keyValue)[0];
        msg = `Duplicate entry of '${err.keyValue[key]}' in the '${key}' field.`;
    } else if(err.name === 'ValidationError') {
        //Request failed at least one Mongoose validator.
        code = StatusCodes.BAD_REQUEST;

        //Join together each validation error message.
        msg = Object.values(err.errors).
            map((error) => error.message).
            join(" | ");
    } else if(err.name === 'CastError') {
        //Typically indicates a provided ID doesn't exist in the database.
        code = StatusCodes.NOT_FOUND;
        msg = `No game found with id: ${err.value}.`;
    }

    return res.status(code).json({msg});
}