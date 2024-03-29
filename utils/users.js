const firebase = require("../db");
const firestore = firebase.firestore();

async function userJoin(id, username, room) {
  const user = { id: id, username: username, room: room, isready: false };
  let iad, daata;
  await firestore
    .collection("rooms")
    .where("id", "==", room)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        iad = doc.id;
        daata = doc.data();
      });
    });

  let handles = daata.handles;
  if (!handles.includes(username)) {
    handles.push(username);
    await firestore.collection("users").doc().set(user);
  }
  try {
    await firestore.collection("rooms").doc(iad).update({ handles: handles });
  } catch (err) {}
  return user;
}

async function addProblems(id, problems) {
  let iad, daata;
  let isScheduled;
  await firestore
    .collection("rooms")
    .where("id", "==", id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        iad = doc.id;
        isScheduled = doc.data().isScheduled;
        daata = doc.data();
      });
    });
  let probs = [];
  for (let i = 0; i < problems.length; i++) {
    probs.push(problems[i][0] + "/" + problems[i][1]);
  }

  daata.questions = probs;
  if(isScheduled)
  {
    await firestore
      .collection("rooms")
      .doc(iad)
      .update({
        questions: probs,
      });
  }
  else{
    await firestore
      .collection("rooms")
      .doc(iad)
      .update({
        questions: probs,
        start_time: new Date().getTime(),
        isStarted: true,
      });
  }
  return daata;
}
async function changeToScheduled(id, time, handles) {
  let iad;
  let daata = "un";
  for (let i = 0; i < handles.length; i++) {
    await firestore
      .collection("profiles")
      .where("handle", "==", handles[i])
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          iad = doc.id;
          daata = doc.data();
        });
      });
    // console.log(daata);
    if (daata != "un") {
      let rooms = daata.rooms;
      rooms.push({ room: id, time: time });
      await firestore.collection("profiles").doc(iad).update({ rooms: rooms });
    } else {
      daata = { handle: handles[i], rooms: [{ room: id, time: time }] };
      await firestore.collection("profiles").doc().set(daata);
    }
    daata="un";
  }
  await firestore
    .collection("rooms")
    .where("id", "==", id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        iad = doc.id;
      });
    });
  await firestore
    .collection("rooms")
    .doc(iad)
    .update({ isScheduled: true, start_time: time });
  return;
}
async function make_ready(id, username, room, state) {
  let iad, daata;
  await firestore
    .collection("users")
    .where("id", "==", id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        iad = doc.id;
        daata = doc.data();
      });
    });

  await firestore.collection("users").doc(iad).update({ isready: true });
  return daata;
}
async function room_props(room) {
  let act;
  await firestore
    .collection("rooms")
    .where("id", "==", room)
    .get()
    .then((data) => {
      act = data.docs[0].data();
    });
  return act;
}
async function allready(room) {
  let ans = true;
  await firestore
    .collection("users")
    .where("room", "==", room)
    .get()
    .then((data) => {
      for (let i = 0; i < data.docs.length; i++) {
        if (data.docs[i].data().isready == false) {
          ans = false;
          break;
        }
      }
    });
  return ans;
}
async function getCurrentUser(id) {
  await firestore
    .collection("users")
    .where("id", "==", id)
    .get()
    .then((data) => {
      return data.docs;
    });
}

async function userLeave(id) {
  let user;
  await firestore
    .collection("users")
    .where("id", "==", id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().isready == false) {
          deleteUser(doc.id);
        }
        user = doc.data();
      });
    });
  return user;
}
async function deleteUser(id) {
  await firestore.collection("users").doc(id).delete();
}

async function getRoomUsers(room) {
  return (promise = await firestore
    .collection("users")
    .where("room", "==", room)
    .get()
    .then((data) => {
      let res = [];
      for (let i = 0; i < data.docs.length; i++) {
        res.push(data.docs[i].data());
      }
      return res;
    }));
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  make_ready,
  allready,
  room_props,
  addProblems,
  changeToScheduled,
};
