const { Investment } = require('../config')
const axios = require('axios');

const getStockSymbols = async () => {
    // This is an example URL; use a valid endpoint or list from Polygon.io
    const response = await axios.get(`${POLYGON_BASE_URL}/reference/tickers?apiKey=${POLYGON_API_KEY}`);
    return response.data.results.map(stock => stock.symbol);
};

const getAllStocks = async (req, res) => {
    try {
        const symbols = await getStockSymbols(); // Retrieve stock symbols
        const stockDataPromises = symbols.map(symbol =>
          axios.get(`${POLYGON_BASE_URL}/last/stocks/${symbol}?apiKey=${POLYGON_API_KEY}`)
        );
        const stockDataResponses = await Promise.all(stockDataPromises);
        
        const formattedData = stockDataResponses.map(response => ({
          symbol: response.data.symbol,
          price: response.data.last.price,
          timestamp: response.data.last.timestamp,
        }));
    
        res.json(formattedData);
      } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }
}


const getUserInvestments = async (req, res) => {
    
}

module.exports = { getAllStocks, getUserInvestments}