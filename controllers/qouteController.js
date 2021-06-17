'use strict';

const QuoteData = require('../../data/qoutes');
const mailto = require('../../data/utils');
const companyData = require('../../data/Companies');

const getAllQuotes = async (req, res, next) => {
    try {

        const quoteList = await QuoteData.getquotes();
        res.send(quoteList);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getQuote = async (req, res, next) => {
    try {
        const quoteId = req.params.id;
        const quote = await QuoteData.getById(quoteId);
        res.send(quote);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getQuoteByDestination = async (req, res, next) => {
    try {
        const quoteProvince = req.body.Province;
        const quote = await QuoteData.getByDestination(quoteProvince);
        res.send(quote);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getQuoteByPickup = async (req, res, next) => {
    try {
        const quoteProvince = req.body.Province;
        const quote = await QuoteData.getByPickup(quoteProvince);
        res.send(quote);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const addQuote = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await QuoteData.createquote(data);
        
        //send email to customer to confirm
        let html=
        `   <p>Dear ${insert["FirstName"]}</p>
            <h3>Thank you for using our service.</h3>
            <p>We have recieved your qoute for</p>
            <ul>
                <li>Package : ${insert["Commodity"]}</li>
                <li>Destination :${insert["DestinationLoc"]}</li>
                <li>Pick up: ${insert["PickUpLoc"]}</li>
            </ul>
            <p>your request has been forwarded to four of your cheapest nearest service providers.</p>
            <p>A representative of each provider will get in touch with you on the details you provided:</p>
            <ul>
                <li>${insert["Email"]}</li>
                <li>${insert["MobileNumber"]}</li>
                <li>${(insert["OfficeNumber"]==null)?" ":insert["OfficeNumber"]}</li>
            </ul>
            <br>
            <p>Feel free to contact us on <a href="mailto:admin@cancore.com">Admin@cancore.com</a> <br>
            for any queries or questions you may have.
            </p><br>
            <blockquote>Kind regards</blockquote>
            <blockquote>Cancore consulting cc</blockquote>
        `;
        mailto.mailer(insert['Email'],"AskForCourier Quote Recieved"," ",html);
        //get all active companies
        const companylist = await companyData.GetActiveCompanies();
        const nearest=companylist.find((comp)=>{comp.Province===data.Province});
         //extract emails from active companies into list 
         let emails = [];
         nearest.map((company)=>{company.email !== undefined; emails.push(company.Email);});
         for (var x = 0; x < companylist.length; x++) {
             emails.push(companylist[x].Email);
         }
         //send email to companies 
         let companiesMsg=
         `   <p>Dear ${insert["FirstName"]}</p>
             <h3>Thank you for using our service.</h3>
             <p>We have recieved your qoute for</p>
             <ul>
                 <li>Package : ${insert["Commodity"]}</li>
                 <li>Destination :${insert["DestinationLoc"]}</li>
                 <li>Pick up: ${insert["PickUpLoc"]}</li>
             </ul>
             <p>your request has been forwarded to four of your cheapest nearest service providers.</p>
             <p>A representative of each provider will get in touch with you on the details you provided:</p>
             <ul>
                 <li>${insert["Email"]}</li>
                 <li>${insert["MobileNumber"]}</li>
                 <li>${(insert["OfficeNumber"]==null)?" ":insert["OfficeNumber"]}</li>
             </ul>
             <br>
             <p>Feel free to contact us on <a href="mailto:admin@cancore.com">Admin@cancore.com</a> <br>
             for any queries or questions you may have.
             </p><br>
             <blockquote>Kind regards</blockquote>
             <blockquote>Cancore consulting cc</blockquote>
         `
         mailto.mailer(emails,"AskForCourier Quotes"," ",companiesMsg);
       
         res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const updateQuote = async (req, res, next) => {
    try {
        const quoteId =  req.params.id;
        const data = req.body;
        const updated = await QuoteData.updatequote(quoteId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const deleteQuote = async (req, res, next) => {
    try {
        const quoteId = req.params.id;
        const deletedquote = await QuoteData.deletequote(quoteId);
        res.send(deletedquote);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllQuotes,
    getQuote,
    addQuote,
    updateQuote,
    deleteQuote,
    getQuoteByPickup,
    getQuoteByDestination
}