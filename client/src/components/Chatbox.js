import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/Chatbox.css";
import "../css/hero.css";
import M from "materialize-css";

const Hero = () => {
  const { contest_id } = useParams();
  useEffect(() => {
    elem = document.querySelector(".chips");
    var elems = document.querySelectorAll(".chips");
    const options = {
      placeholder: "Enter User Handlee",
      secondaryPlaceholder: "More Handles?",
    };
    var instances = M.Chips.init(elems, options);
    M.AutoInit();
  }, []);
  var elem = document.querySelector(".chips");
  function checkhandles() {
    var instance = M.Chips.getInstance(elem).chipsData;
    console.log(instance);
    let fl=0;
    for(let i = 0; i<instance.length; i++){
      checkhandle(instance[i].tag);
    }
    async function checkhandle(handle){
      
      const fetchURL = "https://codeforces.com/api/user.info?handles=";
      await fetch(`${fetchURL}${handle}`).then((res) => {
        res.json();
        if (res.status == 400) {
          // elem.innerHTML=""
          fl=1;
          alert("Invalid Handle");
        }
      });
      
      if(fl==0){
        let arr=[];
        for(let i=0;i<instance.length; i++){
          arr.push(instance[i].tag)
        }
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            room:contest_id,
            handles: arr,
          }),
        };
        fetch("/api/updateHandles", options)
            .then((data2) => {
              if (data2.status == 200) {
                alert("Saved Successfully!")
              } else {
                alert("Some Error Occured!")
              }
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
          Get Questions
        </button>
      </div>
    </div>
  );
};

export default Hero;
