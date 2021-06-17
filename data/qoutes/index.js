'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getquotes = async () => {
    try {
        let pool = await sql.connect(config.sql);//CONNECT DB
        const sqlQueries = await utils.loadSqlQueries('quotes');//LOAD PREQUERIES
        const quotesList = await pool.request().query(sqlQueries.quotesList);//LOAD SPECIFIC qouteS query
        let result=quotesList.recordset;
        return result;
    } catch (error) {
        console.log(error.message);
    }
}

const getById = async(quoteId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('quotes');
        const quote = await pool.request()
                            .input('ID', sql.Int, quoteId)//INPUT STRING MUST BE SAME AS IN DB
                            .query(sqlQueries.quotebyId);
                            let result=quote.recordset;
        return result[0];
    } catch (error) {
        return error.message;
    }
}
const getByDestination = async(Prov) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('quotes');
        const quote = await pool.request()
                            .input('DestinationLoc', sql.NvarChar(100), Prov)//INPUT STRING MUST BE SAME AS IN DB
                            .query(sqlQueries.quotebyDestination);
                            let result=quote.recordset;
        return result;
    } catch (error) {
        return error.message;
    }
}
const getByPickup = async(Prov) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('quotes');
        const quote = await pool.request()
                            .input('PickUpLoc', sql.NvarChar(100), Prov)//INPUT STRING MUST BE SAME AS IN DB
                            .query(sqlQueries.quotebyPickUp);
                            let result=quote.recordset;
        return result;
    } catch (error) {
        return error.message;
    }
}
const createquote = async (QuoteData) => {
    try {
        let date_ob = new Date();
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('qoutes');
        const insertqoute = await pool.request()
                            .input('Frequency', sql.NVarChar(10), QuoteData.Frequency)
                            .input('Commodity', sql.NVarChar(50), QuoteData.Commodity)
                            .input('NumberOfPackages', sql.Decimal(5,2), QuoteData.NumberOfPackages)
                            .input('CreatedOn', sql.DateTime(), date_ob)

                            .input('PackageLength', sql.Decimal(5,2), QuoteData.PackageLength)
                            .input('PackageWitdth', sql.Decimal(5,2), QuoteData.PackageWitdth)
                            .input('PackageHeight',sql.Decimal(5,2),QuoteData.PackageHeight)
                            .input('PackageWeight',sql.Decimal(5,2), QuoteData.PackageWeight)

                            .input('FirstName', sql.NVarChar(50), QuoteData.FirstName)
                            .input('LastName', sql.NVarChar(50), QuoteData.LastName)
                            .input('MobileNumber',sql.NVarChar(20), QuoteData.MobileNumber)
                            .input('OfficeNumber',sql.NVarChar(20), QuoteData.OfficeNumber)
                            .input('Email', sql.NVarChar(100), QuoteData.Email)

                            .input('PickUpLoc',sql.NVarChar(100), QuoteData.PickupLoc)
                            .input('PickUpArea',sql.NVarChar(100), QuoteData.PickupArea)

                            .input('DestinationLoc',sql.NVarChar(100), QuoteData.DestinationLoc)
                            .input('DestinationArea',sql.NVarChar(100), QuoteData.DestinationArea)

                            .query(sqlQueries.createquote);
                            let result=insertquote.recordset;
        return result;
    } catch (error) {
        return error.message;
    }
}

const updatequote = async (quoteId, QuoteData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('qoutes');
        const update = await pool.request()
                        .input('ID', sql.Int, quoteId)
                        .input('Frequency', sql.NVarChar(10), QuoteData.Frequency)
                        .input('Commodity', sql.NVarChar(50), QuoteData.Commodity)
                        .input('NumberOfPackages', sql.Decimal(5,2), QuoteData.NumberOfPackages)
                        .input('UpdatedOn', sql.DateTime(), date_ob)

                        .input('PackageLength', sql.Decimal(5,2), QuoteData.PackageLength)
                        .input('PackageWitdth', sql.Decimal(5,2), QuoteData.PackageWitdth)
                        .input('PackageHeight',sql.Decimal(5,2),QuoteData.PackageHeight)
                        .input('PackageWeight',sql.Decimal(5,2), QuoteData.PackageWeight)

                        .input('FirstName', sql.NVarChar(50), QuoteData.FirstName)
                        .input('LastName', sql.NVarChar(50), QuoteData.LastName)
                        .input('MobileNumber',sql.NVarChar(20), QuoteData.MobileNumber)
                        .input('OfficeNumber',sql.NVarChar(20), QuoteData.OfficeNumber)
                        .input('Email', sql.NVarChar(100), QuoteData.Email)

                        .input('PickUpLoc',sql.NVarChar(100), QuoteData.PickupLoc)
                        .input('PickUpArea',sql.NVarChar(100), QuoteData.PickupArea)

                        .input('DestinationLoc',sql.NVarChar(100), QuoteData.DestinationLoc)
                        .input('DestinationArea',sql.NVarChar(100), QuoteData.DestinationArea)
                        .query(sqlQueries.updatequote);
                        let result =update.recordset;
        return result;
    } catch (error) {
        return error.message;
    }
}

const deletequote = async (quoteId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('quotes');
        const deletequote = await pool.request()
                            .input('ID', sql.Int, quoteId)
                            .query(sqlQueries.deletequote);
                            let result =deletequote.recordset;
        return result;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getquotes,
    getById,
    createquote,
    updatequote,
    deletequote,
    getByPickup,
    getByDestination
}