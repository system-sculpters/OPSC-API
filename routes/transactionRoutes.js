const router = require('express').Router();
const { getTransactions, createTransaction, updateTransaction, deleteTransaction } =  require('../controller/transactionController')

router.get('/:id', getTransactions);

router.post('/create', createTransaction);

router.put('/:id', updateTransaction);

router.delete('/:id', deleteTransaction);

module.exports = router;