'use strict';
const express = require('express');
const config = require('./config');
const utilities = require('./data/utils');
const cors = require('cors');
const companyRoutes = require('./routes/companyRoutes');
const qouteRoutes = require('./routes/qouteRoutes');
const sql = require('mssql');

const app = express();

app.use(express.json());//allow json
app.use(cors());//implement cross origin
//app.use('/api', express_jwt({secret: SECRET, userProperty: 'token_payload'}));//intercept api calls and val token
//app.use('/api/v1/companies',utilities.check_scopes(['admin']), companyRoutes.routes);
app.use('/api/v1/companies',companyRoutes.routes);
app.use('/api/v1/qoutes', qouteRoutes.routes);

const sqlEncrypt = process.env.SQL_ENCRYPT === "true";
let sqlo= {
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  options: {
      encrypt: sqlEncrypt,
      enableArithAbort: true
  }
};


app.listen(config.port,async () => {
  console.log('app listening on url http://localhost:' + config.port );
  try{
    let pool = await sql.connect(sqlo);
  // utilities.mailer("admin@cancore.co.za,etlhako@gmail.com","sql server connection","connection successful",null);
  }
  catch(err){
    console.log('failed:'+err);
    utilities.mailer("admin@cancore.co.za,etlhako@gmail.com","sql server connection",`connection failed ${err}`,null);
  }

});
