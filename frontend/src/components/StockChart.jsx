import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * StockChart Component
 * 
 * Displays stock price charts using Recharts:
 * - Historical price data
 * - Portfolio value over time
 * - Individual stock performance
 * 
 * Props:
 * - data: array of {date, price} objects
 * - title: string
 */

const StockChart = ({ data, title = "Stock Price" }) => {
  // Sample data structure - replace with real data
  const sampleData = data || [
    { date: '2024-01-01', price: 150 },
    { date: '2024-01-02', price: 155 },
    { date: '2024-01-03', price: 148 },
    { date: '2024-01-04', price: 162 },
    { date: '2024-01-05', price: 170 },
  ];

  return (
    <div className="stock-chart-container">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#2563eb" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
