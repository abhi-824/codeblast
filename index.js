"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const studentRoutes = require("./routes/student-routes");
const http = require("http");
const host = "0.0.0.0";
const fetch = require("node-fetch");
const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  make_ready,
  allready,
  room_props,
  addProblems,
} = require("./utils/users");
const app = express();
const server = http.createServer(app);
const socketio = require("socket.io");

const io = require("socket.io")(server, {
  cors: {
    origin: "https://codeblast.herokuapp.com",
    methods: ["GET", "POST"],
  },
});
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(bodyParser.json());
app.use("/api", studentRoutes.routes);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    userLeave(socket.id).then((user) => {
      if (user != undefined) {
        io.to(user.room).emit(
          "message",
          formatMessage("BOSS", `${user.username} has left the chat`)
        );
        console.log(user.room);
        getRoomUsers(user.room).then((res) => {
          io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: res,
          });
        });
      }
    });
  });

  socket.on("ready", ({ username, room }) => {
    make_ready(socket.id, username, room, 1).then((user) => {
      io.to(user.room).emit("msg_ready", `${user.username} is ready now`);
      console.log("make ready done");
      // getRoomUsers(room).then((users)=>{
      allready(room).then((ans) => {
        console.log("all ready done");
        if (ans) {
          io.to(user.room).emit("start_loader", "Getting Users...Done");
          room_props(room).then((data) => {
            console.log("room props done");
            const problems = [];
            let names = [];
            let users = data.handles;
            let num = data.num;
            let max = data.max;
            let min = data.min;
            let diff = new Array(num);
            for (let i = 0; i < num; i++) {
              diff[i] = min + ((max - min) / (num - 1)) * i;
            }
            diff.push(20000);
            io.to(user.room).emit(
              "start_loader",
              "Getting Room Properties...Done"
            );
            async function getFinal() {
              let contests_given = new Set();
              let solved = new Set();
              let user_contests =
                "https://codeforces.com/api/user.rating?handle=";
              //for solved set
              console.log(users);
              for (let i = 0; i < users.length; i++) {
                let handle_name1 = users[i];
                // async function getSetGo() {
                let modified_url = `https://codeforces.com/api/user.status?handle=${handle_name1}`;

                try {
                  console.log("hey")
                  const jsondata = await fetch(modified_url);
                  const jsdata = await jsondata.json();
                  console.log(jsdata.status);
                  if (jsdata.status != "OK") {
                    continue;
                  }
                  for (let i = 0; i < jsdata.result.length; i++) {
                    if (jsdata.result[i].verdict == "OK") {
                      let str =
                        jsdata.result[i].problem.contestId +
                        "-" +
                        jsdata.result[i].problem.index;
                        names.push(jsdata.result[i].problem.name);
                      solved.add(str);
                    }
                  }
                  let modified_url2 = user_contests + handle_name1;
                  const jsondata1 = await fetch(modified_url2);
                  const jsdata2 = await jsondata1.json();
                  for (let i = 0; i < jsdata2.result.length; i++) {
                    contests_given.add(jsdata2.result[i].contestId);
                  }
                } catch {
                  (err) => {
                    io.to(user.room).emit(
                      "start_loader",
                      "Error getting user submissions for" + handle_name1
                    );
                  };
                }
              }
              io.to(user.room).emit(
                "start_loader",
                "Getting User Solved Submissions...Done"
              );

              console.log("all users fetched");
              try {
                let modified_url2 = `https://codeforces.com/api/problemset.problems`;
                const jsondata4 = await fetch(modified_url2);
                console.log(jsdata4)
                let jsdata4 = await jsondata4.json();
                console.log("problems done");
                let jsdataP = jsdata4;
                let upsolved = [];
                let upsolved2 = [];
                function shuffle(array) {
                  var currentIndex = array.length,
                    temporaryValue,
                    randomIndex;

                  // While there remain elements to shuffle...
                  while (0 !== currentIndex) {
                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;

                    // And swap it with the current element.
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                  }

                  return array;
                }
                io.to(user.room).emit(
                  "start_loader",
                  "Retreiving Upsolving Questions...Done"
                );
                //Upsolving Retreival
                for (let i = 0; i < jsdataP.result.problems.length; i++) {
                  if (
                    contests_given.has(jsdataP.result.problems[i].contestId) &&
                    solved.has(
                      `${jsdataP.result.problems[i].contestId}-${jsdataP.result.problems[i].index}`
                    ) == false
                  ) {
                    let rating =
                      jsdataP.result.problems[i].rating != undefined
                        ? jsdataP.result.problems[i].rating
                        : 9999999999;
                    upsolved.push([
                      rating,
                      `${jsdataP.result.problems[i].contestId}-${jsdataP.result.problems[i].index}`,
                      jsdataP.result.problems[i].name,
                    ]);
                    upsolved2.push([
                      rating,
                      `${jsdataP.result.problems[i].contestId}-${jsdataP.result.problems[i].index}`,
                      jsdataP.result.problems[i].name,
                    ]);
                  }
                }
                upsolved.sort();
                upsolved2.sort();
                let j = 0;
                // shuffle(jsdata4.result.problems);
                for (let I = 0; I < num; I++) {
                  let fl = false;
                  for (let i = 0; i < upsolved.length; i++) {
                    if (
                      upsolved[i][0] >= diff[I] &&
                      upsolved[i][0] <= diff[I + 1] &&
                      problems.includes(upsolved[i]) == false &&
                      names.includes(upsolved2[i][2]) == false &&
                      solved.has(upsolved[i][1]) === false
                    ) {
                      problems.push(upsolved[i]);
                      names.push(upsolved2[i][2]);
                      fl = 1;
                      break;
                    }
                  }
                  if (fl) {
                    continue;
                  }
                  for (let i = 0; i < jsdata4.result.problems.length; i++) {
                    let str =
                      jsdata4.result.problems[i].contestId +
                      "-" +
                      jsdata4.result.problems[i].index;
                    if (
                      jsdata4.result.problems[i].rating >= diff[I] &&
                      jsdata4.result.problems[i].rating <= diff[I + 1] &&
                      solved.has(str) === false &&
                      jsdata4.result.problemStatistics[i].solvedCount >= 900 &&
                      jsdata4.result.problems[i].tags.includes("*special") ===
                        false &&
                      problems.includes([
                        jsdata4.result.problems[i].rating,
                        str,
                      ]) == false &&
                      names.includes(jsdata4.result.problems[i].name) == false
                    ) {
                      problems.push([jsdata4.result.problems[i].rating, str]);
                      names.push(jsdata4.result.problems[i].name);
                      break;
                    }
                  }
                }
                console.log(names);
                addProblems(user.room, problems).then((data) => {
                  io.to(user.room).emit(
                    "start_loader",
                    "Adding Problems to database...Done"
                  );
                  console.log("problems to firebase done");
                  io.to(user.room).emit("start_contest", {
                    problems: problems,
                    room: user.room,
                  });
                });
              } catch {
                (err) => {
                  io.to(user.room).emit(
                    "start_loader",
                    "Error getting problems from codeforces"
                  );
                  console.log(err);
                };
              }
            }
            getFinal();
          });
        }
      });
      // });
    });
  });

  socket.on("joinRoom", ({ username, room }) => {
    console.log(username, room);
    userJoin(socket.id, username, room).then((user) => {
      socket.join(room);
      socket.emit(
        "message",
        formatMessage(
          "Codeblast Admin",
          "Welcome to CodeBlast, ready to blast your code?"
        )
      );

      socket.broadcast
        .to(user.room)
        .emit(
          "message",
          formatMessage(
            "Codeblast Admin",
            `${user.username} has joined the room`
          )
        );
      getRoomUsers(user.room).then((res) => {
        io.to(user.room).emit("roomUsers", {
          room: user.room,
          users: res,
        });
      });
    });
  });
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });
});

server.listen(config.port, host, () =>
  console.log("App is listening on url http://localhost:" + config.port)
);
