import "./App.css";
import { useState, useEffect } from "react";
import io from "socket.io-client";

let socket;

function App() {
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
    socket.emit("chat", { message });
    setMessage("");
  };

  useEffect(() => {
    socket.on("recieved", (msg) => {
      setChat([...chat, msg.message]);
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chit-cHat</h1>
        {chat.map((msg, index) => {
          return <p key={index}>{msg}</p>;
        })}
        <form onSubmit={sendchat}>
          <input
            type="text"
            name="msg"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder="Enter your msg"
          />
          <button type="submit">submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
