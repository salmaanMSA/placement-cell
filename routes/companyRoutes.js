const express = require('express');
const companyController = require('../controllers/companyController');

const router = express.Router();


router.get('/list', companyController.companyLists); // fetch company details
router.post('/add-company', companyController.addCompany); // create new company
router.post('/edit-company/:id', companyController.editCompany); // edit the company details
router.get('/delete-company/:id', companyController.removeCompany); // delete the company details


module.exports = router;