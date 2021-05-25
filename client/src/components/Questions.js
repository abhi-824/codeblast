import React from "react";
import "../css/Questions.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const Questions = () => {
  const {contest_id}=useParams();
  const [problems, setProbs] = useState(["Nothing Yet"]);
  useEffect(() => {
    fetch("/api/getProblems/"+contest_id).then((res) => {
      return res.json();
    }).then((data)=>{
      console.log(data);
      setProbs(data);
    })
  }, []);
  function getLink(str){
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
      <div class="questions">
        <div className="cards">
          {problems.map((item) => {
            return <div>
              <div className="card card1">
                <div className="container">
                  {/* <img src={wrA} alt /> */}
                </div>
                <div className="details">
                  <h3>{item}</h3>
                  <a href={getLink(item)} target="_blank" className="button-do-it">Do It</a>
                </div>
            </div>
            </div>;
          })}
        
        </div>
      </div>
    </div>
  );
};

export default Questions;
