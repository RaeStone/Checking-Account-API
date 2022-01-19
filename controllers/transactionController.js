const db = require('../models/index');

const Transactions = db.Transactions;

//admin methods
const addTransaction = async (req, res) => {
    let input_data = {
        type: req.body.type,
        amount: req.body.amount,
        date: req.body.date,
        accountId: req.body.accountId
    }
    console.log(input_data);

    const transaction = await Transactions.create(input_data);
    res.status(200).send(transaction);
}

const deleteTransaction = async (req, res) => {
    let id = req.params.id;

    await Transactions.destroy({where :{id: id}});
    res.status(200).send(`Transaction with id: ${id} is deleted`);
}

//common methods
const getAllTransactions = async (req, res) => {
    let transactions = await Transactions.findAll({});
    res.status(200).send(transactions);
}

const getOneTransaction = async (req, res) => {
    let id = req.params.id;

    let transactions = await Transactions.findOne({where: {id : id}});
    res.status(200).send(transaction);
}

const getAccountTransactions = async (req, res) => {
    let accountId = req.params.id;

    let transactions = await Transactions.findAll({where: {accountId : accountId}});
    res.status(200).send(transactions);
}

module.exports = {
    addTransaction,
    getAllTransactions,
    getOneTransaction,
    deleteTransaction,
    getAccountTransactions
}