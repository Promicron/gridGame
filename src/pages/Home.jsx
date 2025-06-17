import { Link } from "react-router";
import Navbar from "./Navbar";
import Silk from "./Silk";
import { useState } from "react";
import Info from "./Info";

const Home = () => {
  const [infoModal, setInfoModal] = useState(false);
  const OpenInfoModal = () => setInfoModal(true);

  const CloseInfoModal = () => setInfoModal(false);
  return (
    <section className="home-section">
      <div className="silk-background">
        <Silk
          speed={5}
          scale={1}
          color="#7B7481"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      <Navbar />
      <div className="d-flex mt-5 justify-content-center align-items-center">
        <div className=" text-center position-relative z-1 top-12">
          <h2 className="text-white">Welcome !</h2>
          <button className="btn btn-light" onClick={OpenInfoModal}>
            {" "}
            Start Game
          </button>
        </div>
      </div>
      <Info showModal={infoModal} handleClose={CloseInfoModal} />
    </section>
  );
};

export default Home;
