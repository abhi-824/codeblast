import React from "react";
import "../css/contest.css";
import "../css/hero.css";
import M from "materialize-css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const Hero = () => {
  const { contest_id } = useParams();
  let users=[]
  let problems=[];
  let start_time;
  useEffect(() => {
    const handles=JSON.parse(localStorage.getItem('handles'));
    for(let i=0;i<handles.length;i++) {
      if(handles[i].room==contest_id){
        users=Object.values(handles[i].users)
        problems=handles[i].questions
        start_time=handles[i].start_time;
      }
    }
    async function getPoints(){
      let re_map = new Map();

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
              
              if (jsdata.result[i].verdict === "OK"&&res.result==false) {
                res.time = formattedTime;
                res.result = true;
                res.points = jsdata.result[i].problem.rating;
                res.points = Math.floor(Math.max(
                  res.points -
                    (res.penalty * 50) -
                    Math.abs((date - start_time) / 60000) *
                      0.004 *
                      res.points,
                  res.points * 0.3
                ));
                for (let l = 0; l < arr.length; l++) {
                  if (arr[l].qno == ll&&arr[l].result==false) {
                    arr[l] = res;
                    console.log(arr);
                    console.log(res);
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
      console.log(re_map);
    }
    getPoints();
    
  },[])
  return (
    // <div className="problem-standing">
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
    // </div>
  );
};

export default Hero;
