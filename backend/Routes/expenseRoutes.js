import express from "express";
import { addExpense, getExpenses } from "../Controllers/expenseContoller.js";
import authMiddleware from "../Middlewares/authMiddleware.js"; // ✅ import auth guard

const router = express.Router();

// ✅ Both routes are now protected — authMiddleware runs first,
//    verifies the JWT, and attaches req.user before the controller runs
router.get("/", authMiddleware, getExpenses);
router.post("/add", authMiddleware, addExpense);

export default router;