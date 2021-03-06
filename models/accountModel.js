const { database } = require("pg/lib/defaults")

module.exports = (sequelize, DataTypes) => {

    const Account = sequelize.define('account', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        balance: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        accountNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        routingNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Account;
}