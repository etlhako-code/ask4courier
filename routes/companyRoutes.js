'use strict';

const express = require('express');
const companyControll = require('../controllers/companyController');
const router = express.Router();

router.get('/companies', companyControll.GetAllCompanies);
router.get('/company/:id', companyControll.GetCompany);
router.post('/company', companyControll.AddCompany);
router.put('/company/:id', companyControll.UpdateCompany);
router.delete('/company/:id', companyControll.DeleteCompany);//needs protection
router.post('/admin/validate', companyControll.ValidateCompany);//needs protection
router.get('/active', companyControll.GetActiveCompanies);
router.get('/Inactive', companyControll.GetInActiveCompanies);

module.exports = {
    routes: router
}