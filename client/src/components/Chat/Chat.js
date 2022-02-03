import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

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
      setMessage([...messages, message]); // cannot mutate state;
    });
  }, [messages]);

  return (
  <div className="outerContainer">
    <div className="container">
      <input value={message} onChange={(ev) => setMessage(ev.target.value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null }
      />
    </div>
  </div>
  );
};

export default Chat;
