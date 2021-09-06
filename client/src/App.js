import Room from "./components/Room";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState(false);

  if (name !== "" && status) {
    return <Room name={name} />;
  }

  const registerName = (e) => {
    e.preventDefault();
    setStatus(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chit-cHat</h1>
        <form onSubmit={registerName}>
          <input
            className="name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Enter your name"
          />
          <button className="name_submit" type="submit">
            submit
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;
