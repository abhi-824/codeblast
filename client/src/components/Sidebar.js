import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
// import logo_light from "../resources/logo_light.png"
// import heroVideo from "../resources/hero-video.mp4"
// import girlDream from "../resources/girl-dream.gif"
import "../css/Chatbox.css";
import "../css/hero.css";
import M from "materialize-css";
import { Link } from "react-router-dom";

import socketIOClient from "socket.io-client";
const link = "http://" + window.location.href.split("/")[2];
console.log(link);
const ENDPOINT = link;
const socket = socketIOClient(ENDPOINT);
const Hero = (props) => {
  const history = useHistory();
  const { contest_id } = useParams();
  const handle = localStorage.getItem("handle");
  const [handles, sethandles] = useState([]);
  const [loader, setLoder] = useState("");
  const [msg, setmsg] = useState([]);
  const [isDisabled, setDisable] = useState(false);
  function makeReady(e) {
    socket.emit("ready", { username: handle, room: contest_id });
    setDisable(true);
  }
  useEffect(() => {
    if(handle==null)
      history.push('/');
    else{
      function checkRoomIdAndJoin() {
        if (contest_id == "") {
          alert("Please enter a valid Room ID!");
        } else {
          fetch("/api/checkRoom/" + contest_id)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              if (data.status == 400) {
                alert(
                  "Room ID Invalid or some Internal Error!\nIf you are seeing this again and again, please create a new room"
                );
                history.push("/dashboard/" + handle);
              } else {
                console.log(handle);
                socket.emit("joinRoom", { username: handle, room: contest_id });
                sethandles(data.handles);
              }
            });
        }
      }
      checkRoomIdAndJoin();
      socket.on("roomUsers", ({ room, users }) => {
        let arr = [];
        let handles = JSON.parse(localStorage.getItem("handles"));
        if (handles == null) handles = [];
        console.log(handles);
        for (let i = 0; i < users.length; i++) {
          arr.push(users[i].username);
        }
        let fl = 0;
        for (let i = 0; i < handles.length; i++) {
          if (handles[i].room == room) {
            fl = 1;
            handles[i] = { room: room, users: arr };
            break;
          }
        }
        if (!fl) {
          handles.push({ room: room, users: arr });
        }
        localStorage.setItem("handles", JSON.stringify(handles));
        sethandles(arr);
      });
      socket.on("start_contest", ({ problems, room }) => {
        console.log("dcsjcwod");
        let handles = JSON.parse(localStorage.getItem("handles"));
        let time = new Date().getTime();
        if (handles == undefined) handles = [];
        let fl = 0;
        for (let i = 0; i < handles.length; i++) {
          if (handles[i].room == room) {
            fl = 1;
            handles[i] = {
              room: room,
              questions: problems,
              users: handles[i].users,
              start_time: time,
            };
            break;
          }
        }
        if (!fl) {
          handles.push({ room: room, questions: problems, start_time: time });
        }
        localStorage.setItem("handles", JSON.stringify(handles));
  
        history.push({
          pathname: "/contest/" + contest_id + "/problems",
          state: { detail: problems },
        });
      });
      socket.on("start_loader", (data) => {
        setLoder("Fetching Problems... Quick, Get a coffee!!");
        // setIsLoading(true);
      });
      socket.on("msg_ready",data=>{
        console.log(data)
        // let arr=msg;
        // arr.push(data);
        let div=document.createElement("div");
        div.innerHTML=data;document.querySelector(".msgs").appendChild(div)
        console.log(msg)
        // setmsg(arr)
      })
    }
  }, []);
  return (
    <div className="people-sidebar">
      <div className="ready-button">
        {/* <Link to="/contest/abd/abd/problems"> */}
        <button
          disabled={isDisabled}
          className="waves-effect waves-light btn ready-start"
          onClick={(e) => {
            e.preventDefault();
            makeReady(e);
          }}
        >
          Register
        </button>
        {/* </Link> */}
      </div>
      <div className="contest-info">
  <h4 className="info-heading">Contest Info</h4>
  <div className="info-list">
    <h5>Problems: 5</h5>
    <h5>Min Difficulty: 1200</h5>
    <h5>Max Difficulty: 2000</h5>
    <h5>Time: 2hrs</h5>
  </div>
</div>

      <div className="people-list">
        <h3 className="list-heading">Contestants</h3>
        <div className="contestant-list">
          {handles.map((el) => {
            return <h4>{el}</h4>;
          })}
        </div>
      </div>
      <div className="msgs"></div>
      <div>{loader}</div>
    </div>
  );
};

export default Hero;
