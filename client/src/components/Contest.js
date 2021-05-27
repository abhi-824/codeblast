import React from "react";
import "../css/contest.css";
import "../css/hero.css";
import M from "materialize-css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const Hero = () => {
  const history = useHistory();
  const { contest_id } = useParams();
  const [nums,setnums]=useState([]);
  const [standings,setStandings]=useState([]);
  
  const handle = localStorage.getItem("handle");
  let start_time;
  useEffect(() => {
    let users=[]
    let problems=[];
    if(handle==null)history.push('/');
    else{

      const handles=JSON.parse(localStorage.getItem('handles'));
      if(handles!=null){
        let fl=0;
        for(let i=0;i<handles.length;i++) {
          if(handles[i].room==contest_id){
            users=Object.values(handles[i].users)
            fl=1;
            if(handles[i].questions==undefined||handles[i].users==undefined||handles[i].start_time==undefined){
              getData();
            }
            else{
              problems=handles[i].questions
              let arr=[];for(let j=0;j<problems.length;j++){arr.push(String.fromCharCode(65 + j))};
              console.log(arr)
              setnums(arr);
              start_time=handles[i].start_time;
            }
          }
        }
        if(!fl){
          getData();
        }
        else{
          getStands();
        }
      }
      else{
        getData();
      }
      async function getData(){
        await fetch("/api/getRoomProps/"+contest_id).then((res) => {
          return res.json();
        }).then((data)=>{
          console.log(data);
          users=data.handles;
          problems=data.questions;
          let arr=[];for(let j=0;j<problems.length;j++){arr.push(String.fromCharCode(65 + j))};
            console.log(arr)
            setnums(arr);
          getStands();
        })
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
       return re_map;
      }
      function getStands(){
        getPoints().then((map)=>{
          let objArray=[]
          let rn=1;
          for (const entry of map.entries()) {
            console.log(entry);
            let sol=0;
            let totPoints=0;
            let indiPoints=[];
            for(let i=0;i<entry[1].length;i++){
              if(entry[1][i].result===true){
                totPoints+=entry[1][i].points;
                sol++;
                indiPoints.push(entry[1][i].points);
              }
              else{
                indiPoints.push(0);
              }
            }
            let obj={
              rank:rn,
              name:entry[0],
              solved:sol,
              totalPoints:totPoints,
              indiPoints:indiPoints
            }
            objArray.push(obj);
            rn++;
          }
          objArray.sort((c1, c2) => (c1.totPoints < c2.totPoints) ? 1 : (c1.totPoints > c2.totPoints) ? -1 : 0);
          setStandings(objArray)
        });
      }
    }
    
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
            {nums.map((item) => {
              return <th>{item}</th>
            })}
          </tr>
        </thead>
        <tbody className="table-body">
            {standings.map((item)=>{
              return (
                <tr>
                  <td>{item.rank}</td>
                  <td>{item.name}</td>
                  <td>{item.solved}</td>
                  <td>{item.totalPoints}</td>
                  {item.indiPoints.map((item2)=>{
                    return(<td>{item2}</td>)
                  })}
                </tr>
              )
            })}
        </tbody>
     
      </table>
    </div>
    // </div>
  );
};

export default Hero;
