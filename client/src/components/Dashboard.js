import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import logo_light from "../resources/logo_light.png";
import heroVideo from "../resources/hero-video.mp4";
import girlDream from "../resources/girl-dream.gif";
import {useHistory} from "react-router-dom"
import "../css/hero.css";
import M from "materialize-css";
const Dashboard = () => {
  const history=useHistory();
  const {handle}=useParams();
  const [loader,setLoader]=useState("Create a Blast!")
  const [numberOfQuestions,setNum]=useState(4);
  const [err,setError]=useState("Some Error Occured!");
  const [min,setMin]=useState(1000);
  const [max,setMax]=useState(1900);
  function getRoomId() {
    setLoader("Loading...");
    fetch("/api/getRoom").then((res) => {
      return res.json();
    }).then((data)=>{
      if(data.status==200) {
        console.log("hey");
        let id=data.id;
        const options={
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({num:numberOfQuestions,min:min,max:max,handles:[handle],isCompleted:true,questions:[],id:data.id})
        }
        fetch("/api/createRoom",options).then((res) => {
          return res.json();
        }).then((data2)=>{
          if(data2.status==200) 
          {
            setLoader("Create a Blast!");
            history.push("/readyroom/"+id+"/"+handle)
          }
          else{
            setError("Error adding to database!");
          }
        })
      }
      else{
        setError("Error retreiving Room ID!");
      }
    })
  }
  return (
    <div>
      <div>
        {/* <nav>
          <div className="nav-wrapper">
            <a href="/" className="brand-logo">
              <img src={logo_light} alt />
            </a>
          </div>
        </nav> */}
        <div className="fullscreen">
          <video autoPlay muted loop id="myVideo">
            <source src={heroVideo} type="video/mp4" />
          </video>

          <div className="content">
            <h1 className="heading">CODEBLAST</h1>
            <form
              action="/dashboard"
              id="joinOrCreateRoom"
              onSubmit={(e) => {
                e.preventDefault();
                getRoomId();
              }}
            >
              <div>
                <div className="num">
                  <label for="numberOfQuestions">Number of questions: </label>
                  <p class="range-field">
                    <input
                      type="range"
                      name="numberOfQuestions"
                      min="3"
                      max="10"
                    />
                  </p>
                </div>
                <div className="minMaxRange">
                  <label for="min">Difficulty: </label>
                  <input type="number" name="min" value="1200" /> to
                  <input type="number" name="max" value="1900" />
                </div>
              </div>
              <div className="buttonsBlast">
                <button
                  type="submit"
                  onClick={(e) => {
                    // e.preventDefault();
                  }}
                >
                  {loader}<i class="material-icons">arrow_forward</i>
                </button>
                <form action="/">
                  <div class="input-field roomID">
                    <input id="last_name" type="text" class="validate" />
                    <label for="last_name">Room ID</label>
                  </div>
                </form>
              </div>
            </form>
            {/* //Join room buttons */}
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

export default Dashboard;
