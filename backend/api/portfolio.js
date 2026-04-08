const express = require('express');
const fs = require('fs').promises;
const path = require('path');

/**
 * Portfolio API Route
 * 
 * Manages user portfolios:
 * - GET /api/portfolio - Get current portfolio
 * - POST /api/portfolio/buy - Buy stock
 * - POST /api/portfolio/sell - Sell stock
 * - GET /api/portfolio/history - Trade history
 * 
 * Uses JSON file storage (demo) - upgrade to SQLite for production
 */

const router = express.Router();
const DB_PATH = path.join(__dirname, '../../data/portfolio.json');

// Initialize with default portfolio
const defaultPortfolio = {
  userId: 'default',
  cash: 10000,
  positions: [],
  trades: [],
  createdAt: new Date().toISOString()
};

// Ensure data directory exists
const ensureDataDir = async () => {
  const dataDir = path.dirname(DB_PATH);
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (err) {
    // Directory exists
  }
};

// Load portfolio from file
const loadPortfolio = async () => {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    // Return default if file doesn't exist
    return { ...defaultPortfolio };
  }
};

// Save portfolio to file
const savePortfolio = async (portfolio) => {
  await ensureDataDir();
  await fs.writeFile(DB_PATH, JSON.stringify(portfolio, null, 2));
};

// Get current portfolio
router.get('/', async (req, res) => {
  try {
    const portfolio = await loadPortfolio();
    
    // Calculate total value
    const positionsValue = portfolio.positions.reduce(
      (sum, pos) => sum + (pos.shares * pos.currentPrice), 
      0
    );
    
    res.json({
      ...portfolio,
      totalValue: portfolio.cash + positionsValue,
      positionsValue
    });
  } catch (error) {
    console.error('Error loading portfolio:', error);
    res.status(500).json({ error: 'Failed to load portfolio' });
  }
});

// Buy stock
router.post('/buy', async (req, res) => {
  try {
    const { symbol, shares, price } = req.body;
    const portfolio = await loadPortfolio();
    
    const totalCost = shares * price;
    
    if (portfolio.cash < totalCost) {
      return res.status(400).json({ error: 'Insufficient funds' });
    }
    
    // Update cash
    portfolio.cash -= totalCost;
    
    // Add/update position
    const existingPosition = portfolio.positions.find(p => p.symbol === symbol);
    if (existingPosition) {
      // Average down/up
      const totalShares = existingPosition.shares + shares;
      const totalCostBasis = (existingPosition.shares * existingPosition.avgPrice) + totalCost;
      existingPosition.shares = totalShares;
      existingPosition.avgPrice = totalCostBasis / totalShares;
    } else {
      portfolio.positions.push({
        symbol,
        shares,
        avgPrice: price,
        currentPrice: price
      });
    }
    
    // Record trade
    portfolio.trades.push({
      type: 'BUY',
      symbol,
      shares,
      price,
      total: totalCost,
      timestamp: new Date().toISOString()
    });
    
    await savePortfolio(portfolio);
    res.json({ success: true, portfolio });
  } catch (error) {
    console.error('Error buying stock:', error);
    res.status(500).json({ error: 'Failed to buy stock' });
  }
});

// Sell stock
router.post('/sell', async (req, res) => {
  try {
    const { symbol, shares, price } = req.body;
    const portfolio = await loadPortfolio();
    
    const position = portfolio.positions.find(p => p.symbol === symbol);
    if (!position || position.shares < shares) {
      return res.status(400).json({ error: 'Insufficient shares' });
    }
    
    const totalValue = shares * price;
    portfolio.cash += totalValue;
    
    // Update position
    position.shares -= shares;
    if (position.shares === 0) {
      portfolio.positions = portfolio.positions.filter(p => p.symbol !== symbol);
    }
    
    // Record trade
    portfolio.trades.push({
      type: 'SELL',
      symbol,
      shares,
      price,
      total: totalValue,
      timestamp: new Date().toISOString()
    });
    
    await savePortfolio(portfolio);
    res.json({ success: true, portfolio });
  } catch (error) {
    console.error('Error selling stock:', error);
    res.status(500).json({ error: 'Failed to sell stock' });
  }
});

// Get trade history
router.get('/history', async (req, res) => {
  try {
    const portfolio = await loadPortfolio();
    res.json(portfolio.trades || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load history' });
  }
});

module.exports = router;
