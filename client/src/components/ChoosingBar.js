import React from "react";
import "../css/contest.css";
import "../css/hero.css";
import M from "materialize-css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactGa from 'react-ga'

import { useHistory } from "react-router-dom";

const Hero = () => {
  const history = useHistory();
  function gotoprobs(){
    history.push("problems")
  }
  
  
  function gotostands(){
    history.push("standings")
  }
  const [isChecked,setCheck]=useState(false);
  useEffect(() => {
    ReactGa.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID)
    ReactGa.pageview('/contest')
  },[])
  return (
    <div className="prob-stand-nav">
            <input id="tab1" type="radio" name="tabs" defaultChecked onClick={(e)=>{gotoprobs()}} />
        {/* <Link to="problems"> */}
            <label htmlFor="tab1" style={{ paddingLeft: 0 }}>
            Bugaboos
            </label>
        {/* </Link> */}
            <input id="tab2" type="radio" name="tabs" onClick={(e)=>{gotostands()}}/>
        {/* <Link to="standings"> */}
            <label htmlFor="tab2" style={{ paddingLeft: 0 }}>
            Standings
            </label>
      </div>
    
    );
};

export default Hero;
