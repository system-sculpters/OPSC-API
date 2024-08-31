const router = require('express').Router()
const { getPortfolioValue, getUserInvestments, buyInvestment, sellInvestment } =  require('../controller/investmentController')
const { verifyToken, verifyUser } = require('../middleware/authMiddleware');

router.get('/:id', verifyToken, verifyUser, getUserInvestments);

router.get('/:id/value', verifyToken, verifyUser, getPortfolioValue);

router.post('/buy', verifyToken, verifyUser, buyInvestment)

router.post('/sell', verifyToken, verifyUser, sellInvestment)

module.exports = router