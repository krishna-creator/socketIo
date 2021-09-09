import { useState, useEffect, useRef } from "react";
import "./Room.css";
import io from "socket.io-client";

let socket;
function Room(props) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const scrollB = useRef();
  useEffect(() => {
    socket = io.connect("http://localhost:5000/");

    return () => {
      socket.off();
    };
  }, []);
  useEffect(() => {
    const div = scrollB.current;
    div.scrollTop = div.scrollHeight;
    console.log(div.scrollTop);
  });
  const sendchat = (e) => {
    e.preventDefault();
    if (/\S/.test(message)) {
      socket.emit("chat", { message, name: props.name });
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("recieved", (msg) => {
      setChat([...chat, msg]);
    });
  });

  return (
    <div className="room">
      <h1 className="room-header">Chit-cHat</h1>
      <div className="room_chat_box">
        <div className="room_chat_messages" ref={scrollB}>
          {chat.map((msg, index) => {
            return (
              <div className="room_chat_message" key={index}>
                <span className="room_chat_message_sender">{msg.name}</span>
                <div className="room_chat_message_content">{msg.message}</div>
                <div className="room_chat_message_time">{msg.time}</div>
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
