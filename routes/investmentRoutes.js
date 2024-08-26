const router = require('express').Router()
const { getPortfolioValue, getUserInvestments, buyInvestment, sellInvestment } =  require('../controller/investmentController')

router.get('/:id', getUserInvestments);

router.get('/:id/value', getPortfolioValue);

router.post('/buy', buyInvestment)

router.post('/sell', sellInvestment)

module.exports = router