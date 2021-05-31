import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import "../css/Chatbox.css";
import "../css/hero.css";
import M from "materialize-css";
import ReactGa from 'react-ga'

const Hero = () => {
  const { contest_id } = useParams();
  const [loader,setLoader]=useState("Add Handles")
  useEffect(() => {
    console.log(process.env.REACT_APP_GOOGLE_ANALYTICS_ID)
    ReactGa.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID)
    ReactGa.pageview('/readyroom')
    elem = document.querySelector(".chips");
    var elems = document.querySelectorAll(".chips");
    const options = {
      placeholder: "Enter Handle",
      secondaryPlaceholder: "More Handles?",
    };
    var instances = M.Chips.init(elems, options);
    M.AutoInit();
  }, []);
  var elem = document.querySelector(".chips");
  function displayAlert(str){
    alert(str);
  }
  function checkhandles() {
    setLoader("Validating Handles...")
    var instance = M.Chips.getInstance(elem).chipsData;
    console.log(instance);
    if(instance.length>10)
    {
      displayAlert("Limit is Upto 10 handles!");
      return;
    }
    let fl = 0;
    // for(let i = 0; i<instance.length; i++){
    checkhandle(instance);
    // }
    async function checkhandle(handle) {
      for (let i = 0; i < handle.length; i++) {
        const fetchURL = "https://codeforces.com/api/user.info?handles=";
        await fetch(`${fetchURL}${handle[i].tag}`).then((res) => {
          res.json();
          if (res.status == 400) {
            // elem.innerHTML=""
            fl = 1;
            alert("Invalid Handle");
          }
        });
      }
      setLoader("Adding to Database!")

      if (fl == 0) {
        let arr = [];
        for (let i = 0; i < instance.length; i++) {
          arr.push(instance[i].tag);
        }
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            room: contest_id,
            handles: arr,
          }),
        };
        fetch("/api/updateHandles", options).then((res) => {
          return res.json();
        }).then((data2) => {
          setLoader("Add Handles")
          alert(data2.message);
        });
      }
    }
  }

  return (
    <div className="add-handles">
      <div className="manual-handle">
        <h4>Add User Handles</h4>
      </div>
      <div className="chips chips-placeholder" />
      <div className="get-questions">
        <button
          className="waves-effect waves-light btn questions-button"
          onClick={() => {
            checkhandles();
          }}
        >
          {loader}
        </button>
      </div>
    </div>
  );
};

export default Hero;
