const router = require('express').Router()


const { getUserInvestments, getStocks, getStockBySymbol, getTop40Stocks, getBatchStocks, updateStockLogos, getTop40Data } =  require('../controller/investmentController')

router.get('/', getStocks);

router.get('/:id', getUserInvestments);

router.get('/top/stocks', getTop40Stocks);

router.get('/top/batch-stocks', getBatchStocks);

router.get('/top/40', getTop40Data);

router.get('/update/logo', updateStockLogos);



module.exports = router