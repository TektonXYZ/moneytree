import React, { useState, useEffect } from 'react';
import Tree from './components/Tree';
import Portfolio from './components/Portfolio';
import StockChart from './components/StockChart';

/**
 * Dashboard Component
 * 
 * Main dashboard that combines all features:
 * - Tree visualization (centerpiece)
 * - Portfolio management
 * - Stock charts
 * - Quick stats
 */

const Dashboard = () => {
  const [portfolio, setPortfolio] = useState({
    startValue: 10000,
    currentValue: 10000,
    dailyReturn: 0,
    totalReturn: 0,
    volatility: 2.5
  });

  // Fetch portfolio data on mount
  useEffect(() => {
    // TODO: Fetch from backend
    // fetch('/api/portfolio').then(res => res.json()).then(data => setPortfolio(data));
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🌳 MoneyTree</h1>
        <p>Watch your portfolio grow!</p>
      </header>

      <div className="dashboard-grid">
        {/* Main tree visualization */}
        <div className="tree-section">
          <Tree 
            portfolioValue={portfolio.currentValue}
            startValue={portfolio.startValue}
            dailyReturn={portfolio.dailyReturn}
            totalReturn={portfolio.totalReturn}
            volatility={portfolio.volatility}
          />
        </div>

        {/* Portfolio panel */}
        <div className="portfolio-section">
          <Portfolio />
        </div>

        {/* Charts panel */}
        <div className="charts-section">
          <StockChart title="Portfolio Value" />
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h4>Total Return</h4>
          <p className={portfolio.totalReturn >= 0 ? 'positive' : 'negative'}>
            {portfolio.totalReturn >= 0 ? '+' : ''}{portfolio.totalReturn.toFixed(2)}%
          </p>
        </div>
        <div className="stat-card">
          <h4>Today's Return</h4>
          <p className={portfolio.dailyReturn >= 0 ? 'positive' : 'negative'}>
            {portfolio.dailyReturn >= 0 ? '+' : ''}{portfolio.dailyReturn.toFixed(2)}%
          </p>
        </div>
        <div className="stat-card">
          <h4>Volatility</h4>
          <p>{portfolio.volatility.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
