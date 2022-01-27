const db = require('../models/index');

const Transactions = db.Transactions;

//admin methods
const addTransaction = async (req, res) => {
    try {
        let input_data = {
            type: req.body.type,
            amount: req.body.amount,
            date: req.body.date,
            accountId: req.body.accountId
        }
        console.log(input_data);
    
        const transaction = await Transactions.create(input_data);
        res.status(200).send(transaction)
    }
    catch(error) {
        res.status(400).send(error);
    }
}

const deleteTransaction = async (req, res) => {
    try {
        let id = req.params.id;
    
        await Transactions.destroy({where :{id: id}});
        res.status(200).send(`Transaction with id: ${id} is deleted`);
    }
    catch(error){
        res.status(400).send(error);
    }
}

const updateTransaction = async (req, res) => {
    try {
        let id = req.params.id;
        let type = req.body.type
        await Transactions.update({type: type},{where: {id: id}});
        res.status(200).send("transaction updated");
    }
    catch(error){
        res.status(400).send(error);
    }
}

//common methods
const getAllTransactions = async (req, res) => {
    try {
        let transactions = await Transactions.findAll({});
        res.status(200).send(transactions);
    }
    catch(error){
        res.status(400).send(error);
    }
}

const getOneTransaction = async (req, res) => {
    try {
        let id = req.params.id;
    
        let transaction = await Transactions.findOne({where: {id : id}});
        res.status(200).send(transaction);
    }
    catch(error){
        res.status(400).send(error);
    }
}

const getAccountTransactions = async (req, res) => {
    try {
        let accountId = req.params.id;
    
        let transactions = await Transactions.findAll({where: {accountId : accountId}});
        res.status(200).send(transactions);
    }
    catch(error) {
        res.status(400).send(error);
    }
}

module.exports = {
    addTransaction,
    updateTransaction,
    getAllTransactions,
    getOneTransaction,
    deleteTransaction,
    getAccountTransactions
}