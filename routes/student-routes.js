const express = require("express");
const {
  createRoom,
  getRoom,
  checkRoom,
  getProblems,
  getRoomProps,
  updateHandles
} = require("../controllers/studentController");

const router = express.Router();
router.get("/getRoom", getRoom);
router.get("/getProblems/:contest_id", getProblems);
router.get("/getRoomProps/:contest_id", getRoomProps);
router.get("/checkRoom/:id", checkRoom);
router.post("/createRoom", createRoom);
router.post("/updateHandles", updateHandles);
module.exports = {
  routes: router,
};
