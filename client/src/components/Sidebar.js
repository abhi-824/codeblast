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
let prefixx = "http://";
if (window.location.href.split("/")[2][0] == "c") prefixx = "https://";
const link = prefixx + window.location.href.split("/")[2];

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
  const [num, setNum] = useState(0);
  const [min, setMin] = useState(0);
  const [time, setTime] = useState(0);
  const [max, setMax] = useState(0);
  function makeReady(e) {
    socket.emit("ready", { username: handle, room: contest_id });
    setDisable(true);
  }
  useEffect(() => {
    if (handle == null) history.push("/");
    else {
      async function getData() {
        await fetch("/api/getRoomProps/" + contest_id)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            
            if (data.isStarted == true) {
              history.push({
                pathname: "/contest/" + contest_id + "/problems",
              });
            }
            setMax(data.max);
            setMin(data.min);
            setTime(data.duration);
            setNum(data.num);
          });
      }
      getData();
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
        setLoder(data);
        // setIsLoading(true);
      });
      socket.on("msg_ready", (data) => {
        
        // let arr=msg;
        // arr.push(data);
        let div = document.createElement("div");
        div.innerHTML = data;
        document.querySelector(".msgs").appendChild(div);
        
        // setmsg(arr)
      });
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
          Ready
        </button>
        {/* </Link> */}
      </div>
      <div className="contest-info">
        <h4 className="info-heading">Contest Info</h4>
        <div className="info-list">
          <h5>Bugaboos: {num}</h5>
          <h5>Min Difficulty: {min}</h5>
          <h5>Max Difficulty: {max}</h5>
          <h5>Time: {time} minutes</h5>
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
