const router = require('express').Router()
const { getTransactionsByMonth, getExpenseCategoryStats } = require('../controller/analyticsController')

router.get('/:id/transactions/monthly', getTransactionsByMonth)

router.get('/:id/categories', getExpenseCategoryStats) 


module.exports = router