const axios = require('axios');

/**
 * Stock API Route
 * 
 * Proxies requests to Finnhub API
 * - GET /api/stock/:symbol - Get current stock quote
 * - GET /api/stock/historical/:symbol - Get historical data
 * 
 * Environment variable required:
 * - FINNHUB_API_KEY
 */

const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  const apiKey = process.env.FINNHUB_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ 
      error: 'FINNHUB_API_KEY not configured' 
    });
  }

  try {
    // Parse URL to get symbol
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathParts = url.pathname.split('/');
    const symbol = pathParts[pathParts.length - 1];

    if (!symbol || symbol === 'stock') {
      return res.status(400).json({ 
        error: 'Stock symbol required' 
      });
    }

    // Fetch from Finnhub
    const response = await axios.get(
      `${FINNHUB_BASE_URL}/quote`,
      {
        params: {
          symbol: symbol.toUpperCase(),
          token: apiKey
        }
      }
    );

    // Return formatted data
    res.status(200).json({
      symbol: symbol.toUpperCase(),
      current: response.data.c,
      change: response.data.d,
      percentChange: response.data.dp,
      high: response.data.h,
      low: response.data.l,
      open: response.data.o,
      previousClose: response.data.pc,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Stock API error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch stock data',
      message: error.message 
    });
  }
};
