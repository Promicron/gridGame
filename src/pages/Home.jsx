import { Link } from "react-router";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <section>
      <Navbar />
      <div className="container text-center">
        <h4>Welcome !</h4>
        <Link to="/info">
          <button className="btn btn-dark"> Start Game</button>
        </Link>
      </div>
    </section>
  );
};

export default Home;
