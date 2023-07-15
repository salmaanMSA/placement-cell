const express = require('express');

const router = express.Router();
const dashboardController = require('../controllers/dashboardController');


router.get('/', dashboardController.dashboard);
router.use('/users', require('./userRoutes'));
router.use('/student', require('./studentRoutes'));

module.exports = router;