import React from "react";
import "../css/contest.css";
import "../css/hero.css";
import M from "materialize-css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import winner from "../resources/winner.gif";
const Hero = () => {
  const history = useHistory();
  const [loader,setloader]=useState("Fetching Users...");
  const { contest_id } = useParams();
  const [nums, setnums] = useState([]);
  const [standings, setStandings] = useState([]);
  const [winner_handle,setWinnerHandle]=useState("");
  const handle = localStorage.getItem("handle");
  let start_time;
  useEffect(() => {
    let users = [];
    let problems = [];
    if (handle == null) history.push("/");
    else {
      getData();
      async function getData() {
        await fetch("/api/getRoomProps/" + contest_id)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            
            users = data.handles;
            problems = data.questions;
            start_time=data.start_time;
            let probs = [];
            for (let i = 0; i < problems.length; i++) {
              let arr = problems[i].split("/");
              probs.push([parseInt(arr[0]), arr[1]]);
            }
            problems = probs;
            
            let arr = [];
            for (let j = 0; j < problems.length; j++) {
              arr.push(String.fromCharCode(65 + j));
            }
            
            setnums(arr);
            let d=new Date(data.start_time);
            d.setSeconds(d.getSeconds()+data.duration*60)
            let t=(d.getTime()-new Date().getTime())/1000;
            let min=data.duration*60;
            if(t<=min)
            {
              if(t>0)
                startTimer(t,document.querySelector(".timer"))
            }
            // startTimer(t,document.querySelector(".timer"))

            getStands();
          });
      }
      async function getPoints() {
        let re_map = new Map();
        setloader("Fetching All users submissions and Getting Scores");
        for (let j = 0; j < users.length; j++) {
          let handle_name = users[j];
          // async function getSetGo() {
          let modified_url = `https://codeforces.com/api/user.status?handle=${handle_name}`;
          let arr = [];
          for (let i = 0; i < problems.length; i++) {
            arr.push({
              result: false,
              penalty: 0,
              time: "Not solved",
              qno: i,
              points: problems[i][0],
            });
          }
          const jsondata = await fetch(modified_url);
          const jsdata = await jsondata.json();
          for (let i = 0; i < jsdata.result.length; i++) {
            let str =
              jsdata.result[i].problem.contestId +
              "-" +
              jsdata.result[i].problem.index;
            for (let ll = 0; ll < problems.length; ll++) {
              if (problems[ll][1] == str) {
                let unix_timestamp = jsdata.result[i].creationTimeSeconds;
                var date = new Date(unix_timestamp * 1000);
                // Hours part from the timestamp
                var date1 = date.getDate();
                var month1 = date.getMonth();
                var hours = date.getHours();
                // Minutes part from the timestamp
                let actualDate = new Date();
                var minutes = "0" + date.getMinutes();
                var seconds = "0" + date.getSeconds();
                var formattedTime =
                  hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
                var act_date = new Date();
                let act_month = act_date.getMonth();
                let act_dat = act_date.getDate();

                let res = {
                  result: false,
                  penalty: 0,
                  time: "Not solved",
                  qno: ll,
                  points: jsdata.result[i].problem.rating,
                };
                for (let l = 0; l < arr.length; l++) {
                  if (arr[l].qno == ll) {
                    res = arr[l];
                    break;
                  }
                }

                if (jsdata.result[i].verdict === "OK" && res.result == false) {
                  res.time = formattedTime;
                  res.result = true;
                  res.points = jsdata.result[i].problem.rating;
                  
                  
                  res.points = Math.floor(
                    Math.max(
                      res.points -
                        res.penalty * 50 -
                        Math.abs((date - start_time) / 60000) *
                          0.004 *
                          res.points,
                      res.points * 0.3
                    )
                  );
                  for (let l = 0; l < arr.length; l++) {
                    if (arr[l].qno == ll && arr[l].result == false) {
                      arr[l] = res;
                      
                      
                      break;
                    }
                  }
                } else {
                  if (act_dat == date1 && act_month == month1) {
                    res.penalty++;
                  }
                }
              }
            }
          }
          function compare(a, b) {
            if (a.qno < b.qno) {
              return -1;
            }
            if (a.qno > b.qno) {
              return 1;
            }
            return 0;
          }
          arr.sort(compare);
          re_map.set(users[j], arr);
        }
        return re_map;
      }
      function getStands() {
        getPoints().then((map) => {
        setloader("");
        let objArray = [];
          let rn = 1;
          for (const entry of map.entries()) {
            
            let sol = 0;
            let totPoints = 0;
            let indiPoints = [];
            for (let i = 0; i < entry[1].length; i++) {
              if (entry[1][i].result === true) {
                totPoints += entry[1][i].points;
                sol++;
                indiPoints.push(entry[1][i].points);
              } else {
                indiPoints.push(0);
              }
            }
            let obj = {
              rank: rn,
              name: entry[0],
              solved: sol,
              totalPoints: totPoints,
              indiPoints: indiPoints,
            };
            objArray.push(obj);
            rn++;
          }
          objArray.sort((c1, c2) =>
            c1.totPoints < c2.totPoints
              ? 1
              : c1.totPoints > c2.totPoints
              ? -1
              : 0
          );
          setWinnerHandle(objArray[0].name)
          setStandings(objArray);
        });
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
    }
  }, []);
  return (
    // <div className="problem-standing">
    <div className="contest">
      <div className="timer"></div>
      <div className="standings">
        
        <table className="striped responsive-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Contestant</th>
              <th>Solved</th>
              <th>points</th>
              {nums.map((item) => {
                return <th>{item}</th>;
              })}
            </tr>
          </thead>
          <tbody className="table-body">
            {standings.map((item) => {
              return (
                <tr>
                  <td>{item.rank}</td>
                  <td>{item.name}</td>
                  <td>{item.solved}</td>
                  <td>{item.totalPoints}</td>
                  {item.indiPoints.map((item2) => {
                    return <td>{item2}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <Winner ></Winner> */}
      </div>
      <div className="loadingState">{loader}</div>
      <div className="winner">
        <img src={winner} alt="" />
        <h4>Current Winner:</h4>
        <h4 className="contest-winner">{winner_handle}</h4>
      </div>
    </div>
  );
};

export default Hero;
