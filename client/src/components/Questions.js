import React from "react";
import "../css/Questions.css";

const Questions = () => {
  return (
    <div>
      <div>
        <div className="cards">
          <div className="card card1">
            <div className="container">
              <img src="../../resources/a.jpg" alt />
            </div>
            <div className="details">
              <h3>1525A</h3>
              <div className="button-do-it">Do It</div>
            </div>
          </div>
          <div className="card card2">
            <div className="container">
              <img src="../../resources/b.jpg" alt />
            </div>
            <div className="details">
              <h3>1525B</h3>
              <div className="button-do-it">Do It</div>
            </div>
          </div>
        </div>
        <div className="cards">
          <div className="card card3">
            <div className="container">
              <img src="../../resources/c.jpg" alt />
            </div>
            <div className="details">
              <h3>1525C</h3>
              <div className="button-do-it">Do It</div>
            </div>
          </div>
          <div className="card card4">
            <div className="container">
              <img src="../../resources/d.jpg" alt />
            </div>
            <div className="details">
              <h3>1525D</h3>
              <div className="button-do-it">Do It</div>
            </div>
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

export default Questions;
