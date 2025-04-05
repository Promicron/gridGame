import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Info from "./pages/Info";
import Game from "./pages/Game";
import LeaderBoard from "./pages/LeaderBoard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="info" element={<Info />} />
          <Route path="game" element={<Game />} />
          <Route path="leaderboard" element={<LeaderBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
