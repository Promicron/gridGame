import { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

const ResultModal = ({
  showModal,
  score,
  scoreSaved,
  saveScore,
  handleRestart,
}) => {
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveScore = async () => {
    if (!name.trim()) return;
    setIsSaving(true);
    await saveScore(name, score);
    setIsSaving(false);
  };

  return (
    <Modal
      show={showModal}
      onHide={handleRestart}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body className="text-center p-4">
        <h3 className="mb-3">🎉 Game Over!</h3>
        <h4>
          Your Final Score: <strong>{score}</strong>
        </h4>

        {!scoreSaved ? (
          <>
            <Form.Group className="mt-4">
              <Form.Label>Enter Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSaving}
              />
            </Form.Group>
            <Button
              variant="success"
              onClick={handleSaveScore}
              className="mt-3 w-100"
              disabled={!name.trim() || isSaving}
            >
              {isSaving ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                </>
              ) : (
                "Save to Leaderboard"
              )}
            </Button>
          </>
        ) : (
          <div className="mt-4">
            <p className="text-success fw-bold">✅ Score saved!</p>
            <Link to="/leaderboard" className="btn btn-outline-dark mt-2">
              View Leaderboards
            </Link>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="justify-content-center">
        <Button variant="primary" onClick={handleRestart}>
          🔁 Restart Game
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResultModal;
