import React from "react";
import { useEffect, useState } from "react";

import '../css/hero.css';
import M from 'materialize-css';

const Hero = () => {
  return (
    <div>
      <div>
        <a id="menu" className="waves-effect waves-light btn btn-floating"><i className="material-icons">menu</i></a>
        {/* Tap Target Structure */}
        <div className="tap-target" data-target="menu">
          <div className="tap-target-content">
            <h5>Title</h5>
            <p>A bunch of text</p>
          </div>
        </div>
      </div>

      <video autoPlay={true} muted loop>
        <source src="/resources/logo_animation.mp4" type="video/mp4" />
      </video>
    </div>

  );
};

export default Hero;