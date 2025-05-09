import { Nav } from "react-bootstrap";

const Navbar = () => {
  return (
    <nav
      className="navbar bg-secondary border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container">
        <a className="navbar-brand" href="#">
          {/* <img
              src="/docs/5.3/assets/brand/bootstrap-logo.svg"
              alt="Bootstrap"
              width="30"
              height="24"
            /> */}
          GridGame
        </a>
        <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
      </div>
    </nav>
  );
};

export default Navbar;
