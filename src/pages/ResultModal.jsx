import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router";

const ResultModal = ({
  showModal,
  score,
  scoreSaved,
  saveScore,
  handleRestart,
}) => {
  const [name, setName] = useState("");
  const handleSaveScore = () => {
    if (name.trim()) {
      saveScore(name);
    }
  };

  return (
    <Modal show={showModal} onHide={handleRestart} centered>
      <Modal.Body>
        <div className="d-block text-center">
          <h3>Game Over !</h3>
          <h4>Your Final Score: {score}</h4>
          {!scoreSaved ? (
            <>
              <Form.Group className="mt-3">
                <Form.Label>Enter Your Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="success"
                onClick={handleSaveScore}
                className="mt-3"
                disabled={!name.trim()}
              >
                Save to Leaderboard
              </Button>
            </>
          ) : (
            <div className="d-block">
              <p className="text-success mt-3">Score saved!</p>
              <button className="btn btn-outline-dark">
                <Link to='/leaderboard'>View Leaderboards</Link>
              </button>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-center">
          <Button variant="primary" className="ms-3" onClick={handleRestart}>
            Restart
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ResultModal;
