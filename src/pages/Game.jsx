import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import ResultModal from "./ResultModal";
import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = 'https://zkhexpijvilkwoscmlvg.supabase.co';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const GRID_ROWS = 6;
const GRID_COLS = 4;
const GAME_DURATION = 25; // seconds

const Game = () => {
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(GAME_DURATION);
  const [activeCell, setActiveCell] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
        setActiveCell([
          Math.floor(Math.random() * GRID_ROWS),
          Math.floor(Math.random() * GRID_COLS),
        ]);
      }, 650);
      return () => clearInterval(interval);
    } else {
      setGameOver(true);
      setShowModal(true);
      fetchLeaderboard();
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

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase
      .from("leaderboard")
      .select("score, created_at, name")
      .order("score", { ascending: false });
    if (error) {
      console.error("Error fetching leaderboard: ", error);
    } else {
      setLeaderboard(data);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setTimer(GAME_DURATION);
    setGameOver(false);
    setActiveCell(null);
    setShowModal(false);
  };

  const saveScore = async (playerName, score) => {
    if (!scoreSaved) {
      const { error } = await supabase
        .from("leaderboard")
        .insert([{ name: playerName, score }]);
      if (error) {
        console.error("Error saving score:", error);
      } else {
        setScoreSaved(true);
      }
    }
  };

  return (
    <section>
      {/* <Navbar /> */}
      <section className="container-fluid">
        <div className="container text-center mt-4">
          <h1 className="mb-3">Click the Colored Box!</h1>
          <div className="d-flex">
            <p>Time Left: {timer}s</p>
            <p className="ms-auto">Score: {score}</p>
          </div>
          <div className="grid-boxes my-3">
            <div className="row row-cols-4 row-cols-md-5 row-cols-lg-8 g-1">
              {[...Array(GRID_ROWS * GRID_COLS)].map((_, index) => {
                const row = Math.floor(index / GRID_COLS);
                const col = index % GRID_COLS;
                return (
                  <div
                    key={index}
                    className={`col border ${
                      activeCell &&
                      row === activeCell[0] &&
                      col === activeCell[1]
                        ? "bg-danger"
                        : "bg-secondary"
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCellClick(row, col)}
                  ></div>
                );
              })}
            </div>
          </div>
          {/* {gameOver && (
            <div className="mt-4">
              <h2>Game Over! Final Score: {score}</h2>
              <button className="btn btn-primary mt-2" onClick={handleRestart}>
                Restart
              </button>
            </div>
          )} */}
        </div>
      </section>
      {/* Result Modal */}
      <ResultModal
        showModal={showModal}
        handleRestart={handleRestart}
        score={score}
        scoreSaved={scoreSaved}
        saveScore={saveScore}
      />
    </section>
  );
};

export default Game;
