const router = require('express').Router();
const { verifyToken, verifyUser } = require('../middleware/authMiddleware')
const { getTransactions, createTransaction, updateTransaction, deleteTransaction } =  require('../controller/transactionController')

router.get('/:id', verifyToken, getTransactions);

router.post('/create', verifyToken, createTransaction);
 
router.put('/:id', verifyToken, updateTransaction);

router.delete('/:id', verifyToken, deleteTransaction);

module.exports = router;