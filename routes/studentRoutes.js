const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router();


router.post('/add-student', studentController.addStudent);
router.get('/delete-student/:id', studentController.removeStudent);
router.post('/edit-student/:id', studentController.editStudent);

module.exports = router;
