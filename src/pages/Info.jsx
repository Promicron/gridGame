import { Link, useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";

const Info = ({ showModal, handleClose }) => {
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  const handleStartClick = () => {
    setCountdown(3); // start 3-second countdown
  };

  useEffect(() => {
    if (countdown === 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          navigate("/game"); // redirect to game
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, navigate]);
  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Body>
        <div className="container">
          <div className="card border-0">
            <h4 className="mb-3">How to Play</h4>
            <ul className="list-unstyled">
              <li>🟥 A random box will be highlighted in red.</li>
              <li>
                ⏱ You have 25 seconds to tap as many red boxes as you can.
              </li>
              <li>✅ Each correct tap earns you 1 point.</li>
              <li>
                💾 After the game ends, save your score to the leaderboard!
              </li>
            </ul>
          </div>
          <div className="d-flex justify-content-center align-items-center ">
            {countdown > 0 ? (
              <button
                className="btn btn-outline-dark animate__animated animate__pulse animate__infinite"
                disabled
              >
                Starting in {countdown}...
              </button>
            ) : (
              <button
                className="btn btn-outline-dark animate__animated animate__bounceIn"
                onClick={handleStartClick}
              >
                Let's Go!
              </button>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Info;
