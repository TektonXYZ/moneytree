const express = require('express');
const axios = require('axios');
require('dotenv').config();

/**
 * Stock API Route
 * 
 * Proxies requests to Finnhub API
 * Keeps API key hidden from frontend
 * 
 * Routes:
 * - GET /api/stock/quote/:symbol - Current price
 * - GET /api/stock/historical/:symbol - Historical data
 * - GET /api/stock/search/:query - Symbol search
 */

const router = express.Router();

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

// Rate limiting helper (60 calls/minute on free tier)
let requestCount = 0;
let lastReset = Date.now();

const checkRateLimit = () => {
  const now = Date.now();
  if (now - lastReset > 60000) {
    requestCount = 0;
    lastReset = now;
  }
  if (requestCount >= 60) {
    return false;
  }
  requestCount++;
  return true;
};

// Get current stock quote
router.get('/quote/:symbol', async (req, res) => {
  try {
    if (!checkRateLimit()) {
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }

    const { symbol } = req.params;
    const response = await axios.get(
      `${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

// Get historical data (candles)
router.get('/historical/:symbol', async (req, res) => {
  // TODO: Implement historical data fetching
  res.json({ message: 'Historical data endpoint - TODO' });
});

// Search for stocks
router.get('/search/:query', async (req, res) => {
  try {
    if (!checkRateLimit()) {
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }

    const { query } = req.params;
    const response = await axios.get(
      `${FINNHUB_BASE_URL}/search?q=${query}&token=${FINNHUB_API_KEY}`
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Error searching stocks:', error);
    res.status(500).json({ error: 'Failed to search stocks' });
  }
});

module.exports = router;
