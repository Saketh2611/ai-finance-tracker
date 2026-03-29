import Expense from "../Models/expenseModal.js";

// 📥 Fetch all expenses (This fixes the .map() error!)
export const getExpenses = async (req, res) => {
    try {
        // Later, you can filter this by user: Expense.find({ userId: req.user.id })
        const expenses = await Expense.find().sort({ date: -1 }); 
        
        // Return the array directly to React
        res.status(200).json(expenses); 
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expenses', error: error.message });
    }
};

// ➕ Add a new expense
export const addExpense = async (req, res) => {
    try {
        const { amount, category, date, description } = req.body;
        
        // ⚠️ Your schema requires a userId. 
        // If you aren't passing it from the frontend or an auth middleware yet, 
        // you must provide a fallback or it will fail to save.
        const userId = req.body.userId || "default-user-id"; 

        const newExpense = new Expense({ 
            userId, 
            amount, 
            category, 
            date, 
            description 
        });
        
        await newExpense.save();
        res.status(201).json({ message: 'Expense added successfully', expense: newExpense });
    } catch (error) {
        res.status(500).json({ message: 'Error adding expense', error: error.message });
    }
};