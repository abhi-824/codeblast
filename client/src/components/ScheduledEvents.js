import React from "react";
import "../css/contest.css";
import "../css/hero.css";
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
  return <div className=""></div>;
};

export default Hero;
