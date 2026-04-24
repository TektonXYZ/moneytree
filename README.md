# MoneyTree - Stock Portfolio Simulator with Tree Visualization

> Watch your portfolio grow as a beautiful, animated tree!

[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org)
[![Express](https://img.shields.io/badge/Express-4+-green.svg)](https://expressjs.com)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black.svg)](https://vercel.com)

## 🌳 Concept

MoneyTree is a stock portfolio simulator where your investment performance is visualized as a living tree:
- **Portfolio gains** → Tree grows, leaves flourish
- **Portfolio losses** → Tree shrinks, leaves wither
- **Volatility** → Tree sways more
- **Diversification** → More branches

## 🏗️ Architecture

```
moneytree/
├── frontend/          # React app (Vercel)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Tree.jsx        # Animated tree visualization
│   │   │   ├── Portfolio.jsx   # Portfolio management
│   │   │   ├── StockChart.jsx  # Recharts stock graphs
│   │   │   └── Dashboard.jsx   # Main dashboard
│   │   └── App.jsx
│   └── package.json
├── backend/           # Express API (Vercel Functions)
│   ├── api/
│   │   ├── stock.js   # Finnhub stock data proxy
│   │   └── portfolio.js # Portfolio CRUD
│   └── package.json
└── vercel.json        # Vercel deployment config
```

## 🚀 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 | UI components |
| **Animation** | Framer Motion | Tree animations |
| **Charts** | Recharts | Portfolio graphs |
| **Backend** | Express.js | API routes |
| **Database** | SQLite/JSON | Portfolio storage |
| **Stocks** | Finnhub API | Real-time stock data |
| **Deploy** | Vercel | Hosting |

## 📁 Project Structure

- `frontend/` - React application with tree visualization
- `backend/` - Express API with Finnhub integration
- `vercel.json` - Serverless function configuration

## 🔐 Security

- **API keys stored in `.env`** - Never committed to Git
- **Backend proxies all stock API calls** - Keys hidden from frontend
- **Rate limiting** - Prevents API abuse

## 🛠️ Development

### Prerequisites
- Node.js 18+
- Finnhub API key (free tier)

### Setup

```bash
# 1. Clone repo
git clone https://github.com/TektonXYZ/moneytree.git
cd moneytree

# 2. Install frontend dependencies
cd frontend
npm install
cd ..

# 3. Install backend dependencies
cd backend
npm install
cd ..

# 4. Create environment file
echo "FINNHUB_API_KEY=your_key_here" > backend/.env

# 5. Run locally
npm run dev
```

### Environment Variables

Create `backend/.env`:
```
FINNHUB_API_KEY=your_finnhub_api_key
```

## 📊 Features

- ✅ Real-time stock price lookup
- ✅ Virtual portfolio with buy/sell
- ✅ Animated tree that reacts to P&L
- ✅ Portfolio performance charts
- ✅ Historical trade tracking

## 🌐 Deployment

**Frontend:** Vercel (auto-deploy on push)
**Backend:** Vercel Functions (serverless)

```bash
# Deploy to Vercel
vercel --prod
```

## 📄 License

MIT License - see LICENSE

---

**Built with ❤️ by Tekton**

## Development Progress

- Backend API: 80% complete
- Frontend components: 75% complete
- Integration testing: In progress

Last commit: 2026-04-18

## Daily Progress

2026-04-23: Backend API refinements and frontend component updates.
