import { StatusCodes } from "http-status-codes"
import { GameModel } from "../models/game.js";
import { NotFoundError } from "../errors/notFoundError.js";

//This middleware should be behind an authorisation layer that retrieves the user details of the client.

export async function getAllGames(req, res) {
    const games = await GameModel.find({ userID: req.user.id }).
        select('title console completed updatedAt').
        sort('title');

    return res.status(StatusCodes.OK).json({games});
}

export async function trackNewGame(req, res) {
    const game = await GameModel.create({ userID: req.user.id, ...req.body });

    return res.status(StatusCodes.CREATED).json({game});
}

export async function getGame(req, res) {
    const game = await GameModel.findOne({
        _id: req.params.id,
        userID: req.user.id
    }).select('title console completed updatedAt');

    if(!game) {
        gameNotFound(req.params.id);
    }

    return res.status(StatusCodes.OK).json({game});
}

export async function editGame(req, res) {
    const game = await GameModel.findOneAndUpdate(
        {
            _id: req.params.id,
            userID: req.user.id
        }, 
        req.body,
        {
            new: true,
            runValidators: true
        }
    ).select('title console completed updatedAt');

    if(!game) {
        gameNotFound(req.params.id);
    }

    return res.status(StatusCodes.OK).json({game});
}

export async function deleteGame(req, res) {
    const game = await GameModel.findOneAndDelete({
        _id: req.params.id,
        userID: req.user.id
    });

    if(!game) {
        gameNotFound(req.params.id);
    }

    return res.status(StatusCodes.OK).send();
}

function gameNotFound(id) {
    throw new NotFoundError(`No game found with id: ${id}.`);
}