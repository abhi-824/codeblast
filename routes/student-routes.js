const express = require('express');
const {addStudent, 
       getAllStudents, 
       getStudent,
       updateStudent,
       createRoom,
       getRoom,
       deleteStudent
      } = require('../controllers/studentController');

const router = express.Router();
router.get('/getRoom',getRoom);
router.post('/createRoom',createRoom);
router.post('/room', addStudent);
router.get('/students', getAllStudents);
router.get('/student/:id', getStudent);
router.put('/student/:id', updateStudent);
router.delete('/student/:id', deleteStudent);


module.exports = {
    routes: router
}