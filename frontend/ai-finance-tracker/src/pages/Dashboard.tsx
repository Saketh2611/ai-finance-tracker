import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../Services/api";

export default function Dashboard() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // 🔐 Check auth
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      fetchExpenses();
    }
  }, []);

  // 📥 Fetch expenses
  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses");
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching expenses", err);
    } finally {
      setLoading(false);
    }
  };

  // ➕ Add expense
  const handleAddExpense = async (e: any) => {
    e.preventDefault();

    try {
      await API.post("/expenses/add", {
        amount: Number(amount),
        category,
        description,
      });

      setAmount("");
      setDescription("");

      fetchExpenses(); // refresh list
    } catch (err) {
      console.error("Error adding expense", err);
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* 🔥 Navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>💰 Expense Tracker</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* ➕ Add Expense */}
      <form onSubmit={handleAddExpense} style={{ marginBottom: "20px" }}>
        <h3>Add Expense</h3>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Other</option>
        </select>

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>

      {/* 📊 Expense List */}
      <h3>Your Expenses</h3>

      {loading ? (
        <p>Loading...</p>
      ) : expenses.length === 0 ? (
        <p>No expenses yet</p>
      ) : (
        <div>
          {expenses.map((exp) => (
            <div
              key={exp._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <strong>₹{exp.amount}</strong> - {exp.category}
              <br />
              <small>{exp.description}</small>
              <br />
              <small>{new Date(exp.date).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}