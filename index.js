#!/usr/bin/env node

/**
 * Module dependencies.
 */
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

var app = require("./app");
var debug = require("debug")("questions6:server");
var { createServer } = require("http");
const { Server } = require("socket.io");
const { verifyJwt } = require("./api/config/auth.config");
const APIError = require("./api/utils/APIErrors");
const gameHandlers = require("./api/handlers/gameHandlers");

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */

// var server = createServer(app);
const httpServer = createServer(app);

// socket connections
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.use((socket, next) => {
  if (socket.handshake.headers && socket.handshake.headers.authorization) {
    const token = socket.handshake.headers.authorization.split(" ")[1];
    const user = verifyJwt(token);
    if (user) {
      socket.handshake.user = user;
      next();
    }
  } else {
    io.emit("game:register", { status: 404, errors: "Token Not Valid" });
    next(new APIError({ status: 404, errors: "Token Not Valid" }));
  }
}).on("connection", async (socket, next) => {
  console.log("Socket is Active and waiting for connections");
  gameHandlers(io, socket);
});

/**
 * Listen on provided port, on all network interfaces.
 */
httpServer.listen(port);
httpServer.on("error", onError);
httpServer.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  console.log(`${process.env.ENV} server started on port: ${port}`);
  var addr = httpServer.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
