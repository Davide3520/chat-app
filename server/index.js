const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const { addUser, removeUser, getUser, getUserInRoom } = require('./users')

const PORT = process.env.PORT || 8080;
const router = require("./router");
const app = express();

const server = http.createServer(app);
const io = socketio(server); // instance of socketio

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })

    if (error) return callback(error);

    socket.join(user.room);

  });

  socket.on("disconnect", () => {
    console.log("User had left!!");
  });
});

app.use(router);

server.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
