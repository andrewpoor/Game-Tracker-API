import express from "express";
import * as controller from "../controllers/gameTracker.js"

export const router = express.Router();

router.route("/").
    get(controller.getAllGames).
    post(controller.trackNewGame);

router.route("/:id").
    get(controller.getGame).
    patch(controller.editGame).
    delete(controller.deleteGame);