const mongoose = require("mongoose");
const { Schema } = mongoose;

const GameSchema = new Schema(
  {
    player1: { type: Schema.Types.ObjectId, ref: "Users" },
    player2: { type: Schema.Types.ObjectId, ref: "Users" },
    questionNumber: {
      type: Number,
      default: 1,
    },
    meta: {
      type: Schema.Types.Mixed,
      default: { questions: [] },
    },
    winner: {
      type: String,
      default: null,
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, minimize: false }
);

const Games = mongoose.model("Games", GameSchema);
module.exports = Games;
