import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const LeaderBoard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from("GridGame")
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
      <section className="container mt-4">
        <h2>Leaderboards</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entry.name}</td>
                <td>{entry.score}</td>
                <td>{new Date(entry.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default LeaderBoard;
