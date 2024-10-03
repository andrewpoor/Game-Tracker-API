//Import third-party modules
import express from "express";
import "dotenv/config";
import "express-async-errors";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";

//Import local middleware
import { urlNotFound } from "./middleware/notFound.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import { errorHandler } from "./middleware/errorHandler.js";

//Import routes
import { router as trackerRouter } from "./routes/gameTracker.js"
import { router as authRouter } from "./routes/authentication.js"

const PORT = process.env.PORT || 3000;
const app = express();

//Security.
app.set('trust proxy', 1); //For reverse proxy hosting.
app.use(rateLimit({
    max: 100, //Limits an IP to 100 requests per windowMs.
    windowMs: 15 * 60 * 1000, //15 minutes.
}));
app.use(helmet());
app.use(cors());
app.use(xss());

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