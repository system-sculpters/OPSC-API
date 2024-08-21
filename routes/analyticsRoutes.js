const router = require('express').Router()
const { getTransactionsByMonth } = require('../controller/analyticsController')

router.get('/:id/transactions/monthly', getTransactionsByMonth)

router.get('/:id/categories')


module.exports = router