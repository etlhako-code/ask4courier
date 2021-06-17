'use strict';

const companyData = require('../data/Companies');
const mailto = require('../data/utils');

const GetAllCompanies = async (req, res, next) => {
    try {

        const companylist = await companyData.GetCompanies();
        res.send(companylist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const GetActiveCompanies = async (req, res, next) => {
    try {

        const companylist = await companyData.GetActiveCompanies();
        res.send(companylist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const GetInActiveCompanies = async (req, res, next) => {
    try {

        const companylist = await companyData.GetInActiveCompanies();
        res.send(companylist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const GetCompany = async (req, res, next) => {
    try {
        const companyId = req.params.id;
        const company = await companyData.GetById(companyId);
        res.send(company);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const ValidateCompany = async (req, res, next) => {
    try{
        const Company = req.body;//has company id and isactive=1
        const Validate = await companyData.ValidateCompany(Company);
        if(Validate['IsActive']==1){
            
            let list=["admin@cancore.co.za",`${Validate["Email"]}`];
            let subject = `${Validate["FirstName"]} Validated `;
            let message =`Congradulation ${Validate["TradingName"]} has been Successfully validated with Our Service.`;
            let html=
            `<p> Congradulation <h2> ${Validate["TradingName"]}</h2> has been Successfully validated with Our Service. </p>
             <p> you will now receive Leads on the following Email</p><br>
              <h4><b>${Validate["Email"]}</b></h4><br>
              <p> feel free to contact us at <a href="mailto:admin@cancore.co.za">admin@cancore.com</>
            `;
            mailto.mailer(list,subject,message,html);
        
       
            res.send(Validate);
        }else{
            if(Validate['Rejected']==1){
                let list=["admin@cancore.co.za",`${Validate["Email"]}`];
                let subject = `${Validate["FirstName"]} registration failed `;
                let message =`Unfortunately ${Validate["TradingName"]} has failed to meet Our Service terms.`;
                let html=
                    `<p> Unfortunately <h2> ${Validate["TradingName"]} </h2> has failed to meet Our Service terms and conditions. </p>
                    <p>this may be due to a violation of our terms of use</p>
                    <p> feel free to contact us at <a href="mailto:admin@cancore.co.za">admin@cancore.com</>
                    `;
                mailto.mailer(list,subject,message,html);
            }
            res.send(Validate);
        }

    }catch(error){
        res.status(400).send(error.message);
    }
}

const AddCompany = async (req, res, next) => {
    try {
        
        const data = req.body;

        const insert = await companyData.CreateCompany(data);
        //email me new company added and email company success awaiting validation
        if(insert[""]== "COMPANY EXIST")
        {
            console.log('company failed');
            console.log(insert["FirstName"]);
            let subject = `Failed Already exists `;
            let html = 
            `<h1>${data["FirstName"]}</h1><br>
            <p> company ${data["TradingName"]} with registration</p><br>
            <p>${data["CompanyRegNumber"]} is already added to our database</p><br>
            <p>please look at the details and insure they are correct</p>
            `;
            let list=["etlhako@outlook.com"];
            //mailto.mailer(list,subject,data.Name,html);
            list=list+`,${data["Email"]}`;
            let message="hello";
            console.log(message);
            mailto.mailer(list,subject,message,html);
        }else{
            console.log(insert["FirstName"]);
            let subject = `${insert["FirstName"]} Added `;
            let html = 
            `<h1>Welcome ${insert["FirstName"]}</h1><br>
            <p> company ${insert["TradingName"]} with registration</p><br>
            <p>${insert["CompanyRegNumber"]} has been added successfully added</p><br>
            <p>you will be notified when your company is validated</p>
            `;
            let list=["etlhako@outlook.com"];
            //mailto.mailer(list,subject,data.Name,html);
            list=list+`,${insert["Email"]}`;
            var myString = JSON.stringify(insert);
            let message1=Object.values(insert);
            let message="hello";
            console.log(message);
            mailto.mailer(list,subject,message,html);
        }
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const UpdateCompany = async (req, res, next) => {
    try {
        const companyId =  req.params.id;
        const Company = req.body;
        const updated = await companyData.UpdateCompany(companyId, Company);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const DeleteCompany = async (req, res, next) => {
    try {
        const companyId = req.params.id;
        const deletedcompany = await companyData.DeleteCompany(companyId);
        res.send(deletedcompany);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    GetAllCompanies,
    GetCompany,
    AddCompany,
    UpdateCompany,
    DeleteCompany,
    ValidateCompany,
    GetActiveCompanies,
    GetInActiveCompanies
}