# AI Finance Tracker

AI Finance Tracker is a full-stack expense tracking app built around a clean user flow: sign up, log in, add expenses, view spending patterns, and generate AI-powered monthly insights.

The project is split into three services:

- A React + Vite frontend for authentication and the dashboard experience
- A Node.js + Express backend for auth, expense APIs, and request protection
- A FastAPI + LangChain AI service for generating short financial summaries from stored expense data

## What This Project Delivers

### 1. Authentication and Protected Access

- User registration and login are implemented in the Node backend
- Passwords are hashed with `bcrypt` before storage
- Successful login returns a JWT signed with `JWT_SECRET`
- Protected API routes verify the bearer token through middleware
- The frontend stores the token in `localStorage`, attaches it automatically on API calls, and protects the dashboard route from unauthenticated access

### 2. User-Scoped Expense Tracking

- Expenses are stored per user using the `userId` from the decoded JWT
- Users can add new expenses with amount, category, date, and description
- Expense reads are filtered so each user only sees their own data
- Records are sorted by date, and the dashboard computes totals, monthly spend, transaction count, and category breakdowns

### 3. Rate Limiting for API Safety

- Expense routes are protected with a token-bucket rate limiter
- The limiter supports burst traffic while still slowing abusive repeated requests
- It uses `req.user.id` when a user is authenticated and falls back to IP otherwise
- Current configuration allows a burst of `10` requests with refill at `1 request/second`
- Stale limiter buckets are cleaned up automatically to reduce memory buildup

### 4. AI Financial Insights with LangChain

- The AI service is built with FastAPI and `langchain-google-genai`
- It fetches the logged-in user's expenses for a selected month and year directly from MongoDB
- Expense data is converted into a compact prompt and sent to `gemini-2.5-flash`
- The model returns a short summary with:
  - a spending pattern explanation
  - one actionable savings tip
- The prompt is intentionally constrained to stay concise, useful, and formatted for display in the dashboard
- The frontend renders the AI response in a styled insights panel and supports regeneration

### 5. Dashboard Experience

- Custom login and signup pages with a polished visual theme
- Protected dashboard with user greeting decoded from the JWT payload
- Summary cards for total spend, current month spend, transaction count, and active categories
- Category-based spending chart
- Recent expenses list
- Inline add-expense form
- AI insights card for monthly analysis

### 6. Containerized Multi-Service Setup

- A dedicated Dockerfile exists for each service
- The frontend is built with Vite and served through Nginx
- The backend runs as a Node service
- The AI service runs with Uvicorn on FastAPI
- A root `docker-compose.yml` ties the services together for multi-container deployment

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Axios

### Backend API

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt

### AI Service

- Python 3.11
- FastAPI
- LangChain
- Google Gemini (`gemini-2.5-flash`)
- PyMongo async client

## Architecture Overview

1. The user signs up or logs in through the frontend.
2. The Node backend hashes credentials, validates login, and issues a JWT.
3. The frontend stores the token and sends it in the `Authorization` header.
4. Protected expense routes validate the token and identify the user.
5. Expense records are stored and queried from MongoDB per user.
6. When the user requests an AI summary, the backend forwards the request to the FastAPI service.
7. The AI service fetches matching expenses, prompts Gemini through LangChain, and returns a short insight summary.

## Project Structure

```text
ai-finance-tracker/
|-- frontend/ai-finance-tracker/   # React + Vite client
|-- backend/                       # Express auth and expense API
|-- ai-backend/                    # FastAPI + LangChain AI service
|-- docker-compose.yml
`-- start.sh
```

## Main API Areas

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Expenses

- `GET /api/expenses`
- `POST /api/expenses/add`
- `GET /api/expenses/summary?month=<m>&year=<y>`

## Environment Variables

The repo uses environment files for service configuration.

### Backend

- `MONGODB_URI`
- `JWT_SECRET`
- `AIurl`

### AI Backend

- `MONGODB_URI`
- `GEMINIKEY`

### Frontend

- `VITE_API_URL`

## Local Development

### Frontend

```bash
cd frontend/ai-finance-tracker
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### AI Backend

```bash
cd ai-backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## Why This Project Stands Out

- It combines classic full-stack app building with an actual AI workflow instead of a placeholder chatbot
- Security basics are covered properly with password hashing, JWT auth, and protected routes
- Rate limiting is already built into the core expense API
- The app is structured as separate services, which makes it easier to scale and maintain
- The UI is not just functional; it also has a clear product feel with a custom-designed dashboard experience

## Current Scope

This version focuses on the strongest core flow:

- account creation and login
- protected expense tracking
- per-user data isolation
- monthly AI-generated spending insights
- multi-service deployment structure

It is a strong base for future additions like editing expenses, deleting expenses, recurring transactions, budget alerts, charts by month, and richer AI recommendations.
