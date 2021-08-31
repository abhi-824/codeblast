import React from "react";
import "../css/Questions.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const Questions = () => {
  const history = useHistory();
  const { contest_id } = useParams();
  const [time, setTime] = useState([0,0]);
  const handle = localStorage.getItem("handle");
  const [problems, setProbs] = useState(["Nothing Yet"]);
  useEffect(() => {
    if (handle == null) history.push("/");
    else {
      const handles = JSON.parse(localStorage.getItem("handles"));
      async function fetchProblems() {
        await fetch("/api/getRoomProps/" + contest_id)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            let problems = data.questions
            let probs = [];
            for (let i = 0; i < problems.length; i++) {
              let arr = problems[i].split("/");
              probs.push([parseInt(arr[0]), arr[1]]);
            }
            setProbs(probs);
            let d=new Date(data.start_time);
            d.setSeconds(d.getSeconds()+data.duration*60)
            let t=(d.getTime()-new Date().getTime())/1000;
            console.log(d,d.getTime(),new Date().getTime(),t);
            let min=data.duration*60;
            if(t<=min)
            {
              if(t>0)
                startTimer(t,document.querySelector(".timer"))
            }
            else{
              probs=[];
              setProbs(probs);
              document.querySelector(".timer").innerHTML=""
            }
          });
      }
      if (handles == null) {
        fetchProblems();
      } else {
        let fl = 0;
        for (let i = 0; i < handles.length; i++) {
          if (handles[i].room == contest_id) {
            fl = 1;
            if (
              handles[i].questions == undefined ||
              handles[i].start_time == undefined ||
              handles[i].duration == undefined
            ) {
              fetchProblems();
            } else setProbs(handles[i].questions);
          }
        }
        if (!fl) {
          fetchProblems();
        }
      }
    }
    function startTimer(duration, display) {
      var timer = duration,
        minutes,
        seconds;
      let c = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
  
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
  
        display.innerHTML = minutes + ":" + seconds;
  
        if (--timer < 0) {
          alert("Time's Up!!!");
          clearInterval(c);
        }
      }, 1000);
    }
  }, []);
  function getLink(str) {
    let p = "";
    let q = "";
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "-") {
        for (let j = i + 1; j < str.length; j++) {
          q += str[j];
        }
        break;
      }
      p += str[i];
    }
    let link = `https://codeforces.com/problemset/problem/${p}/${q}`;
    return link;
  }
  return (
    <div>
      <div className="timer"></div>
      <div class="questions">
        <div className="cards">
          {
            problems.length>0?(
              problems.map((item) => {
              return (
                <div>
                  <div className="card card1">
                    <div className="container">{/* <img src={wrA} alt /> */}</div>
                    <div className="details">
                      <h3>{item[1]}</h3>
                      <a
                        href={getLink(item[1])}
                        target="_blank"
                        className="button-do-it"
                      >
                        Do It
                      </a>
                    </div>
                  </div>
                </div>
              );
            })

            ):(
              "Contest Has not started Yet"   
            )
          
          }
        </div>
      </div>
    </div>
  );
};

export default Questions;
