import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import heroVideo from "../resources/hero-video.mp4";
import girlDream from "../resources/girl-dream.gif";
import loaderImage from "../resources/logo_animation.mp4";
import { useHistory } from "react-router-dom";
import "../css/hero.css";
import M from "materialize-css";
const Dashboard = () => {
  const history = useHistory();
  const { handle } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState("");
  const [loader, setLoader] = useState("Create a Blast!");
  const [numberOfQuestions, setNum] = useState(4);
  const [err, setError] = useState("Some Error Occured!");
  const [min, setMin] = useState(1000);
  const [time, setTime] = useState(90);
  const [max, setMax] = useState(1900);
  function getRoomId() {
    setLoader("Loading...");
    fetch("/api/getRoom")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status == 200) {
          let id = data.id;
          const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              num: numberOfQuestions,
              min: min,
              max: max,
              handles: [],
              isStarted: false,
              questions: [],
              id: data.id,
              start_time: new Date().getTime(),
              duration:time
            }),
          };
          fetch("/api/createRoom", options)
            .then((res) => {
              return res.json();
            })
            .then((data2) => {
              if (data2.status == 200) {
                setLoader("Create a Blast!");
                history.push("/readyroom/" + id);
              } else {
                setError("Error adding to database!");
              }
            });
        } else {
          setError("Error retreiving Room ID!");
        }
      });
  }
  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  return (
    <div>
      {isLoading ? (
        ""
      ) : (
        <div>
          <div>
            <div className="fullscreen">
              <video autoPlay muted loop id="myVideo">
                <source src={heroVideo} type="video/mp4" />
              </video>

              <div className="content">
                <h1 className="heading">CODEBLAST</h1>
                <div className="formForDash">
                  <form
                    action="/dashboard"
                    id="joinOrCreateRoom"
                    onSubmit={(e) => {
                      e.preventDefault();
                      getRoomId();
                    }}
                  >
                    <div style={{width: "100%"}}>
                      <div className="num">
                        <label for="numberOfQuestions">
                          Number of Bugaboos:{" "}
                        </label>
                        <p class="range-field" style={{width: "120px"}}>
                          <input
                            type="number"
                            name="numberOfQuestions"
                            defaultValue="5"
                            min="3"
                            max="10"
                            step={1}
                            area-labelledby="input-slider"
                            onChange={(e) => {
                              setNum(e.target.value);
                            }}
                          />
                        </p>
                      </div>
                      <div className="minMaxRange">
                        <label for="min">Difficulty: </label>
                        <input
                          type="number"
                          name="min"
                          style={{width: "80px", marginRight: "20px"}}
                          min={800}
                          max={3500}
                          defaultValue={1000}
                          step={100}
                          onChange={(e) => {
                            let val = Math.max(e.target.value, 800);
                            val = Math.min(e.target.value, 3500);
                            setMin(val);
                          }}
                        />{" "}
                        to
                        <input
                          type="number"
                          name="max"
                          style={{width: "100px", marginLeft: "40px"}}
                          min={800}
                          max={3500}
                          defaultValue={2000}
                          step={100}
                          onChange={(e) => {
                            let val = Math.max(e.target.value, 800);
                            val = Math.min(e.target.value, 3500);
                            setMax(val);
                          }}
                        />
                      </div>
                      <div className="minMaxRange">
                        <label for="time">Duration(In Minutes): </label>
                        <input
                          type="number"
                          name="time"
                          style={{width: "60px"}}
                          min={10}
                          defaultValue={90}
                          step={5}
                          onChange={(e) => {
                            setTime(e.target.value);
                          }}
                        />{" "}
                      </div>
                   
                    </div>
                    
                    <div className="buttonsBlast">
                      <button
                        type="submit"
                        onClick={(e) => {
                          // e.preventDefault();
                        }}
                      >
                        {loader}
                        <i class="material-icons">arrow_forward</i>
                      </button>
                    </div>
                  </form>
                  <form
                    action="/"
                    className="formToJoinViaInp"
                    onSubmit={(e) => {
                      e.preventDefault();
                      history.push("/readyroom/" + room);
                    }}
                  >
                    <div class="input-field roomID">
                      <input
                        id="last_name"
                        type="text"
                        class="validate"
                        onChange={(e) => {
                          setRoom(e.target.value);
                        }}
                      />
                      <label for="last_name">Room ID</label>
                    </div>
                  </form>
                  {/* //Join room buttons */}
                </div>
              
              </div>
            </div>
          </div>
          <div className="instructions">
            <div className="content">
              <h1>Instructions</h1>
              <p>Here are the instructions to start a blast:</p>
              <ol>
                <li>Create a blast after logging in.</li>
                <li>Grab a coffee from your kitchen.</li>
                <li>
                  Share the room id with your friends(See top right corner after
                  joining).
                </li>
                <li>
                  Let your friends join the room. Meanwhile, check out Fast and
                  furious 9 songs and trailer🔥😁.
                </li>
                <li>
                  When all your friends have joined, just click on the Ready
                  button and ask all others to do the same.
                </li>
                <li>
                  Bugaboos would be visible to all of you, so All the best👍🤞
                </li>
              </ol>
            </div>
            <div className="image">
              <div className="request-loader">
                <img src={girlDream} alt="" />
              </div>
            </div>
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

export default Dashboard;
