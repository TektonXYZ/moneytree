import React from 'react';
import { motion } from 'framer-motion';

/**
 * Tree Component
 * 
 * Animated tree visualization that reacts to portfolio performance:
 * - Portfolio up: Tree grows, leaves flourish (green)
 * - Portfolio down: Tree shrinks, leaves wither (red/brown)
 * - High volatility: Tree sways more
 * - Diversification: More branches
 * 
 * Props:
 * - portfolioValue: number (current portfolio value)
 * - startValue: number (initial investment)
 * - dailyReturn: number (today's return %)
 * - totalReturn: number (total return %)
 * - volatility: number (portfolio volatility)
 */

const Tree = ({ portfolioValue, startValue, dailyReturn, totalReturn, volatility }) => {
  // Calculate tree health metrics
  const growthRatio = portfolioValue / startValue;
  const isPositive = totalReturn >= 0;
  
  // Tree dimensions based on performance
  const trunkWidth = 20 + (growthRatio - 1) * 10;
  const treeHeight = 200 + (growthRatio - 1) * 50;
  const leafCount = isPositive ? 50 + Math.floor(totalReturn * 2) : 20;
  const leafColor = isPositive ? '#22c55e' : '#ef4444';
  
  // Animation speed based on volatility
  const swayDuration = volatility > 5 ? 1 : volatility > 2 ? 2 : 3;

  return (
    <div className="tree-container">
      {/* TODO: Implement tree visualization with Framer Motion */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
        className="tree-placeholder"
      >
        <h2>🌳 MoneyTree</h2>
        <p>Portfolio: ${portfolioValue?.toFixed(2)}</p>
        <p>Return: {totalReturn?.toFixed(2)}%</p>
        <p>Tree size: {trunkWidth.toFixed(0)}px trunk, {leafCount} leaves</p>
        <p>Health: {isPositive ? 'Growing 🌱' : 'Withering 🍂'}</p>
      </motion.div>
    </div>
  );
};

export default Tree;
