import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import { expense } from './Controllers/expenseContoller.js';
import { connectDB } from './config/db.js';
const app = express();

app.use(cors());
app.use(bodyParser.json());
connectDB();

app.post('/api/expenses', expense);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
