import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router";

const Info = () => {
  return (
    <section>
      <Navbar />
      <h2>Instructions</h2>

      <div className="container">
        <div className="card shadow rounded border-0">
          <ul>
            <li>Click the colored boxes</li>
            <li>Click the colored boxes</li>
            <li>Click the colored boxes</li>
            <li>Click the colored boxes</li>
          </ul>
        </div>
        <Link to="/game">
          <button className="btn btn-outline-dark">Start Game</button>
        </Link>
      </div>
    </section>
  );
};

export default Info;
