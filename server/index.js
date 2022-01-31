const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 8080;
const router = require('./router')
const app = express();

const server = http.createServer(app);
const io = socketio(server);

app.use(router)

server.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`)
})
