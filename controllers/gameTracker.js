import { StatusCodes } from "http-status-codes"

export function getAllGames(req, res) {
    const {name: username, id: userID} = req.user;
    return res.status(StatusCodes.OK).json(`Getting all games for ${username} (ID: ${userID})!`);
}

export function trackNewGame(req, res) {
    return res.status(StatusCodes.OK).json(`Creating a new game tracking entry for ${req.body.title}!`);
}

export function getGame(req, res) {
    return res.status(StatusCodes.OK).json("Getting a single game!");
}

export function editGame(req, res) {
    return res.status(StatusCodes.OK).json("Editing a game entry!");
}

export function deleteGame(req, res) {
    return res.status(StatusCodes.OK).json("Deleting a game entry!");
}