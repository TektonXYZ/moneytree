const fs = require('fs');
const path = require('path');

/**
 * Portfolio API Route
 * 
 * Manages user portfolios (JSON file-based for demo)
 * - GET /api/portfolio - Get portfolio
 * - POST /api/portfolio/buy - Buy stock
 * - POST /api/portfolio/sell - Sell stock
 * - POST /api/portfolio/reset - Reset to starting cash
 * 
 * TODO: Replace with SQLite for production
 */

const DATA_FILE = path.join(__dirname, '../data/portfolio.json');

// Ensure data directory exists
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize with default portfolio if not exists
const getPortfolio = () => {
  if (!fs.existsSync(DATA_FILE)) {
    const defaultPortfolio = {
      cash: 10000,
      startValue: 10000,
      positions: [],
      trades: [],
      createdAt: new Date().toISOString()
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultPortfolio, null, 2));
    return defaultPortfolio;
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
};

const savePortfolio = (portfolio) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(portfolio, null, 2));
};

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathParts = url.pathname.split('/');
    const action = pathParts[pathParts.length - 1];

    // GET /api/portfolio - Get current portfolio
    if (req.method === 'GET' && action === 'portfolio') {
      const portfolio = getPortfolio();
      
      // Calculate current value
      const positionsValue = portfolio.positions.reduce(
        (sum, pos) => sum + (pos.shares * pos.currentPrice), 
        0
      );
      
      res.status(200).json({
        ...portfolio,
        positionsValue,
        totalValue: portfolio.cash + positionsValue,
        totalReturn: ((portfolio.cash + positionsValue - portfolio.startValue) / portfolio.startValue) * 100
      });
      return;
    }

    // POST /api/portfolio/buy
    if (req.method === 'POST' && action === 'buy') {
      // TODO: Implement buy logic
      res.status(501).json({ message: 'Buy endpoint - implement me!' });
      return;
    }

    // POST /api/portfolio/sell
    if (req.method === 'POST' && action === 'sell') {
      // TODO: Implement sell logic
      res.status(501).json({ message: 'Sell endpoint - implement me!' });
      return;
    }

    // POST /api/portfolio/reset
    if (req.method === 'POST' && action === 'reset') {
      const freshPortfolio = {
        cash: 10000,
        startValue: 10000,
        positions: [],
        trades: [],
        resetAt: new Date().toISOString()
      };
      savePortfolio(freshPortfolio);
      res.status(200).json({ message: 'Portfolio reset', portfolio: freshPortfolio });
      return;
    }

    res.status(404).json({ error: 'Unknown endpoint' });

  } catch (error) {
    console.error('Portfolio API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
};
