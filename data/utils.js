'use strict';
require('dotenv').config();
const fs = require('fs-extra');
const {join} = require('path');
const nodemailer = require('nodemailer');

const username=process.env.FROM;
const password=process.env.PASSWORD;  

const loadSqlQueries = async (folderName) => {
    const filePath = join(process.cwd(), 'data', folderName);
    const files = await fs.readdir(filePath);
    const sqlFiles = files.filter(f => f.endsWith('.sql'));
    const queries = {};
    for (const sqlfile of sqlFiles) {
        const query = fs.readFileSync(join(filePath,  sqlfile), {encoding: "UTF-8"});
        queries[sqlfile.replace(".sql", "")] = query;
    }
    return queries;
}
const Transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user:username,
        pass:password
    },
    tls:{
        rejectUnauthorized:false
      }
});

const mailer = async (email,subject,text,output)=>{
    let mailOptions = {
        from: '"AskForCourier Contact" <admin@cancore.co.za>', // sender address
        to: email, // list of receivers
        //cc:'etlhako@gmail.com',
        subject: subject, // Subject line
        text: text, // plain text body
        html: output // html body
    };
    Transporter.sendMail(mailOptions,function(err,data){
      if(err){
          console.log(err);
      }
    });
   /*  Transporter.sendMail(mailOptions).then((response)=>{
        console.log(response);
    }).catch((err)=>{
        console.log(err);
    }); */
}
//twilio
const sendSms = async(from,customer,body)=>{

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    
    client.messages
          .create({
             body: body,
             from: from,
             to: customer
           })
          .then(message => console.log(message.sid)); 

}
const check_scopes=(scopes)=> {
    return function(req, res, next) {
      //
      // check if any of the scopes defined in the token,
      // is one of the scopes declared on check_scopes
      //
      var token = req.token_payload;
      for (var i =0; i<token.scopes.length; i++){
        for (var j=0; j<scopes.length; j++){
            if(scopes[j] === token.scopes[i]) return next();
        }
      } 
      return res.send(401, 'insufficient scopes')
    }
  }
module.exports = {
    loadSqlQueries,
    mailer,
    sendSms,
    check_scopes
}