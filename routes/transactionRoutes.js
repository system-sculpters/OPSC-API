const router = require('express').Router();
const { verifyToken, verifyUser } = require('../middleware/authMiddleware')
const { getTransactions, createTransaction, updateTransaction, deleteTransaction } =  require('../controller/transactionController')

router.get('/:id', verifyToken, verifyUser,getTransactions);

router.post('/create', verifyToken, verifyUser, createTransaction);
 
router.put('/:id', verifyToken, verifyUser, updateTransaction);

router.delete('/:id', verifyToken, verifyUser, deleteTransaction);

module.exports = router;