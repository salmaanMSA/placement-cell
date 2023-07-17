const express = require('express');
const interviewController = require('../controllers/interviewController');

const router = express.Router();


router.get('/fetch/:id', interviewController.fetchInterviewDetails); // fetch all interviews for a company
router.get('/fetch-students', interviewController.fetchAllStudents); // fetch all students
router.post('/create-interview', interviewController.createInterview); // Allocate student for an interview 
router.get('/delete-interview/:id', interviewController.deleteInterview); // remove allocated student
router.post('/update-result/:id', interviewController.updateInterviewResults); // update student interview result

module.exports = router;