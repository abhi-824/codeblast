import React from "react";
import "../css/Questions.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const Questions = () => {
  const history = useHistory();
  const {contest_id}=useParams();
  
  const handle = localStorage.getItem("handle");
  const [problems, setProbs] = useState(["Nothing Yet"]);
  useEffect(() => {
    if(handle==null)history.push('/');
    else
    {
      const handles=JSON.parse(localStorage.getItem('handles'));
      async function fetchProblems(){
        await fetch("/api/getProblems/"+contest_id).then((res) => {
          return res.json();
        }).then((data)=>{
          let arr=[];
          for(let i=0;i<data.length;i++){
            arr.push([0,data[i]]);
          }
          console.log(arr);
          setProbs(arr);
        })
      }
      if(handles==null){
        fetchProblems();
      }
      else{
        let fl=0;
        for(let i=0;i<handles.length;i++) {
          if(handles[i].room==contest_id){
            fl=1;
            
            if(handles[i].questions==undefined){
              fetchProblems();
            }
            else
              setProbs(handles[i].questions)
          }
        }
        if(!fl){
          fetchProblems();
        }
      }

    }
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
                  <h3>{item[1]}</h3>
                  <a href={getLink(item[1])} target="_blank" className="button-do-it">Do It</a>
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
