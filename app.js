//Import third-party modules
import express from "express";

//Import local middleware
import { urlNotFound } from "./middleware/not-found.js";

//Import routes
import { router as trackerRouter } from "./routes/game-tracker.js"

const PORT = process.env.PORT || 3000;
const app = express();

//Request parsing
app.use(express.json());

//Routing
app.use("/api/v1/games/", trackerRouter);

//Error handling
app.use(urlNotFound);

//Setup
app.listen(PORT, function() {
    console.log(`Server is now listening on port ${PORT}.`);
});