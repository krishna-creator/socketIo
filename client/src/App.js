import Room from "./components/Room";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");

  const registerName = (e) => {
    e.preventDefault();
    setName(e.target.value);
    if (name !== "") {
      console.log(name);
      return <Room n="hi" />;
    }
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
