import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../Services/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  .signup-root {
    min-height: 100vh;
    background: #1c2820;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .signup-root::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 50% 60% at 20% 30%, rgba(61,207,182,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 85% 75%, rgba(244,162,58,0.06) 0%, transparent 60%);
    pointer-events: none;
  }

  .star {
    position: absolute;
    color: #f4a23a;
    opacity: 0.7;
    animation: spin 12s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .star-a { top: 6%; right: 9%; font-size: 32px; animation-duration: 11s; }
  .star-b { bottom: 10%; left: 7%; font-size: 24px; animation-duration: 16s; opacity: 0.5; }
  .star-c { top: 40%; left: 3%; font-size: 16px; animation-duration: 9s; opacity: 0.4; }
  .star-d { bottom: 25%; right: 4%; font-size: 20px; animation-duration: 20s; }

  .signup-card {
    background: #243029;
    border: 1px solid rgba(61,207,182,0.15);
    border-radius: 20px;
    padding: 44px 44px;
    width: 100%;
    max-width: 440px;
    box-shadow: 0 24px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04);
    position: relative;
    z-index: 1;
    animation: fadeUp 0.5s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .signup-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 32px;
  }

  .signup-logo-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #3dcfb6, #2aaa95);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }

  .signup-logo-text {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 18px;
    color: #e8f0ee;
    letter-spacing: -0.3px;
  }

  .signup-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 26px;
    color: #e8f0ee;
    margin: 0 0 6px 0;
    letter-spacing: -0.5px;
  }

  .signup-subtitle {
    font-size: 14px;
    color: #7a9e95;
    margin: 0 0 28px 0;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(61,207,182,0.1);
    border: 1px solid rgba(61,207,182,0.2);
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 12px;
    color: #3dcfb6;
    font-weight: 500;
    margin-bottom: 20px;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-bottom: 24px;
  }

  .field-label {
    font-size: 12px;
    font-weight: 500;
    color: #7a9e95;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-bottom: 6px;
    display: block;
  }

  .field-input {
    width: 100%;
    background: #1c2820;
    border: 1.5px solid rgba(61,207,182,0.15);
    border-radius: 10px;
    padding: 13px 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    color: #e8f0ee;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }

  .field-input::placeholder { color: #4a6b62; }

  .field-input:focus {
    border-color: #3dcfb6;
    box-shadow: 0 0 0 3px rgba(61,207,182,0.12);
  }

  .error-msg {
    background: rgba(255,80,80,0.1);
    border: 1px solid rgba(255,80,80,0.2);
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 13px;
    color: #ff8080;
    margin-bottom: 16px;
  }

  .success-msg {
    background: rgba(61,207,182,0.1);
    border: 1px solid rgba(61,207,182,0.2);
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 13px;
    color: #3dcfb6;
    margin-bottom: 16px;
  }

  .btn-primary {
    width: 100%;
    background: linear-gradient(135deg, #3dcfb6, #2aaa95);
    border: none;
    border-radius: 10px;
    padding: 14px;
    font-family: 'Syne', sans-serif;
    font-weight: 600;
    font-size: 15px;
    color: #1c2820;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
    letter-spacing: 0.2px;
  }

  .btn-primary:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

  .divider {
    height: 1px;
    background: rgba(61,207,182,0.1);
    margin: 24px 0;
  }

  .signup-footer {
    text-align: center;
    font-size: 14px;
    color: #7a9e95;
  }

  .signup-footer span {
    color: #3dcfb6;
    cursor: pointer;
    font-weight: 500;
    transition: opacity 0.2s;
  }

  .signup-footer span:hover { opacity: 0.8; text-decoration: underline; }

  .perks {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }

  .perk {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: #7a9e95;
  }

  .perk-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #3dcfb6;
    flex-shrink: 0;
  }
`;

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await API.post("/auth/register", { name, email, password });
      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => navigate("/"), 1500);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="signup-root">
        <span className="star star-a">✦</span>
        <span className="star star-b">✦</span>
        <span className="star star-c">✦</span>
        <span className="star star-d">✦</span>

        <div className="signup-card">
          <div className="signup-logo">
            <div className="signup-logo-icon">💰</div>
            <span className="signup-logo-text">ExpenseTracker</span>
          </div>

          <div className="badge">✦ Free to get started</div>

          <h1 className="signup-title">Create your account</h1>
          <p className="signup-subtitle">Join thousands tracking smarter</p>

          <div className="perks">
            <div className="perk"><div className="perk-dot" />Track expenses</div>
            <div className="perk"><div className="perk-dot" />Visual reports</div>
            <div className="perk"><div className="perk-dot" />Category insights</div>
          </div>

          {error && <div className="error-msg">⚠ {error}</div>}
          {success && <div className="success-msg">✓ {success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <div>
                <label className="field-label">Full Name</label>
                <input
                  className="field-input"
                  type="text"
                  placeholder="Saketh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="field-label">Email</label>
                <input
                  className="field-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="field-label">Password</label>
                <input
                  className="field-input"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Create account →"}
            </button>
          </form>

          <div className="divider" />

          <div className="signup-footer">
            Already have an account?{" "}
            <span onClick={() => navigate("/")}>Sign in</span>
          </div>
        </div>
      </div>
    </>
  );
}