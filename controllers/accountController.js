const { Transactions } = require('../models/index');
const db = require('../models/index');

const Accounts = db.Accounts;

//admin methods
const addAccount = async (req, res) => {
    try {
        let input_data = {
            balance: req.body.balance,
            accountNumber: req.body.accountNumber,
            routingNumber: req.body.routingNumber,
            userId: req.body.userId
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

const updateBalance = async (req, res) => {
    try {
        let id = req.params.id;
        let balance = req.body.balance;

        await Accounts.update({balance: balance}, {where :{id: id}});
        res.status(200).send(`account with id: ${id} has new balance: ${balance}`);
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
        let userId = req.params.userId;
        let account = await Accounts.findOne({where: {userId : userId}});
        console.log(account);
        res.status(200).send(account);
    }
    catch(error) {
        res.status(400).send(error);
    }
}



const getAccountFull = async (req, res) => {
    try {
        let userId = req.params.id;
    
        let account = await Accounts.findOne({where: {userId : userId}, include: db.Transactions});
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
    updateBalance,
    addAccount
}