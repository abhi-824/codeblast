const express = require("express");
const {
  addStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  createRoom,
  getRoom,
  checkRoom,
  deleteStudent, 
  getProblems,
  getRoomProps
} = require("../controllers/studentController");

const router = express.Router();
router.get("/getRoom", getRoom);
router.get("/getProblems/:contest_id", getProblems);
router.get("/getRoomProps/:contest_id", getRoomProps);
router.get("/checkRoom/:id", checkRoom);
router.post("/createRoom", createRoom);
router.post("/room", addStudent);
router.get("/students", getAllStudents);
router.get("/student/:id", getStudent);
router.put("/student/:id", updateStudent);
router.delete("/student/:id", deleteStudent);

module.exports = {
  routes: router,
};
