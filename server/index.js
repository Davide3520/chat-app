const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const { addUser, removeUser, getUser, getUserInRoom } = require('./users')

const PORT = process.env.PORT || 8080;
const router = require("./router");
const { userInfo } = require("os");
const app = express();

const server = http.createServer(app);
const io = socketio(server); // instance of socketio

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })

    if (error) return callback(error);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});

    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined`});

    socket.join(user.room);

    io.to(user.room).emit('roomData', { room: user.room , users: getUserInRoom(user.room)})
    callback();

  });

  socket.on('sendMessage', (message, callback) => {

    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message});

    io.to(user.room).emit('roomData', { room: user.room , text: message})

    callback();
  })

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.`})
    }
    console.log("User had left!!");
  });
});

app.use(router);

server.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
