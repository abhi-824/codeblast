import React from "react";
import "../css/contest.css";
import "../css/hero.css";
import "../css/schedule.css";
import M from "materialize-css";
import loaderImage from "../resources/logo_animation.mp4";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import ReactGa from "react-ga";
import { useHistory } from "react-router-dom";
const Hero = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const { handle } = useParams();
  async function getScheduledEvents() {
    let ans;
    await fetch("/api/getScheduledRoom/" + handle)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data)
        ans = data;
        return data;
      });
    return ans;
  }
  async function filterData(data) {
    let ans = [];
    for (let i = 0; i < data.length; i++) {
      await fetch("/api/getRoomProps/" + data[i].room)
        .then((res) => {
          return res.json();
        })
        .then((data2) => {
          // console.log(data2);
          // ans = data;
          data2.start_time=data[i].time;
          const date = new Date(data[i].time*1000); 
          const day=date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
          console.log(day)
          const time=date.getHours()+":"+date.getMinutes();
          console.log(time)
          data2.start_time=time
          data2.date=day;
          ans.push(data2);
        });
    }
    return ans;
  }
  useEffect(() => {
    getScheduledEvents().then((data) => {
      // console.log(data)
      filterData(data.rooms).then((roomData) => {
        setData(roomData);
        setIsLoading(false);
        console.log(roomData);
      });
    });
  }, []);
  return (
    <div>
      {isLoading ? (
        ""
      ) : (
        <div className="schedule-cont">
          <div className="schedule-head">Your Scheduled Contests</div>
          <div className="schedule-list">
            {data.map((item) => {
              return (
                <div className="schedule-card z-depth-4">
                  <div className="schedule-card-left">
                    <div className="schedule-roomid">Room Id: {item.id}</div>
                    <div className="schedule-members">
                      Members:{" "}
                      {item.handles.map((item2) => {
                        return item2+", ";
                      })}
                    </div>
                  </div>
                  <div className="schedule-card-right">
                    <div className="schedule-time">Start Time: {item.start_time}</div>
                    <div className="schedule-time">Start Date: {item.date}</div>
                    <div className="schedule-problem">Problems: {item.num}</div>
                    <div className="schedule-Range">
                      Range: {item.min}-{item.max}
                    </div>
                    <div className="schedule-duration">
                      Duration: {item.duration} hours
                    </div>
                  </div>
                </div>
              );
            })}

         
          </div>
        </div>
      )}
      {isLoading ? (
        <div className="logo_container">
          <video
            className="logo_animation"
            src={loaderImage}
            autoPlay
            loop
          ></video>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Hero;
