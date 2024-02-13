import "./App.css";
import { Link } from "react-router-dom";
import logo from "./static/logo.jpg";

function App() {
  return (
    <div className="App">
      <img src={logo} alt="Logo" className="img" />
      <div className="link">
        <Link to="/timer">TIMER</Link>
        <Link to="/palette">PALETTE</Link>
      </div>
    </div>
  );
}

export default App;
