const router = require('express').Router()
const { getTransactionsByMonth, getExpenseCategoryStats, getTransactionsForLast7Days } = require('../controller/analyticsController')
const { verifyToken, verifyUser } = require('../middleware/authMiddleware')
 
router.get('/:id/transactions/monthly', verifyToken, getTransactionsByMonth)

router.get('/:id/categories', verifyToken, getExpenseCategoryStats) 

router.get('/:id/transactions/weekly', verifyToken, getTransactionsForLast7Days) 

module.exports = router