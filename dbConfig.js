   const keys = require('./keys.env');
   // store the configuration secrets of the PG DB here
   module.exports = {
    HOST: 'bank-account-db.czr7p5bktcvw.us-east-1.rds.amazonaws.com', // your endpoint
    USER: USERNAME, // your username
    PASSWORD: PASS, // your password
    DB: 'bankaccounts', // your db name
    dialect: 'postgres',
    }