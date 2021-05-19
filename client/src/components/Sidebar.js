import React from "react";
// import { useEffect, useState } from "react";
// import logo_light from "../resources/logo_light.png"
// import heroVideo from "../resources/hero-video.mp4"
// import girlDream from "../resources/girl-dream.gif"
import "../css/Chatbox.css";
import "../css/hero.css";
import M from "materialize-css";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="people-sidebar">
  <div className="ready-button">
    <Link to="/contest/abd/abd/problems">
     <button className="waves-effect waves-light btn ready-start">Ready!</button>
    </Link>
  </div>
  <div className="people-list">
    <h3 className="list-heading">Contestants</h3>
    <div className="contestant-list">
      <h4 className="contestant-name">Lord_Invincible</h4>
      <h4 className="contestant-name">abdude824</h4>
      <h4 className="contestant-name">naman114</h4>
      <h4 className="contestant-name">mexomerf</h4>
      <h4 className="contestant-name">Marcos0901</h4>
    </div>
  </div>
</div>

  );
};

export default Hero;