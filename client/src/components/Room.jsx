import { useState, useEffect } from "react";
import "./Room.css";
import io from "socket.io-client";

let socket;
function Room(props) {
  console.log(props);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  useEffect(() => {
    socket = io.connect("http://localhost:5000/");

    return () => {
      socket.off();
    };
  }, []);
  const sendchat = (e) => {
    e.preventDefault();
    if (/\S/.test(message)) {
      socket.emit("chat", { message, name: props });
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("recieved", (msg) => {
      console.log(msg);
      setChat([...chat, msg.message]);
    });
  });

  return (
    <div className="room">
      <h1 className="room-header">Chit-cHat</h1>
      <div className="room_chat_box">
        <div className="room_chat_messages">
          {chat.map((msg, index) => {
            return (
              <div className="room_chat_message" key={index}>
                {msg}
              </div>
            );
          })}
        </div>
        <form className="room_chat_input" onSubmit={sendchat}>
          <input
            className="message"
            type="text"
            name="msg"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder="Enter your msg"
          />
          <button className="send" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Room;
