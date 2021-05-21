import React from "react";
import { useEffect, useState } from "react";
import logo_light from "../resources/logo_light.png";
import "../css/hero.css";
import M from "materialize-css";

const Hero = () => {
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            <img src={logo_light} alt="" />
          </a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Hero;
