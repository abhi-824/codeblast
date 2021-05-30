import React from "react";
import logo_light from "../resources/logo_light.png";
const Hero = () => {
  return (
    <div>
      <footer>
        <img src={logo_light} alt />
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
