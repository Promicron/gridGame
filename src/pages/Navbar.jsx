import { Nav } from "react-bootstrap";

const Navbar = () => {
  return (
    <nav className="navbar bg-transparent border-body" data-bs-theme="dark">
      <div className="container text-white">
        <a className="navbar-brand" href="#">
          GridGame
        </a>
        <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
      </div>
    </nav>
  );
};

export default Navbar;
