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

const io = socketio(server);
app.use(express.json());
app.use(cors());
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
        io.to(user.room).emit("roomUsers", {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      }
    });
  });

  socket.on("ready", ({ username, room }) => {
    make_ready(socket.id, username, room, 1).then((user) => {
      io.to(user.room).emit(
        "message",
        formatMessage("BOSS", `${user.username} is ready now`)
      );
      console.log("make ready done");
      // getRoomUsers(room).then((users)=>{
      allready(room).then((ans) => {
        console.log("all ready done");
        if (ans) {
          room_props(room).then((data) => {
            console.log("room props done");
            const problems = [];
            let users = data.handles;
            let num = data.num;
            let max = data.max;
            let min = data.min;
            let diff = new Array(num);
            for (let i = 0; i < num; i++) {
              diff[i] = min + ((max - min) / (num - 1)) * i;
            }
            diff.push(20000);
            io.to(user.room).emit("start_loader", problems);
            async function getFinal() {
              let contests_given = new Set();
              let solved = new Set();
              let user_contests =
                "https://codeforces.com/api/user.rating?handle=";
              //for solved set
              for (let i = 0; i < users.length; i++) {
                let handle_name1 = users[i];
                // async function getSetGo() {
                let modified_url = `https://codeforces.com/api/user.status?handle=${handle_name1}`;
                const jsondata = await fetch(modified_url);
                const jsdata = await jsondata.json();
                for (let i = 0; i < jsdata.result.length; i++) {
                  if (jsdata.result[i].verdict == "OK") {
                    let str =
                      jsdata.result[i].problem.contestId +
                      "-" +
                      jsdata.result[i].problem.index;
                    solved.add(str);
                  }
                }
                let modified_url2 = user_contests + handle_name1;
                const jsondata1 = await fetch(modified_url2);
                const jsdata2 = await jsondata1.json();
                for (let i = 0; i < jsdata2.result.length; i++) {
                  contests_given.add(jsdata2.result[i].contestId);
                }
              }
              console.log("all users fetched");

              let modified_url2 = `https://codeforces.com/api/problemset.problems`;
              const jsondata4 = await fetch(modified_url2);
              let jsdata4 = await jsondata4.json();
              console.log("problems done");
              let jsdataP = jsdata4;
              let upsolved = [];
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
                  ]);
                }
              }
              upsolved.sort();
              let j = 0;
              shuffle(jsdata4.result.problems);
              for (let I = 0; I < num; I++) {
                let fl = false;
                for (let i = 0; i < upsolved.length; i++) {
                  if (
                    upsolved[i][0] >= diff[I] &&
                    upsolved[i][0] <= diff[I + 1]
                  ) {
                    problems.push(upsolved[i]);
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
                      false
                  ) {
                    problems.push([jsdata4.result.problems[i].rating, str]);
                    break;
                  }
                }
              }

              addProblems(user.room, problems).then((data) => {
                console.log("problems to firebase done");
                io.to(user.room).emit("start_contest", problems);
              });
            }
            getFinal();
          });
        }
      });
      // });
    });
  });

  socket.on("joinRoom", ({ username, room }) => {
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
