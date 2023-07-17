const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router();


router.post('/add-student', studentController.addStudent); // create new student
router.get('/delete-student/:id', studentController.removeStudent); // delete the  student
router.post('/edit-student/:id', studentController.editStudent); // update student details

module.exports = router;
