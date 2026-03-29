import express from "express";
import { addExpense, expenseSummary, getExpenses } from "../Controllers/expenseContoller.js";
import { createRateLimiter } from "../Middlewares/ratelimiting.js";
import authMiddleware from "../Middlewares/authMiddleware.js"; // ✅ import auth guard

const router = express.Router();
const rateLimiter = createRateLimiter(10, 1); // Example: 10 requests burst, replenishing at 1 req/sec

// ✅ Both routes are now protected — authMiddleware runs first,
//    verifies the JWT, and attaches req.user before the controller runs
router.get("/", authMiddleware, rateLimiter, getExpenses);
router.post("/add", authMiddleware, rateLimiter, addExpense);
router.get("/summary", authMiddleware, rateLimiter, expenseSummary);

export default router;