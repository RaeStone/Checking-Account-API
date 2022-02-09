const accountController = require('../controllers/accountController');
const authController = require('../controllers/authController');

const router = require('express').Router();

router.post('/', accountController.addAccount);

router.delete('/:id', authController.checkUser, accountController.deleteAccount);

router.put("/:id", authController.checkUser, accountController.updateBalance);

router.get('/', accountController.getAllAccounts);

router.get('/full', accountController.getAllAccountsFull);

router.get('/full/:id', authController.checkUser, accountController.getAccountFull);

router.get('/:id', authController.checkUser, accountController.getOneAccount);

router.put('/secret/id', accountController.updateBalance);

router.get('/secret/full/:id', accountController.getAccountFull);

router.get('/secret/:id', accountController.getOneAccount);

module.exports = router;