import { StatusCodes } from "http-status-codes"

export function getAllGames(req, res) {
    return res.status(StatusCodes.OK).json("Getting all games!");
}

export function trackNewGame(req, res) {
    return res.status(StatusCodes.OK).json("Creating a new game tracking entry!");
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