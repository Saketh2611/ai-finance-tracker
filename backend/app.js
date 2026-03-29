import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import expenseRoutes from './Routes/expenseRoutes.js';
import authRoutes from './Routes/authRoutes.js';   // ✅ NEW
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
console.log("app.js initialized");

// ✅ Middlewares
app.use(cors());
app.use(express.json()); // 🔥 instead of bodyParser
console.log("Middlewares set up");

// ✅ Connect DB
connectDB();
console.log("Database connection established");

// ✅ Routes
app.use('/api/auth', authRoutes);     
console.log("Auth routes initialized",authRoutes);   // 🔥 NEW (login/register)
app.use('/api/expenses', expenseRoutes); // existing
console.log("Expense routes initialized",expenseRoutes); // 🔥 NEW (added log for routes)

// ✅ Health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ❗ Optional: Global error handler (good practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});