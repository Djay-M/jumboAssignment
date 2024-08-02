const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuestionsSchema = new Schema(
  {
    question: {
      type: String,
    },
    questionNumber: {
      type: Number,
    },
    options: {
      type: [String],
    },
    correctOption: {
      type: String,
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Questions = mongoose.model("Questions", QuestionsSchema);
module.exports = Questions;
