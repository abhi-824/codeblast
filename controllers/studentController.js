"use strict";
const { nanoid } = require("nanoid");
const firebase = require("../db");
const Student = require("../models/student");
const firestore = firebase.firestore();

const getRoom = async (req, res, next) => {
  try {
    const id = nanoid(4);
    res.json({ id: id, status: 200 });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
const checkRoom = async (req, res, next) => {
  try {
    const id = req.params.id;
    await firestore
      .collection("rooms")
      .where("id", "==", id)
      .get()
      .then((data) => {
        if (data.docs.length > 0) {
          res.json(data.docs[0].data());
        } else {
          res.json({ status: 400 });
        }
      });
  } catch (err) {
    res.json({ status: 400 });
  }
};
const getProblems = async (req, res, next) => {
  try {
    const id = req.params.contest_id;
    
    await firestore
      .collection("rooms")
      .where("id", "==", id)
      .get()
      .then((data) => {
        if (data.docs.length > 0) {
          
          res.json(data.docs[0].data().questions);
        } else {
          res.json({ status: 400 });
        }
      });
  } catch (err) {
    res.json({ status: 400 });
  }
};

const getRoomProps = async (req, res, next) => {
  try {
    const id = req.params.contest_id;
    
    await firestore
      .collection("rooms")
      .where("id", "==", id)
      .get()
      .then((data) => {
        if (data.docs.length > 0) {
          
          res.json(data.docs[0].data());
        } else {
          res.json({ status: 400 });
        }
      });
  } catch (err) {
    res.json({ status: 400 });
  }
};

const createRoom = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection("rooms").doc().set(data);
    res.json({ message: "Stored Successfully!", status: 200 });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const updateHandles = async (req, res, next) => {
  try {
    const data = req.body;
    let iad,daata;
    await firestore
    .collection("rooms")
    .where("id", "==", data.room)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        iad = doc.id;
        daata = doc.data();
      });
    });

  let handles = daata.handles;
  
  for(let i=0; i<data.handles.length; i++)
  {
    if (!handles.includes(data.handles[i])){
      handles.push(data.handles[i]);
    } 
  }
  if(handles.length>10)
  {
    res.json({ message: "Limit of 10 handles Reached!", status: 400 });
  }
  try {
    await firestore.collection("rooms").doc(iad).update({ handles: handles });
    res.json({ message: "Saved Successfully!", status: 200 });
  } catch (err) {
    
  }


  } catch (err) {
    res.status(400).send(err.message);
  }
};
module.exports = {
  createRoom,
  getRoom,
  checkRoom,
  getProblems,
  getRoomProps,
  updateHandles
};
