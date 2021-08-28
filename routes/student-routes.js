const express = require("express");
const {
  createRoom,
  getRoom,
  checkRoom,
  getProblems,
  getRoomProps,
  updateHandles,
  getScheduledRooms
} = require("../controllers/studentController");

const router = express.Router();
router.get("/getRoom", getRoom);
router.get("/getProblems/:contest_id", getProblems);
router.get("/getRoomProps/:contest_id", getRoomProps);
router.get("/checkRoom/:id", checkRoom);
router.post("/createRoom", createRoom);
router.post("/updateHandles", updateHandles);
router.get("/getScheduledRoom/:handle",getScheduledRooms)
module.exports = {
  routes: router,
};
