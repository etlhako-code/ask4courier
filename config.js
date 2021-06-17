'use strict';

const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {PORT, HOST, HOST_URL, SQL_USER, SQL_PASSWORD, SQL_DATABASE, SQL_SERVER} = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === "true";

assert(process.env.PORT, 'PORT is require');
assert(process.env.HOST, 'HOST is required');

module.exports = {
    port: process.env.PORT,
    host: process.env.HOST,
    url: process.env.HOST_URL,
    sql: {
        server: process.env.SQL_SERVER,
        database: process.env.SQL_DATABASE,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        options: {
            encrypt: sqlEncrypt,
            enableArithAbort: true,
            trustServerCertificate:true,
        }
    }
};