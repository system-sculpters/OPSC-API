const router = require('express').Router()
const { getTransactionsByMonth, getExpenseCategoryStats } = require('../controller/analyticsController')
const { verifyToken, verifyUser } = require('../middleware/authMiddleware')
 
router.get('/:id/transactions/monthly', verifyToken, verifyUser, getTransactionsByMonth)

router.get('/:id/categories', verifyToken, verifyUser, getExpenseCategoryStats) 


module.exports = router