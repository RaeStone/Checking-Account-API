const databaseConfig = require('../databaseConfig');

const { Sequelize, DataTypes } = require('sequelize');

let sequelize = null;

if (process && process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
            }
            }
        }
    );
} else {
    sequelize = new Sequelize(
    { // use imported configurations from dbConfig
        database: databaseConfig.DB,
        username: databaseConfig.USER,
        password: databaseConfig.PASSWORD,
        dialect: databaseConfig.dialect,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
                }
            },
        host: databaseConfig.HOST,
    });
}

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