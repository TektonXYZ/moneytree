import React, { useState, useEffect } from 'react';

/**
 * Portfolio Component
 * 
 * Manages user's stock portfolio:
 * - Display current holdings
 * - Buy/sell stocks
 * - Show P&L per position
 * - Track cash balance
 * 
 * TODO: Implement full portfolio CRUD
 */

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState({
    cash: 10000,
    positions: [],
    totalValue: 10000
  });

  const buyStock = async (symbol, shares, price) => {
    // TODO: Implement buy logic
    console.log(`Buying ${shares} shares of ${symbol} at $${price}`);
  };

  const sellStock = async (symbol, shares, price) => {
    // TODO: Implement sell logic
    console.log(`Selling ${shares} shares of ${symbol} at $${price}`);
  };

  return (
    <div className="portfolio-container">
      <h2>Portfolio</h2>
      <div className="portfolio-summary">
        <p>Cash: ${portfolio.cash.toFixed(2)}</p>
        <p>Total Value: ${portfolio.totalValue.toFixed(2)}</p>
      </div>
      
      <div className="positions-list">
        <h3>Positions</h3>
        {portfolio.positions.length === 0 ? (
          <p>No positions yet. Start trading!</p>
        ) : (
          portfolio.positions.map(pos => (
            <div key={pos.symbol} className="position">
              {/* TODO: Display position details */}
            </div>
          ))
        )}
      </div>
      
      {/* TODO: Add buy/sell form */}
    </div>
  );
};

export default Portfolio;
