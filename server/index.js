const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 8080;
const router = require("./router");
const app = express();

const server = http.createServer(app);
const io = socketio(server); // instance of socketio

io.on("connection", (socket) => {
  console.log("We have a new connection!!");

  socket.on("join", ({ name, room }, callback) => {
    console.log(name, room);
    callback();
  });

  socket.on("disconnect", () => {
    console.log("User had left!!");
  });
});

app.use(router);

server.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
