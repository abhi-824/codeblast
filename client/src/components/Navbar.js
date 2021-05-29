import React from "react";
import { useEffect, useState } from "react";
import logo_light from "../resources/logo_light.png";
import {useHistory} from "react-router-dom"
import "../css/hero.css";
import M from "materialize-css";

const Hero = () => {
  const [handle, setHandle] = useState("");
  const history=useHistory();
  function setToStorageAndRedict() {
    const fetchURL = "https://codeforces.com/api/user.info?handles=";
    fetch(`${fetchURL}${handle}`).then((res) => {
      res.json();

      if (res.status == 400) {
        alert("Invalid Handle");
      } else {
        alert("Saved Successfully");
        localStorage.setItem("handle", handle);
        history.push("/dashboard/" + handle);  
      }
    });
  }
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            <img src={logo_light} alt="" />
          </a>
          {/* <ul id="nav-mobile" class="right hide-on-med-and-down"> */}
          {/* <li> */}
          <form
            action="/"
            className="editHandleForm"
            onSubmit={(e) => {
              e.preventDefault();
              setToStorageAndRedict();
            }}
          >
            <div class="input-field editHandle">
              <input
                id="editHandle"
                type="text"
                onChange={(e) => {
                  setHandle(e.target.value);
                }}
              />
              <label for="editHandle">Edit Handle</label>
            </div>
          </form>
          {/* </li> */}
          {/* </ul> */}
        </div>
      </nav>
    </div>
  );
};

export default Hero;
