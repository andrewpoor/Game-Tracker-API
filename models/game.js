import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
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

export const GameModel = mongoose.Model("Game", GameSchema);