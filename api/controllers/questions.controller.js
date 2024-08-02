const Questions = require("../models/Questions.model");

exports.listAllQuestions = async (req, res, next) => {
  try {
    const questions = await Questions.find().lean();
    return res.json({
      status: 200,
      message: "Questions fetched successfully",
      data: questions,
    });
  } catch (error) {
    next(error);
  }
};

exports.createQuestion = async (req, res, next) => {
  try {
    const question = await Questions.create(req.body);
    return res.json({
      status: 200,
      message: "Question created successfully",
      data: question,
    });
  } catch (error) {
    next(error);
  }
};
