const router = require('express').Router()


const { getStocks, getStockBySymbol, getTop40Stocks, getBatchStocks, updateStockLogos, getTop40Data } =  require('../controller/stockController')

router.get('/', getStocks);

router.get('/top/stocks', getTop40Stocks);

router.get('/top/batch-stocks', getBatchStocks);

router.get('/top/40', getTop40Data);

router.get('/update/logo', updateStockLogos);



module.exports = router