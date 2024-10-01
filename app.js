//Import third-party modules
import express from "express";
import "dotenv/config";

//Import local middleware
import { urlNotFound } from "./middleware/not-found.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

//Import routes
import { router as trackerRouter } from "./routes/game-tracker.js"
import { router as authRouter } from "./routes/authorisation.js"

const PORT = process.env.PORT || 3000;
const app = express();

//Request parsing
app.use(express.json());

//Routing
app.use("/api/v1/games/", authMiddleware, trackerRouter);
app.use("/api/v1/auth/", authRouter);

//Error handling
app.use(urlNotFound);

//Setup
app.listen(PORT, function() {
    console.log(`Server is now listening on port ${PORT}.`);
});