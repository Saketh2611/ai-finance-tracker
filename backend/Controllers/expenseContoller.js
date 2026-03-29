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

// 🤖 Get AI Summary
export const expenseSummary = async (req, res) => {
  try {
    const { month, year } = req.query;
    const userId = req.user.id; 

    // Added 'const'
    const aiUrl = process.env.AIurl;

    if (!month || !year) {
      return res.status(400).json({ message: "Month and year are required" });
    }

    // Node fetch is a GET request, which aligns with the updated FastAPI route
    const response = await fetch(`${aiUrl}/summarize-expenses?id=${userId}&month=${month}&year=${year}`);
    console.log("AI response status:", response.status); // 🔥 ADD
    console.log("AI response headers:", response.headers); // 🔥 ADD
    if (!response.ok) {
        throw new Error(`AI service failed with status ${response.status}`);
    }

    const data = await response.json();
    
    // Send back just the summary text to the frontend
    res.status(200).json({ summary: data.summary });
    
  } catch (error) {
    res.status(500).json({ message: "Error fetching expense summary", error: error.message });
  }
};