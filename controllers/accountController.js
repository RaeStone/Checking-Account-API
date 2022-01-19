const { Transactions } = require('../models/index');
const db = require('../models/index');

const Accounts = db.Accounts;

//admin methods
const addAccount = async (req, res) => {
    try {
        let input_data = {
            currentAmount: req.body.currentAmount,
            accountNumber: req.body.accountNumber,
            routingNumber: req.body.routingNumber,
            userId: req.body.userId
        }
        let regex = /[0-9]*/;
        if (!regex.test(accountNumber)){
            throw new Error('accountNumber only accepts digits');
        }
        if (!regex.test(routingNumber)){
            throw new Error('routingNumber only accepts digits');
        }
    
        const account = await Accounts.create(input_data);
        res.status(200).send(account);
    }
    catch(error) {
        res.status(400).send(error.message);
    }  
}

const deleteAccount = async (req, res) => {
    try {
        let id = req.params.id;

        await Accounts.destroy({where :{id: id}});
        res.status(200).send(`account with id: ${id} is deleted`);
    }
    catch(error) {
        res.status(400).send(error);
    }
    
}

const updateAccountTotal = async (req, res) => {
    try {
        let id = req.params.id;
        let total = req.body.total;

        await Accounts.update({currentAmount: total}, {where :{id: id}});
        res.status(200).send(`account with id: ${id} has new total: ${total}`);
    }
    catch(error) {
        res.status(400).send(error);
    }
    
}

//common methods
const getAllAccounts = async (req, res) => {
    try {
        let accounts = await Accounts.findAll({});
        res.status(200).send(accounts);
    }
    catch(error) {
        res.status(400).send(error);
    }
}

const getOneAccount = async (req, res) => {
    try {
        let id = req.params.id;
        let account = await Accounts.findOne({where: {id : id}});
        res.status(200).send(account);
    }
    catch(error) {
        res.status(400).send(error);
    }
}



const getAccountFull = async (req, res) => {
    try {
        let id = req.params.id;
    
        let account = await Accounts.findOne({where: {id : id}, include: db.Transactions});
        res.status(200).send(account);
    }
    catch(error){
        res.status(400).send(error);
    }
}

const getAllAccountsFull = async (req, res) => {
    try {
        let accounts = await Accounts.findAll({include: db.Transactions});
        res.status(200).send(accounts);
    }
    catch(error) {
        res.status(400).send(error);
    }
}

module.exports = {
    deleteAccount,
    getAllAccounts,
    getOneAccount,
    getAccountFull,
    getAllAccountsFull,
    updateAccountTotal,
    addAccount
}