import React from "react";
import "../css/contest.css";
import "../css/hero.css";
import M from "materialize-css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    
      <div className="prob-stand-nav">
        <Link to="problems">
            <input id="tab1" type="radio" name="tabs"/>
            <label htmlFor="tab1" style={{ paddingLeft: 0 }}>
            Problems
            </label>
        </Link>
        <Link to="standings">
            <input id="tab2" type="radio" name="tabs" defaultChecked />
            <label htmlFor="tab2" style={{ paddingLeft: 0 }}>
            Standings
            </label>
        </Link>
        <button className="waves-effect waves-light btn update-table">
          Update
        </button>
      </div>
    
  );
};

export default Hero;
