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
    console.log(id);
    await firestore
      .collection("rooms")
      .where("id", "==", id)
      .get()
      .then((data) => {
        if (data.docs.length > 0) {
          console.log(data.docs[0].data())
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
    console.log(id);
    await firestore
      .collection("rooms")
      .where("id", "==", id)
      .get()
      .then((data) => {
        if (data.docs.length > 0) {
          console.log(data.docs[0].data())
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
    console.log(err);
  }


  } catch (err) {
    res.status(400).send(err.message);
  }
};
const addStudent = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection("rooms").doc().set(data);
    res.send("Record saved successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllStudents = async (req, res, next) => {
  try {
    const students = await firestore.collection("students");
    const data = await students.get();
    const studentsArray = [];
    if (data.empty) {
      res.status(404).send("No student record found");
    } else {
      data.forEach((doc) => {
        const student = new Student(
          doc.id,
          doc.data().firstName,
          doc.data().lastName,
          doc.data().fatherName,
          doc.data().class,
          doc.data().age,
          doc.data().phoneNumber,
          doc.data().subject,
          doc.data().year,
          doc.data().semester,
          doc.data().status
        );
        studentsArray.push(student);
      });
      res.send(studentsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const student = await firestore.collection("students").doc(id);
    const data = await student.get();
    if (!data.exists) {
      res.status(404).send("Student with the given ID not found");
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const student = await firestore.collection("students").doc(id);
    await student.update(data);
    res.send("Student record updated successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    await firestore.collection("students").doc(id).delete();
    res.send("Record deleted successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  createRoom,
  getRoom,
  checkRoom,
  deleteStudent,
  getProblems,
  getRoomProps,
  updateHandles
};
