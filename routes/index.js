const express = require('express');

const router = express.Router();
const dashboardController = require('../controllers/dashboardController');


router.get('/', dashboardController.dashboard);
router.use('/users', require('./userRoutes'));
router.use('/student', require('./studentRoutes'));
router.use('/company', require('./companyRoutes'));
router.use('/interview', require('./interviewRoutes'));
router.use('/csv', require('./csvRoutes'));

module.exports = router;