import React, { useState, useEffect } from 'react';
import Tree from './components/Tree';
import Portfolio from './components/Portfolio';
import StockChart from './components/StockChart';

/**
 * Dashboard Component
 * 
 * Main dashboard that combines:
 * - Tree visualization
 * - Portfolio management
 * - Stock charts
 * - Market overview
 */

const Dashboard = () => {
  const [portfolioData, setPortfolioData] = useState({
    startValue: 10000,
    currentValue: 10000,
    dailyReturn: 0,
    totalReturn: 0,
    volatility: 2
  });

  // TODO: Fetch real portfolio data from backend
  useEffect(() => {
    // Fetch portfolio data
    // fetch('/api/portfolio')
    //   .then(res => res.json())
    //   .then(data => setPortfolioData(data));
  }, []);

  return (
    <div className="dashboard">
      <header>
        <h1>🌳 MoneyTree</h1>
        <p>Watch your portfolio grow</p>
      </header>

      <main className="dashboard-grid">
        <section className="tree-section">
          <Tree 
            portfolioValue={portfolioData.currentValue}
            startValue={portfolioData.startValue}
            dailyReturn={portfolioData.dailyReturn}
            totalReturn={portfolioData.totalReturn}
            volatility={portfolioData.volatility}
          />
        </section>

        <section className="portfolio-section">
          <Portfolio />
        </section>

        <section className="charts-section">
          <StockChart title="Portfolio Performance" />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
