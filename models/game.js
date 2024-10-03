import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "Must be associated with a user."]
    },
    title: {
        type: String,
        required: [true, "Must provide a game title."]
    },
    console: {
        type: String,
        required: [true, "Must provide a console."],
        enum: ['Xbox', 'Playstation', 'Switch', 'PC', 'Other']
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

export const GameModel = mongoose.model("Game", GameSchema);