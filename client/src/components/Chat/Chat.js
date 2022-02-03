import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import './Chat.css'
import InfoBar from '../InforBar/InfoBar'
import Input from '../Input/Input'
let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:8080";

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);
    socket = io(ENDPOINT, { transports: ["websocket"] });
    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, window.location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      // message is from backend
      setMessages([...messages, message]); // cannot mutate state;
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault()

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  console.log(message, messages)
  return (
  <div className="outerContainer">
    <div className="container">
      <InfoBar room={room}/>
      <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
    </div>
  </div>
  );
};

export default Chat;
