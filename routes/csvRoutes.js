const express = require('express');
const csvController = require('../controllers/csvReportController');

const router = express.Router();


router.get('/view-csv', csvController.viewCsvPage);
router.post('/report-generate', csvController.reportGenerate);
router.get('/jobs', csvController.viewJobs);


module.exports = router;