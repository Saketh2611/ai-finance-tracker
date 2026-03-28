export const expense = async (req, res) => {
    try {
        const { amount, category, date, description } = req.body;
        // Here you would typically save the expense to a database
        res.status(201).json({ message: 'Expense added successfully', expense: { amount, category, date, description } });
    } catch (error) {
        res.status(500).json({ message: 'Error adding expense', error: error.message });
    }
};