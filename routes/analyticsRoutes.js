const router = require('express').Router()
const { getTransactionsByMonth, getExpenseCategoryStats } = require('../controller/analyticsController')
const { verifyToken, verifyUser } = require('../middleware/authMiddleware')
 
router.get('/:id/transactions/monthly', verifyToken, getTransactionsByMonth)

router.get('/:id/categories', verifyToken, getExpenseCategoryStats) 


module.exports = router