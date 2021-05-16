import React from "react";
// import { useEffect, useState } from "react";
// import logo_light from "../resources/logo_light.png"
// import heroVideo from "../resources/hero-video.mp4"
// import girlDream from "../resources/girl-dream.gif"
import "../css/contest.css";
import winner from "../resources/winner.gif";
//import M from "materialize-css";

const Hero = () => {
  return (
    <div className="winner">
      <img src={winner} alt="" />
      <h4>Current Winner:</h4>
      <h4 className="contest-winner">Abdude824</h4>
    </div>
  );
};

export default Hero;
