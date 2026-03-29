import express from "express";
import { addExpense, getExpenses } from "../Controllers/expenseContoller.js"; 

const router = express.Router();

// Route to get the array of expenses
router.get('/', getExpenses);

// Route to add a new expense
router.post('/add', addExpense);

export default router;