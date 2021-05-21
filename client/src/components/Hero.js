import React from "react";
import { useEffect, useState } from "react";
import {useHistory} from "react-router-dom"
import "../css/hero.css";
import loaderImage from "../resources/logo_animation.mp4"
import M from "materialize-css";

import logo_light from "../resources/logo_light.png"
import heroVideo from "../resources/hero-video.mp4"
import girlDream from "../resources/girl-dream.gif"

const fetchURL = "https://codeforces.com/api/user.info?handles=";
const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [handle, setHandle] = useState(localStorage.getItem('handle') || '');
  const [loader,setLoader]=useState("Get Started!")
  const history=useHistory();
  

  function getData(e) {
    e.preventDefault();
    setLoader("Loading...");
    fetch(`${fetchURL}${handle}`).then((res) => {
      res.json();
      setLoader("Get Started!");

      if(res.status==400)
      {
        alert("Invalid Handle")
      }
      else{
        localStorage.setItem('handle', handle);
        history.push("dashboard/"+handle)
      }
    });
  }
  useEffect(()=>{
    if(handle!=''){
      history.push("dashboard/"+handle)
    }
    setIsLoading(true);
    setTimeout(()=>{
      setIsLoading(false);
    },1500)
  },[])

  return (
    <div>
      {isLoading?"":(
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
                      {loader}<i class="material-icons">arrow_forward</i>
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
          
          </div>
      )}
      {isLoading?(
      <div className="logo_container">
      <video className="logo_animation" src={loaderImage} autoPlay loop></video>
        </div>
      ):""}
    </div>

  
  );
};

export default Hero;
