import React from "react";
// import { useEffect, useState } from "react";
// import logo_light from "../resources/logo_light.png"
// import heroVideo from "../resources/hero-video.mp4"
// import girlDream from "../resources/girl-dream.gif"
import "../css/contest.css";
import "../css/hero.css";
import M from "materialize-css";

const Hero = () => {
  return (
    <div className="problem-standing">
      <div className="prob-stand-nav">
        <input id="tab1" type="radio" name="tabs" defaultChecked />
        <label htmlFor="tab1" style={{ paddingLeft: 0 }}>
          Problems
        </label>
        <input id="tab2" type="radio" name="tabs" />
        <label htmlFor="tab2" style={{ paddingLeft: 0 }}>
          Standings
        </label>
        <button className="waves-effect waves-light btn update-table">
          Update
        </button>
      </div>
      <div className="standings">
        <table className="striped responsive-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Contestant</th>
              <th>Solved</th>
              <th>points</th>
              <th>A</th>
              <th>B</th>
              <th>C</th>
              <th>D</th>
              <th>E</th>
            </tr>
          </thead>
          <tbody className="table-body">
            <tr>
              <td>1</td>
              <td>Lord_Invincible</td>
              <td>5</td>
              <td>8799</td>
              <td>494</td>
              <td>972</td>
              <td>1250</td>
              <td>1540</td>
              <td>1878</td>
            </tr>
            <tr>
              <td>2</td>
              <td>abdude824</td>
              <td>3</td>
              <td>6756</td>
              <td>498</td>
              <td>856</td>
              <td>1088</td>
              <td>-3</td>
              <td></td>
            </tr>
            <tr>
              <td>3</td>
              <td>naman114</td>
              <td>4</td>
              <td>345</td>
              <td>+</td>
              <td>+2</td>
              <td>+</td>
              <td>+11</td>
              <td>-4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hero;
