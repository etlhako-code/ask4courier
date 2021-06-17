'use strict';
const utils = require('../utils');
const config = require('../../config');
const mailto = require('../utils');
const sql = require('mssql');

const GetCompanies = async () => {
    try {
        let pool = await sql.connect(config.sql);//CONNECT DB
        const sqlQueries = await utils.loadSqlQueries('Companies');//LOAD PREQUERIES
        const companysList = await pool.request().query(sqlQueries.AllCompanies);//LOAD SPECIFIC companyS query
        
        return companysList.recordset;
    } catch (err) {
        console.log(err.message);
        console.log('db failed');
        //mailto.mailer("admin@cancore.co.za,etlhako@gmail.com","sql server connection",`connection failed ${err.message}`,null);
    }
}
const GetInActiveCompanies = async () => {
    try {
        let pool = await sql.connect(config.sql);//CONNECT DB
        const sqlQueries = await utils.loadSqlQueries('Companies');//LOAD PREQUERIES
        const companysList = await pool.request().query(sqlQueries.CompaniesInactive);//LOAD SPECIFIC companyS query
        console.log(companysList)
        return companysList.recordset;
    } catch (err) {
        console.log(err.message);
        console.log('db failed');
        //mailto.mailer("admin@cancore.co.za,etlhako@gmail.com","sql server connection",`connection failed ${err.message}`,null);
    }
}
const GetActiveCompanies = async () => {
    try {
        let pool = await sql.connect(config.sql);//CONNECT DB
        const sqlQueries = await utils.loadSqlQueries('Companies');//LOAD PREQUERIES
        const companysList = await pool.request().query(sqlQueries.CompaniesActive);//LOAD SPECIFIC companyS query
        
        return companysList.recordset;
    } catch (err) {
        console.log(err.message);
        console.log('db failed');
        //mailto.mailer("admin@cancore.co.za,etlhako@gmail.com","sql server connection",`connection failed ${err.message}`,null);
    }
}

const GetById = async(companyId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Companies');
        const company = await pool.request()
                            .input('ID', sql.Int, companyId)//INPUT STRING MUST BE SAME AS IN DB
                            .query(sqlQueries.companybyId);
        return company.recordset;
    } catch (error) {
        return error.message;
    }
}

const CreateCompany = async (Company) => {
    try {
        let date_ob = new Date();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Companies');
        const insertcompany = await pool.request()
                            .input('TradingName', sql.NVarChar(100), Company.TradingName)
                            .input('CompanyRegNumber', sql.NVarChar(100), Company.CompanyRegNumber)
                            .input('Province', sql.NVarChar(50), Company.Province)
                            .input('FirstName', sql.NVarChar(50), Company.FirstName)
                            .input('LastName', sql.NVarChar(50), Company.LastName)
                            .input('MobileNumber',sql.NVarChar(20), Company.MobileNumber)
                            .input('OfficeNumber',sql.NVarChar(20), Company.OfficeNumber)
                            .input('Email', sql.NVarChar(100), Company.Email)
                            .input('CreatedOn',sql.DateTime(),date_ob)
                            .query(sqlQueries.createcompany);    
                            let acompany =insertcompany.recordset;                    
        return acompany[0];
    } catch (error) {
        return error.message;
    }
}
const ValidateCompany = async (Company)=>{
    try{
        let date_ob = new Date();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Companies');
        const update = await pool.request()
            .input('ID', sql.NVarChar(50), Company.ID)
            .input('UpdatedOn', sql.DateTime(), date_ob)
            .input('IsActive', sql.Bit, Company.IsActive)
            .input('Rejected', sql.Bit,Company.Rejected)
            .query(sqlQueries.Validatecompany);
            let results = update.recordset;                    
            return results[0];
        //return update.recordset
        
    }catch (error){
        return error.message;
    }
}
const UpdateCompany = async (CompanyId, Company) => {
    try {
        let date_ob = new Date();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Companies');
        const update = await pool.request()
        .input('ID', sql.NVarChar(50), CompanyId)
        .input('TradingName', sql.NVarChar(50), Company.TradingName)
                            .input('CompanyRegNumber', sql.NVarChar(100), Company.CompanyRegNumber)
                            .input('Province', sql.NVarChar(50), Company.Province)
                            .input('IsActive',sql.Bit(),Company.IsActive)
                            .input('Firstname', sql.NVarChar(50), Company.FirstName)
                            .input('Lastname', sql.NVarChar(50), Company.LastName)
                            .input('MobileNumber',sql.NVarChar(50), Company.MobileNumber)
                            .input('OfficeNumber',sql.NVarChar(50), Company.OfficeNumber)
                            .input('Email', sql.NVarChar(50), Company.Email)
                            .input('UpdatedOn', sql.DateTime(), date_ob)
                      .query(sqlQueries.updatecompany);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const DeleteCompany = async (companyId) => {
    try {
        let date_ob = new Date();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Companies');
        const deletecompany = await pool.request()
                            .input('ID', sql.Int, companyId)
                            .query(sqlQueries.deletecompany);
        return deletecompany.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    GetCompanies,
    GetById,
    CreateCompany,
    UpdateCompany,
    DeleteCompany,
    ValidateCompany,
    GetActiveCompanies,
    GetInActiveCompanies
}