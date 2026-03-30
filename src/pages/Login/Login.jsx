import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UtensilsCrossed } from 'lucide-react';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate a quick delay for realism
    await new Promise((r) => setTimeout(r, 400));

    const result = login(email, password);
    setLoading(false);

    if (result.success) {
      const routes = { admin: '/admin', waiter: '/waiter', kitchen: '/kitchen' };
      navigate(routes[result.role] || '/');
    } else {
      setError(result.message);
    }
  };

  const fillCredentials = (email, password) => {
    setEmail(email);
    setPassword(password);
    setError('');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-icon">
            <UtensilsCrossed strokeWidth={2.5} />
          </div>
          <h1>Resto YH</h1>
          <p>Sign in to continue</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}

          <div className="login-field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="login-field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
            id="login-submit-btn"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-hint">
          <p>Quick Access</p>
          <div
            className="login-hint-item"
            onClick={() => fillCredentials('admin@restoyh.com', 'admin@YH20')}
          >
            <span>Admin</span>
            <span>admin@restoyh.com</span>
          </div>
          <div
            className="login-hint-item"
            onClick={() => fillCredentials('waiter@restoyh.com', 'waiter@YH20')}
          >
            <span>Waiter</span>
            <span>waiter@restoyh.com</span>
          </div>
          <div
            className="login-hint-item"
            onClick={() => fillCredentials('kitchen@restoyh.com', 'kitchen@YH20')}
          >
            <span>Kitchen</span>
            <span>kitchen@restoyh.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
