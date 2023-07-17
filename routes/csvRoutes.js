const express = require('express');
const csvController = require('../controllers/csvReportController');

const router = express.Router();


router.get('/view-csv', csvController.viewCsvPage); // render the csv report generate page
router.post('/report-generate', csvController.reportGenerate); // report generate


module.exports = router;