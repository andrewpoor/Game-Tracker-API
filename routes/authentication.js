import express from "express"
import * as controller from "../controllers/authentication.js"

export const router = express.Router();

router.route("/login").post(controller.login);
router.route("/register").post(controller.register);