import React from "react";
import "../css/contest.css";
import "../css/hero.css";
import "../css/schedule.css"
import M from "materialize-css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import ReactGa from "react-ga";
import { useHistory } from "react-router-dom";
const Hero = () => {  
  const history = useHistory();
  const {handle}=useParams();
  function getScheduledEvents() {
    fetch("/api/getScheduledRoom/"+handle)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data)
      });
  }
  getScheduledEvents()

  return <div className="schedule-cont">
    <div className="schedule-head">
      Your Scheduled Contests
    </div>
    <div className="schedule-list">
      <div className="schedule-card z-depth-4">
        <div className="schedule-card-left">
          <div className="schedule-roomid">
          Room Id: xcVt
          </div>
          <div className="schedule-members">
          Members: tourist tourist tourist tourist tourist tourist
          </div>
        </div>
        <div className="schedule-card-right">
          <div className="schedule-time">
            Start Time: 8:05 pm
          </div>
          <div className="schedule-problem">
            Problems: 8
          </div>
          <div className="schedule-Range">
            Range: 1200-2000
          </div>
          <div className="schedule-duration">
            Duration: 2 hours
          </div>
        </div>
      </div>

      <div className="schedule-card z-depth-4">
        <div className="schedule-card-left">
          <div className="schedule-roomid">
          Room Id: xcVt
          </div>
          <div className="schedule-members">
          Members: tourist tourist tourist tourist tourist tourist
          </div>
        </div>
        <div className="schedule-card-right">
          <div className="schedule-time">
            Start Time: 8:05 pm
          </div>
          <div className="schedule-problem">
            Problems: 8
          </div>
          <div className="schedule-Range">
            Range: 1200-2000
          </div>
          <div className="schedule-duration">
            Duration: 2 hours
          </div>
        </div>
      </div>

      <div className="schedule-card z-depth-4">
        <div className="schedule-card-left">
          <div className="schedule-roomid">
          Room Id: xcVt
          </div>
          <div className="schedule-members">
          Members: tourist tourist tourist tourist tourist tourist tourist tourist tourist tourist tourist tourist
          </div>
        </div>
        <div className="schedule-card-right">
          <div className="schedule-time">
            Start Time: 8:05 pm
          </div>
          <div className="schedule-problem">
            Problems: 8
          </div>
          <div className="schedule-Range">
            Range: 1200-2000
          </div>
          <div className="schedule-duration">
            Duration: 2 hours
          </div>
        </div>
      </div>

    </div>
  </div>;
};

export default Hero;
