const transactionController = require('../controllers/transactionController');

const router = require('express').Router();

router.post('/', transactionController.addTransaction);

router.put('/:id', transactionController.updateTransaction);

router.get('/', transactionController.getAllTransactions);

router.get('/:id', transactionController.getOneTransaction);

router.get('account/:id', transactionController.getAccountTransactions);

router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;