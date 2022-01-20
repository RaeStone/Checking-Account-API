const accountController = require('../controllers/accountController');

const router = require('express').Router();

router.post('/', accountController.addAccount);

router.delete('/:id', accountController.deleteAccount);

router.put("/:id", accountController.updateBalance);

router.get('/', accountController.getAllAccounts);

router.get('/full', accountController.getAllAccountsFull);

router.get('/full/:id', accountController.getAccountFull);

router.get('/:id', accountController.getOneAccount);

module.exports = router;