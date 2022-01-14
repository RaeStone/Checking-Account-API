const { Transactions } = require('../models/index');
const db = require('../models/index');

const Accounts = db.Accounts;

//admin methods
const addAccount = async (req, res) => {
    let input_data = {
        currentAmount: req.body.currentAmount,
        accountNumber: req.body.accountNumber,
        routingNumber: req.body.routingNumber,
        userId: req.body.userId
    }

    const account = await Accounts.create(input_data);
    res.status(200).send(account);
}

const deleteAccount = async (req, res) => {
    let id = req.params.id;

    await Accounts.destroy({where :{id: id}});
    res.status(200).send(`account with id: ${id} is deleted`);
}

//common methods
const getAllAccounts = async (req, res) => {
    let accounts = await Accounts.findAll({});
    res.status(200).send(accounts);
}

const getOneAccount = async (req, res) => {
    let id = req.params.id;

    let account = await Accounts.findOne({where: {id : id}});
    res.status(200).send(account);
}

const getAccountFull = async (req, res) => {
    let id = req.params.id;

    let account = await Accounts.findOne({where: {id : id}, include: db.Transactions});
    res.status(200).send(account);
}

const getAllAccountsFull = async (req, res) => {
    let accounts = await Accounts.findAll({include: db.Transactions});
    res.status(200).send(accounts);
}

module.exports = {
    addAccount,
    deleteAccount,
    getAllAccounts,
    getOneAccount,
    getAccountFull,
    getAllAccountsFull
}