const firebase = require("../db");
const firestore = firebase.firestore();

async function userJoin(id, username, room) {
  const user = { id: id, username: username, room: room, isready: false };
  await firestore.collection("users").doc().set(user);
  return user;
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
        console.log(daata)
      });
    });
  console.log(iad);
  await firestore
    .collection("users")
    .doc(iad)
    .update({ isready: true })
    return daata;
}
async function room_props(room) {
  await firestore
    .collection("rooms")
    .where("id", "==", room)
    .get()
    .then((data) => {
      let act = data.docs[0].data();
      return act;
    });
}
async function allready(room) {
  await firestore
    .collection("users")
    .where("room", "==", room)
    .get()
    .then((data) => {
      for (let i = 0; i < data.docs.length; i++) {
        if (data.docs[i].isready == false) {
          return false;
        }
      }
      return true;
    });
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
  await firestore
    .collection("users")
    .where("id", "==", id)
    .get()
    .then((data) => {
      if (data.docs.length > 0) deleteUser(id);

      return data.docs[0];
    });
}
async function deleteUser(id) {
  await firestore.collection("users").where("id", "==", id).get().delete();
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
      console.log(res);
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
};
