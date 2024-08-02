const _ = require("lodash");
const Games = require("../models/Games.model");
const Questions = require("../models/Questions.model");

const fetchNextQuestion = async (questionNumber) => {
  const question = await Questions.find(
    { questionNumber },
    "_id question options"
  ).lean();
  return question[0] || {};
};

const getOpponentSocketId = (game, userId) => {
  const opponentPlayer =
    game.player1.toString() == userId
      ? game.player2.toString()
      : game.player1.toString();
  return game.meta[opponentPlayer];
};

const isDuplicateAnswer = (questions, playerQuestion) => {
  return _.find(questions, {
    _id: playerQuestion._id,
    player: playerQuestion.player,
  });
};

const validateGame = (game, player = {}) => {
  if (
    _.isEmpty(game) ||
    game.winner ||
    !_.includes([game.player1, game.player2], player._id)
  ) {
    return false;
  }
  return true;
};

module.exports = (io, socket) => {
  const startGame = async (payload) => {
    const { gameId } = payload;
    const user = socket.handshake.user;

    let game = await Games.findById(gameId);

    // checking if the game is not created or if game has been already played
    if (validateGame(game)) {
      io.to(socket.id).emit("game:info", {
        message: "Please start a new game, invalid gameId",
      });
      socket.disconnect();
    }

    game.meta[user._id] = socket.id;
    await Games.updateOne({ _id: gameId }, { meta: game.meta });
    const opponentPlayerScoket = getOpponentSocketId(game, user._id);

    // check if the opponent has joined the game
    if (opponentPlayerScoket) {
      io.to(opponentPlayerScoket).emit("game:info", {
        message: "Your opponent player has started the game !!",
      });

      const question = await fetchNextQuestion(game.questionNumber);
      io.to([socket.id, opponentPlayerScoket]).emit("question:send", {
        message: "New Question",
        question,
      });
    } else {
      io.to(socket.id).emit("game:info", {
        message: "Waiting for your opponent player",
      });
    }
  };

  const submitAnswer = async (payload) => {
    const { gameId, question, answer: playerAnswer } = payload;
    let game = await Games.findById(gameId);
    const user = socket.handshake.user;

    // validate game
    if (validateGame(game, user)) {
      io.to(socket.id).emit("game:info", {
        message: "Please start a new game, invalid gameId",
      });
      socket.disconnect();
    }

    const originalQuestion = await Questions.findById(payload.question._id);
    const opponentPlayerScoket = getOpponentSocketId(game, user._id);

    // checking for duplicate answers for the same by a player
    if (
      !isDuplicateAnswer(game.meta.questions, { question, player: socket.id })
    ) {
      game.meta.questions.push({
        ...question,
        player: socket.id,
        answer: playerAnswer,
      });
    }

    // updating player's score
    if (originalQuestion.correctOption == playerAnswer) {
      game.meta[socket.id] = _.get(game.meta, `${socket.id}`, 0) + 1;
    }

    // check for winner or game over
    if (
      game.meta.questions.length >= 12 ||
      game.questionNumber >= 7 ||
      originalQuestion.correctOption == 6
    ) {
      const opponentScore = game.meta[opponentPlayerScoket] || 0;
      const winner =
        (game.meta[socket.id] || 0) > opponentScore
          ? socket.id
          : opponentPlayerScoket;
      game.winner = winner;
      const notAWinner = socket.id == winner ? opponentPlayerScoket : socket.id;
      io.to(winner).emit("game:info", {
        message: "You WON the game",
        question,
      });
      io.to(notAWinner).emit("game:info", {
        message: "Better luck next time, You lost the game",
        question,
      });
      socket.disconnect();
    }

    await Games.updateOne(
      { _id: gameId },
      { meta: game.meta, ...(game.winner && { winner: game.winner }) }
    );

    if (game.meta.questions.length % 2 == 0) {
      game.questionNumber += 1;
      const question = await fetchNextQuestion(game.questionNumber);
      await Games.updateOne(
        { _id: gameId },
        { questionNumber: game.questionNumber }
      );
      io.to([socket.id, opponentPlayerScoket]).emit("question:send", {
        message: "New Question",
        question,
      });
    } else {
      io.to([socket.id]).emit("game:info", {
        message: "Waiting for opponent player's answer",
      });
    }
  };

  const endGame = async () => {
    io.to([socket.id]).emit("game:info", {
      message: "Good bye, have nice day",
    });
    socket.disconnect();
  };

  socket.on("game:init", startGame);
  socket.on("answer:submit", submitAnswer);
  socket.on("game:end", endGame);
};
