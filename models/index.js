const dbConfig = require('../dbconfig');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    {
        database: dbConfig.DB,
        username: dbConfig.USER,
        password: dbConfig.PASSWORD,
        dialect: dbConfig.dialect,
        host: dbConfig.HOST,
    }
);

const db = {}
db.sequelize = sequelize;

db.Accounts = require('./accountModel')(sequelize, DataTypes);
db.Transactions = require('./transactionModel')(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
    console.log('**DB synced with sequelize**');
}).catch((error) => {
    console.log('**Error syncing the DB to sequelize** : ' + error );
})

sequelize.authenticate()
.then(() => { // successfully connected to DB
    console.log("**connected to Postgres DB**");
})
.catch(e => {// failed connecting to DB
    console.log('**unable to connect to Postgres DB** : ' + e);
 });

db.Transactions.belongsTo(db.Accounts);
db.Accounts.hasMany(db.Transactions);

module.exports = db;