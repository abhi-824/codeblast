import React from "react";
import { useEffect, useState } from "react";
import {useHistory} from "react-router-dom"
import "../css/hero.css";
import M from "materialize-css";

import logo_light from "../resources/logo_light.png"
import heroVideo from "../resources/hero-video.mp4"
import girlDream from "../resources/girl-dream.gif"

const fetchURL = "https://codeforces.com/api/user.info?handles=";
const Hero = () => {
  const [handle, setHandle] = useState("");
  const history=useHistory();
  function getData(e) {
    e.preventDefault();
    fetch(`${fetchURL}${handle}`).then((res) => {
      res.json();
      if(res.status==400)
      {
        alert("Invalid Handle")
      }
      else{
        history.push("dashboard/"+handle)
      }
    });
  }

  return (
    <div>
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="/" className="brand-logo">
              <img src={logo_light} alt />
            </a>
          </div>
        </nav>
        <div className="fullscreen">
          <video autoPlay muted loop id="myVideo">
            <source src={heroVideo} type="video/mp4" />
          </video>

          <div className="content">
            <h1>Interactive Practice on </h1>
            <h1 className="heading">CODEBLAST</h1>
            <p>BLAST YOUR CODE</p>
            <form action="/dashboard">
              <input
                type="text"
                name="handle"
                id
                placeholder="Codeforces Handle"
                required
                onChange={(e)=>{setHandle(e.target.value)}}
              />
              <button type="submit" onClick={getData}>
                Get Started<i class="material-icons">arrow_forward</i>
              </button>
            </form>
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
            <img src={girlDream} alt="" />
          </div>
        </div>
      </div>
      <footer>
        <img src="resources/logo_light.png" alt />
        <div className="about_us">
          <h1>About Us</h1>
          <p>
            We are students of Delhi Technological University, India.<br></br>{" "}
            And obviously do web development for fun because CP gave us chills.
          </p>
          <br></br>
          <br></br>
          <ul>
            <li>
              Abhinandan Sharma(
              <a href="https://github.com/abhi-824" target="_blank">
                Github
              </a>
              ,{" "}
              <a
                href="https://www.linkedin.com/in/abhinandan-sharma-0a2633175/"
                target="_blank"
              >
                LinkedIn
              </a>
              ,{" "}
              <a
                href="https://codeforces.com/profile/abdude824"
                target="_blank"
              >
                Codeforces
              </a>
              );
            </li>
            <li>
              Shubhang Jyotirmey(
              <a href="https://github.com/shubhangjyotirmay" target="_blank">
                Github
              </a>
              ,{" "}
              <a
                href="https://www.linkedin.com/in/shubhang-jyotirmay-383997196/"
                target="_blank"
              >
                LinkedIn
              </a>
              ,{" "}
              <a
                href="https://codeforces.com/profile/Lord_Invincible"
                target="_blank"
              >
                Codeforces
              </a>
              );
            </li>
            <li>
              Naman Gogia(
              <a href="https://github.com/naman114" target="_blank">
                Github
              </a>
              ,{" "}
              <a href="https://www.linkedin.com/in/namangogia/" target="_blank">
                LinkedIn
              </a>
              ,{" "}
              <a href="https://codeforces.com/profile/naman114" target="_blank">
                Codeforces
              </a>
              );
            </li>
          </ul>
        </div>
        <div className="contact_us">
          <h1>Contact Us</h1>
          <ul>
            <li>Codeforces Blog</li>
            <li>Mail to codeblasts@gmail.com</li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Hero;
