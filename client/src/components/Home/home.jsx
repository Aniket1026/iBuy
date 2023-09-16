import React from "react";
import { CgMouse } from "react-icons/cg";
import './home.css'

const Home = () => {
  return (
    <React.Fragment>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
    </React.Fragment>
  );
};

export default Home;
