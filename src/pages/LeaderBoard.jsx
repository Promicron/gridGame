import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { createClient } from "@supabase/supabase-js";
import { Link } from "react-router-dom";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const LeaderBoard = () => {
  const ITEMS_PER_PAGE = 20;
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from("leaderboard")
        .select("name, score, created_at")
        .order("score", { ascending: false });
      if (error) {
        console.error("Error fetching leaderboard: ", error);
      } else {
        setLeaderboard(data);
      }
    };
    fetchLeaderboard();
  }, []);


  return (
    <section>
      <Navbar />
      <section className="container mt-4 animate__animated animate__fadeIn">
        <h2 className="mb-4 text-center">🏆 Leaderboards</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered shadow-sm rounded">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard
                .slice(
                  (currentPage - 1) * ITEMS_PER_PAGE,
                  currentPage * ITEMS_PER_PAGE
                )
                .map((entry, index) => {
                  const globalRank =
                    (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
                  const isTopLeader = globalRank === 1;
                  return (
                    <tr
                      key={index}
                      className={`animate__animated animate__fadeInUp ${
                        isTopLeader ? "table-warning fw-bold" : ""
                      }`}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animationFillMode: "both",
                      }}
                    >
                      <td>{isTopLeader ? "🥇" : globalRank}</td>
                      <td>{entry.name}</td>
                      <td>{entry.score}</td>
                      <td>
                        {new Date(entry.created_at).toLocaleString(undefined, {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <nav>
            <ul className="pagination">
              {Array.from({
                length: Math.ceil(leaderboard.length / ITEMS_PER_PAGE),
              }).map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="text-center mt-4">
          <Link to="/">
            <button className="btn btn-dark me-2">🎮 Compete Now</button>
          </Link>
          <Link to="/game">
            <button className="btn btn-outline-secondary">🔁 Play Again</button>
          </Link>
        </div>
      </section>
    </section>
  );
};

export default LeaderBoard;
