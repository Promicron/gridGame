import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Info from "./pages/Info";
import Game from "./pages/Game";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="info" element={<Info />} />
          <Route path="game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
