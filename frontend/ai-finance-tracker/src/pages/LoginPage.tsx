import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../Services/api.ts";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  .login-root {
    min-height: 100vh;
    background: #1c2820;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .login-root::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 80% 20%, rgba(61,207,182,0.08) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 10% 80%, rgba(244,162,58,0.06) 0%, transparent 60%);
    pointer-events: none;
  }

  .star {
    position: absolute;
    font-size: 28px;
    color: #f4a23a;
    opacity: 0.7;
    animation: spin 12s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .star-1 { top: 8%; left: 6%; animation-duration: 14s; font-size: 36px; }
  .star-2 { top: 15%; right: 8%; animation-duration: 10s; font-size: 22px; opacity: 0.5; }
  .star-3 { bottom: 12%; left: 10%; animation-duration: 18s; font-size: 18px; opacity: 0.4; }
  .star-4 { bottom: 20%; right: 5%; animation-duration: 8s; font-size: 30px; }

  .login-card {
    background: #243029;
    border: 1px solid rgba(61,207,182,0.15);
    border-radius: 20px;
    padding: 48px 44px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 24px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04);
    position: relative;
    z-index: 1;
    animation: fadeUp 0.5s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .login-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 36px;
  }

  .login-logo-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #3dcfb6, #2aaa95);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }

  .login-logo-text {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 18px;
    color: #e8f0ee;
    letter-spacing: -0.3px;
  }

  .login-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 28px;
    color: #e8f0ee;
    margin: 0 0 6px 0;
    letter-spacing: -0.5px;
  }

  .login-subtitle {
    font-size: 14px;
    color: #7a9e95;
    margin: 0 0 32px 0;
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

  .login-footer {
    margin-top: 24px;
    text-align: center;
    font-size: 14px;
    color: #7a9e95;
  }

  .login-footer span {
    color: #3dcfb6;
    cursor: pointer;
    font-weight: 500;
    transition: opacity 0.2s;
  }

  .login-footer span:hover { opacity: 0.8; text-decoration: underline; }

  .divider {
    height: 1px;
    background: rgba(61,207,182,0.1);
    margin: 24px 0;
  }
`;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-root">
        <span className="star star-1">✦</span>
        <span className="star star-2">✦</span>
        <span className="star star-3">✦</span>
        <span className="star star-4">✦</span>

        <div className="login-card">
          <div className="login-logo">
            <div className="login-logo-icon">💰</div>
            <span className="login-logo-text">ExpenseTracker</span>
          </div>

          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Sign in to your account to continue</p>

          {error && <div className="error-msg">⚠ {error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="field-group">
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
              {loading ? "Signing in..." : "Sign in →"}
            </button>
          </form>

          <div className="divider" />

          <div className="login-footer">
            Don't have an account?{" "}
            {/* ✅ FIX: Added missing signup navigation link */}
            <span onClick={() => navigate("/signup")}>Create one</span>
          </div>
        </div>
      </div>
    </>
  );
}