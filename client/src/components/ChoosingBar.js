import React from "react";
import "../css/contest.css";
import "../css/hero.css";
import M from "materialize-css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
  return (
      <div className="prob-stand-nav">
            <input id="tab1" type="radio" name="tabs" defaultChecked onClick={(e)=>{gotoprobs()}} />
        {/* <Link to="problems"> */}
            <label htmlFor="tab1" style={{ paddingLeft: 0 }}>
            Problems
            </label>
        {/* </Link> */}
            <input id="tab2" type="radio" name="tabs" onClick={(e)=>{gotostands()}}/>
        {/* <Link to="standings"> */}
            <label htmlFor="tab2" style={{ paddingLeft: 0 }}>
            Standings
            </label>
        {/* </Link> */}
        <button className="waves-effect waves-light btn update-table">
          Update
        </button>
      </div>
    
  );
};

export default Hero;
