import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";

const GRID_ROWS = 6;
const GRID_COLS = 4;
const GAME_DURATION = 25; // seconds

const Game = () => {
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(GAME_DURATION);
  const [activeCell, setActiveCell] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
        setActiveCell([
          Math.floor(Math.random() * GRID_ROWS),
          Math.floor(Math.random() * GRID_COLS),
        ]);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setGameOver(true);
    }
  }, [timer]);

  const handleCellClick = (row, col) => {
    if (
      !gameOver &&
      activeCell &&
      row === activeCell[0] &&
      col === activeCell[1]
    ) {
      setScore((prev) => prev + 1);
      setActiveCell(null);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setTimer(GAME_DURATION);
    setGameOver(false);
    setActiveCell(null);
  };

  return (
    <section>
      <Navbar />
      <section className="container-fluid">
        <div className="container text-center mt-4">
          <h1 className="mb-3">Click the Colored Box!</h1>
          <p>Time Left: {timer}s</p>
          <p>Score: {score}</p>
          <div className="grid-boxes my-3">
            <div className="row row-cols-4 row-cols-md-5 g-1">
              {[...Array(GRID_ROWS * GRID_COLS)].map((_, index) => {
                const row = Math.floor(index / GRID_COLS);
                const col = index % GRID_COLS;
                return (
                  <div
                    key={index}
                    className={`col border d-flex align-items-center justify-content-center ${
                      activeCell &&
                      row === activeCell[0] &&
                      col === activeCell[1]
                        ? "bg-danger"
                        : "bg-secondary"
                    }`}
                    style={{ width: "50px", height: "50px", cursor: "pointer" }}
                    onClick={() => handleCellClick(row, col)}
                  ></div>
                );
              })}
            </div>
          </div>
          {gameOver && (
            <div className="mt-4">
              <h2>Game Over! Final Score: {score}</h2>
              <button className="btn btn-primary mt-2" onClick={handleRestart}>
                Restart
              </button>
            </div>
          )}
        </div>
      </section>
    </section>
  );
};

export default Game;
