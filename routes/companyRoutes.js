const express = require('express');
const companyController = require('../controllers/companyController');

const router = express.Router();


router.get('/list', companyController.companyLists);
router.post('/add-company', companyController.addCompany);
router.post('/edit-company/:id', companyController.editCompany);
router.get('/delete-company/:id', companyController.removeCompany);


module.exports = router;