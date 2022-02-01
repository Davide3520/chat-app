import React, {useState, useEffect} from "react";
import queryString from 'query-string';
import io from 'socket.io-client';

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {

    const { name, room }=  queryString.parse(window.location.search)
    setName(name);
    setRoom(room)
  })
  return (
    <h1>CHATT</h1>
  )
}

export default Chat;
