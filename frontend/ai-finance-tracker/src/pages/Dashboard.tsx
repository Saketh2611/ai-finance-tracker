import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../Services/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; }

  .dash-root {
    min-height: 100vh;
    background: #1c2820;
    font-family: 'DM Sans', sans-serif;
    color: #e8f0ee;
  }

  /* NAV */
  .dash-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 32px;
    background: #243029;
    border-bottom: 1px solid rgba(61,207,182,0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .nav-logo-icon {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #3dcfb6, #2aaa95);
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }

  .nav-logo-text {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 17px;
    color: #e8f0ee;
    letter-spacing: -0.3px;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .nav-badge {
    background: rgba(61,207,182,0.12);
    border: 1px solid rgba(61,207,182,0.2);
    border-radius: 20px;
    padding: 5px 14px;
    font-size: 13px;
    color: #3dcfb6;
    font-weight: 500;
  }

  .btn-logout {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 9px;
    padding: 8px 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: #a0bcb5;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }

  .btn-logout:hover { background: rgba(255,80,80,0.1); color: #ff8080; border-color: rgba(255,80,80,0.2); }

  /* MAIN */
  .dash-main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 36px 32px;
  }

  .dash-header {
    margin-bottom: 32px;
    position: relative;
  }

  .dash-header .star {
    position: absolute;
    color: #f4a23a;
    font-size: 28px;
    right: 0;
    top: 0;
    animation: spin 12s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .dash-title {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 30px;
    color: #e8f0ee;
    margin: 0 0 4px 0;
    letter-spacing: -0.5px;
  }

  .dash-subtitle {
    font-size: 14px;
    color: #7a9e95;
  }

  /* STAT CARDS */
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    margin-bottom: 32px;
  }

  .stat-card {
    background: #243029;
    border: 1px solid rgba(61,207,182,0.12);
    border-radius: 16px;
    padding: 20px 22px;
    position: relative;
    overflow: hidden;
    animation: fadeUp 0.4s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .stat-card:nth-child(1) { animation-delay: 0.05s; }
  .stat-card:nth-child(2) { animation-delay: 0.1s; }
  .stat-card:nth-child(3) { animation-delay: 0.15s; }
  .stat-card:nth-child(4) { animation-delay: 0.2s; }

  .stat-card::before {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 80px; height: 80px;
    background: radial-gradient(ellipse at top right, rgba(61,207,182,0.08), transparent 70%);
  }

  .stat-label {
    font-size: 12px;
    color: #7a9e95;
    font-weight: 500;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .stat-value {
    font-family: 'Syne', sans-serif;
    font-size: 26px;
    font-weight: 700;
    color: #e8f0ee;
    line-height: 1;
    margin-bottom: 6px;
  }

  .stat-value.teal { color: #3dcfb6; }
  .stat-value.amber { color: #f4a23a; }

  .stat-change {
    font-size: 12px;
    color: #7a9e95;
  }

  /* LAYOUT GRID */
  .content-grid {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 20px;
    margin-bottom: 24px;
  }

  @media (max-width: 900px) {
    .content-grid { grid-template-columns: 1fr; }
  }

  /* CARD */
  .card {
    background: #243029;
    border: 1px solid rgba(61,207,182,0.12);
    border-radius: 16px;
    padding: 24px;
    animation: fadeUp 0.4s ease both;
    animation-delay: 0.25s;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .card-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 16px;
    color: #e8f0ee;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .card-title .star-sm {
    color: #f4a23a;
    font-size: 14px;
  }

  /* ADD EXPENSE FORM */
  .add-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .add-form .full { grid-column: 1 / -1; }

  .field-label {
    font-size: 11px;
    font-weight: 500;
    color: #7a9e95;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-bottom: 5px;
    display: block;
  }

  .field-input, .field-select {
    width: 100%;
    background: #1c2820;
    border: 1.5px solid rgba(61,207,182,0.15);
    border-radius: 9px;
    padding: 11px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #e8f0ee;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .field-input::placeholder { color: #4a6b62; }
  .field-input:focus, .field-select:focus {
    border-color: #3dcfb6;
    box-shadow: 0 0 0 3px rgba(61,207,182,0.1);
  }

  .field-select option { background: #243029; }

  .btn-add {
    grid-column: 1 / -1;
    background: linear-gradient(135deg, #3dcfb6, #2aaa95);
    border: none;
    border-radius: 9px;
    padding: 12px;
    font-family: 'Syne', sans-serif;
    font-weight: 600;
    font-size: 14px;
    color: #1c2820;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
  }

  .btn-add:hover { opacity: 0.9; transform: translateY(-1px); }

  /* BAR CHART */
  .bar-chart {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    height: 120px;
    padding-bottom: 4px;
  }

  .bar-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    gap: 4px;
  }

  .bar {
    width: 100%;
    border-radius: 5px 5px 0 0;
    transition: opacity 0.2s;
    min-height: 4px;
  }

  .bar:hover { opacity: 0.8; }

  .bar-label {
    font-size: 10px;
    color: #7a9e95;
    text-align: center;
    white-space: nowrap;
  }

  /* CATEGORY DOTS */
  .cat-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* EXPENSE LIST */
  .expense-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 360px;
    overflow-y: auto;
  }

  .expense-list::-webkit-scrollbar { width: 4px; }
  .expense-list::-webkit-scrollbar-track { background: transparent; }
  .expense-list::-webkit-scrollbar-thumb { background: rgba(61,207,182,0.2); border-radius: 4px; }

  .expense-item {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #1c2820;
    border: 1px solid rgba(61,207,182,0.08);
    border-radius: 10px;
    padding: 12px 14px;
    transition: border-color 0.2s;
  }

  .expense-item:hover { border-color: rgba(61,207,182,0.2); }

  .expense-icon {
    width: 36px;
    height: 36px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }

  .expense-info { flex: 1; min-width: 0; }

  .expense-cat {
    font-size: 13px;
    font-weight: 500;
    color: #e8f0ee;
    margin-bottom: 2px;
  }

  .expense-desc {
    font-size: 11px;
    color: #7a9e95;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .expense-right { text-align: right; flex-shrink: 0; }

  .expense-amount {
    font-family: 'Syne', sans-serif;
    font-weight: 600;
    font-size: 15px;
    color: #3dcfb6;
  }

  .expense-date { font-size: 11px; color: #7a9e95; }

  .empty-state {
    text-align: center;
    padding: 40px 0;
    color: #7a9e95;
    font-size: 14px;
  }

  .empty-icon { font-size: 36px; margin-bottom: 10px; }

  /* SUMMARY SECTION */
  .summary-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .summary-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid rgba(61,207,182,0.06);
  }

  .summary-row:last-child { border-bottom: none; }

  .summary-left {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: #a0bcb5;
  }

  .summary-amount {
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #e8f0ee;
  }
`;

const CATEGORY_CONFIG: Record<string, { icon: string; color: string; bg: string }> = {
  Food:     { icon: "🍜", color: "#3dcfb6", bg: "rgba(61,207,182,0.12)" },
  Travel:   { icon: "✈️", color: "#f4a23a", bg: "rgba(244,162,58,0.12)" },
  Shopping: { icon: "🛍️", color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
  Bills:    { icon: "📄", color: "#fb923c", bg: "rgba(251,146,60,0.12)" },
  Other:    { icon: "📦", color: "#94a3b8", bg: "rgba(148,163,184,0.12)" },
};

export default function Dashboard() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(""); // ✅ added
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/"); return; }

    // ✅ Decode JWT payload (base64) — no extra API call needed
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserName(payload.name || payload.email || "User");
    } catch {
      setUserName("User");
    }

    fetchExpenses();
  }, []);

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

  const handleAddExpense = async (e: any) => {
    e.preventDefault();
    try {
      await API.post("/expenses/add", { amount: Number(amount), category, description });
      setAmount("");
      setDescription("");
      fetchExpenses();
    } catch (err) {
      console.error("Error adding expense", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Derived stats
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const thisMonth = expenses.filter(e => {
    const d = new Date(e.date);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).reduce((sum, e) => sum + e.amount, 0);

  const byCat: Record<string, number> = {};
  expenses.forEach(e => { byCat[e.category] = (byCat[e.category] || 0) + e.amount; });
  const maxCat = Math.max(...Object.values(byCat), 1);

  const categories = ["Food", "Travel", "Shopping", "Bills", "Other"];

  return (
    <>
      <style>{styles}</style>
      <div className="dash-root">

        {/* NAV */}
        <nav className="dash-nav">
          <div className="nav-logo">
            <div className="nav-logo-icon">💰</div>
            <span className="nav-logo-text">ExpenseTracker</span>
          </div>
          <div className="nav-right">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: 'linear-gradient(135deg, #3dcfb6, #2aaa95)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: 13, color: '#1c2820', flexShrink: 0
              }}>
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="nav-badge">{userName}</span>
            </div>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </div>
        </nav>

        <main className="dash-main">

          {/* HEADER */}
          <div className="dash-header">
            <span className="star">✦</span>
            <h1 className="dash-title">Hey, {userName.split(" ")[0]} 👋</h1>
            <p className="dash-subtitle">Track, categorize, and understand your spending</p>
          </div>

          {/* STAT CARDS */}
          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-label">Total Spent</div>
              <div className="stat-value teal">₹{total.toLocaleString()}</div>
              <div className="stat-change">All time</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">This Month</div>
              <div className="stat-value">₹{thisMonth.toLocaleString()}</div>
              <div className="stat-change">Current month</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Transactions</div>
              <div className="stat-value amber">{expenses.length}</div>
              <div className="stat-change">Total records</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Categories</div>
              <div className="stat-value">{Object.keys(byCat).length}</div>
              <div className="stat-change">Active buckets</div>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="content-grid">

            {/* LEFT: Expense List */}
            <div>
              <div className="card">
                <div className="card-header">
                  <div className="card-title">
                    <span className="star-sm">✦</span> Recent Expenses
                  </div>
                  <span style={{ fontSize: 12, color: '#7a9e95' }}>{expenses.length} records</span>
                </div>

                {loading ? (
                  <div className="empty-state"><div className="empty-icon">⏳</div>Loading...</div>
                ) : expenses.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">📭</div>
                    No expenses yet. Add your first one!
                  </div>
                ) : (
                  <div className="expense-list">
                    {[...expenses].reverse().map((exp) => {
                      const conf = CATEGORY_CONFIG[exp.category] || CATEGORY_CONFIG.Other;
                      return (
                        <div className="expense-item" key={exp._id}>
                          <div className="expense-icon" style={{ background: conf.bg }}>
                            {conf.icon}
                          </div>
                          <div className="expense-info">
                            <div className="expense-cat">{exp.category}</div>
                            <div className="expense-desc">{exp.description || "—"}</div>
                          </div>
                          <div className="expense-right">
                            <div className="expense-amount">₹{exp.amount.toLocaleString()}</div>
                            <div className="expense-date">{new Date(exp.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Add Form + Charts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Add Expense */}
              <div className="card">
                <div className="card-header">
                  <div className="card-title">
                    <span className="star-sm">✦</span> Add Expense
                  </div>
                </div>
                <form onSubmit={handleAddExpense}>
                  <div className="add-form">
                    <div>
                      <label className="field-label">Amount (₹)</label>
                      <input
                        className="field-input"
                        type="number"
                        placeholder="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="field-label">Category</label>
                      <select
                        className="field-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        {categories.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="full">
                      <label className="field-label">Description</label>
                      <input
                        className="field-input"
                        type="text"
                        placeholder="What was this for?"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <button className="btn-add" type="submit">+ Add Expense</button>
                  </div>
                </form>
              </div>

              {/* Spending by Category Chart */}
              <div className="card">
                <div className="card-header">
                  <div className="card-title">
                    <span className="star-sm">✦</span> Spending by Category
                  </div>
                </div>
                <div className="bar-chart">
                  {categories.map(cat => {
                    const val = byCat[cat] || 0;
                    const conf = CATEGORY_CONFIG[cat];
                    const pct = (val / maxCat) * 100;
                    return (
                      <div className="bar-group" key={cat}>
                        <div
                          className="bar"
                          style={{
                            height: `${Math.max(pct, 4)}%`,
                            background: `linear-gradient(180deg, ${conf.color}, ${conf.color}99)`,
                          }}
                          title={`${cat}: ₹${val}`}
                        />
                        <span className="bar-label">{cat.slice(0, 4)}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Expense Summary */}
                <div style={{ marginTop: 20, borderTop: '1px solid rgba(61,207,182,0.08)', paddingTop: 16 }}>
                  <div style={{ fontSize: 12, color: '#7a9e95', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 12 }}>Expense Summary</div>
                  <div className="summary-list">
                    {categories.filter(c => byCat[c]).map(cat => {
                      const conf = CATEGORY_CONFIG[cat];
                      return (
                        <div className="summary-row" key={cat}>
                          <div className="summary-left">
                            <div className="cat-dot" style={{ background: conf.color }} />
                            {cat}
                          </div>
                          <div className="summary-amount">₹{(byCat[cat] || 0).toLocaleString()}</div>
                        </div>
                      );
                    })}
                    {Object.keys(byCat).length === 0 && (
                      <div style={{ fontSize: 13, color: '#7a9e95', textAlign: 'center', padding: '8px 0' }}>No data yet</div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </>
  );
}