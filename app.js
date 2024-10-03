//Import third-party modules
import express from "express";
import "dotenv/config";
import "express-async-errors";
import mongoose from "mongoose";

//Import local middleware
import { urlNotFound } from "./middleware/notFound.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import { errorHandler } from "./middleware/errorHandler.js";

//Import routes
import { router as trackerRouter } from "./routes/gameTracker.js"
import { router as authRouter } from "./routes/authentication.js"

const PORT = process.env.PORT || 3000;
const app = express();

//Request parsing
app.use(express.json());

//Routing
app.use("/api/v1/games/", authMiddleware, trackerRouter);
app.use("/api/v1/auth/", authRouter);

//Error handling
app.use(urlNotFound);
app.use(errorHandler);

//Setup database and run the server.
(async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        app.listen(PORT, function() {
            console.log(`Server is now listening on port ${PORT}.`);
        });
    } catch (error) {
        //Could not connect to database. Shutdown without starting server.
        console.log(error);
    }
})();