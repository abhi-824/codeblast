import React, { useEffect } from "react";
// import { useEffect, useState } from "react";
// import logo_light from "../resources/logo_light.png"
// import heroVideo from "../resources/hero-video.mp4"
// import girlDream from "../resources/girl-dream.gif"
import "../css/Chatbox.css";
import "../css/hero.css";
import M from "materialize-css";

const Hero = () => {
  useEffect(() => {
    let options = {
      placeholder: "Enter User Handle",
      secondaryPlaceholder: "More Handles?"
    };
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.chips');
      const options = {
        placeholder: "Enter User Handle",
        secondaryPlaceholder: "More Handles?",
      };
      var instance = M.Chips.init(elems, options);
      document.querySelector('.chips-placeholder').chips({
        placeholder: "Enter User Handle",
        secondaryPlaceholder: "More Handles?"
      });
      // var instance = M.Chips.getInstance(elems);
      instance.addChip({
        tag: 'chip content',
        image: '', // optional
      });
    });
    M.AutoInit()
  }, []);

  return (
    <div className="add-handles">
      <div className="manual-handle">
        <h4>Add User Handles</h4>
      </div>
  <div className="chips" />
  <div className="get-questions"> 
  <button className="waves-effect waves-light btn questions-button">
    Get Questions
  </button>

  </div>

</div>

  );
};

export default Hero;