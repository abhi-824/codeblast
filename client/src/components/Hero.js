import React from "react";
import { useEffect, useState } from "react";

import "../css/hero.css";
import M from "materialize-css";

const Hero = () => {
  return (
    <div>
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="/" className="brand-logo">
              <img src="resources/logo_light.png" alt />
            </a>
          </div>
        </nav>
        <div className="fullscreen">
          <video autoPlay muted loop id="myVideo">
            <source src="resources/hero-video.mp4" type="video/mp4" />
          </video>

          <div className="content">
            <h1>Interactive Practice on </h1>
            <h1 className="heading">CODEBLAST</h1>
            <p>BLAST YOUR CODE</p>
            <a href="/dashboard">
              Get Started <i class="material-icons">arrow_forward</i>
            </a>
          </div>
        </div>
      </div>
      <div className="instructions">
        <div className="content">
          <h1>Instructions</h1>
          <p>Here are the instructions to start a blast:</p>
          <ol>
            <li>Create a blast after logging in.</li>
            <li>Grab a coffee from your kitchen.</li>
            <li>
              Share the room id with your friends(See top right corner after
              joining).
            </li>
            <li>
              Let your friends join the room. Meanwhile, check out Fast and
              furious 9 songs and trailer🔥😁.
            </li>
            <li>
              When all your friends have joined, just click on the Ready button
              and ask all others to do the same.
            </li>
            <li>
              Questions would be visible to all of you, so All the best👍🤞
            </li>
          </ol>
        </div>
        <div className="image">
          <div className="request-loader">
            <img src="resources/girl-dream.gif" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
