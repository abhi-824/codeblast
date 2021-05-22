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

const ENDPOINT = "http://localhost:3000";
const socket = socketIOClient(ENDPOINT);
const Hero = (props) => {
  const history = useHistory();
  const { contest_id, handle } = useParams();
  const [handles, sethandles] = useState([]);
  useEffect(() => {
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
  }, []);
  socket.on("roomUsers", ({room, users}) => {
    console.log(room, users);
    let arr = [];
    for (let i = 0; i < users.length; i++) {
      arr.push(users[i].username);
    }
    sethandles(arr);
  });
  return (
    <div className="people-sidebar">
      <div className="ready-button">
        <Link to="/contest/abd/abd/problems">
          <button className="waves-effect waves-light btn ready-start">
            Ready!
          </button>
        </Link>
      </div>
      <div className="people-list">
        <h3 className="list-heading">Contestants</h3>
        <div className="contestant-list">
          {handles.map((el) => {
            return <h4>{el}</h4>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Hero;
