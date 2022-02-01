import React, {useState, useEffect} from "react";
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const ENDPOINT = 'localhost:3000'
  useEffect(() => {

    const { name, room }=  queryString.parse(window.location.search)
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room)

    socket.emit()

  }, [ENDPOINT, window.location.search])
  return (
    <h1>CHATT</h1>
  )
}

export default Chat;
