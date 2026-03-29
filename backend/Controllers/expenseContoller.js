import Expense from "../Models/expenseModal.js";

// 📥 Fetch only the logged-in user's expenses
export const getExpenses = async (req, res) => {
  try {
    // ✅ Filter by req.user.id — set by authMiddleware from the JWT
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses", error: error.message });
  }
};

// ➕ Add a new expense — tagged to the logged-in user
export const addExpense = async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;

    // ✅ userId comes from the JWT via authMiddleware — never trust the frontend to send this
    const newExpense = new Expense({
      userId: req.user.id,
      amount,
      category,
      date,
      description,
    });

    await newExpense.save();
    res.status(201).json({ message: "Expense added successfully", expense: newExpense });
  } catch (error) {
    res.status(500).json({ message: "Error adding expense", error: error.message });
  }
};