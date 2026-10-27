import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('Please complete all fields.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password should be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      await register(form);
      navigate('/discover');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="auth-brand">Curio</Link>
          <h1>Make room for wonder</h1>
          <p>Choose your interests and start finding fascinating threads.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Full name
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>

          <label>
            Email address
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>

          <label>
            Password
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </label>

          <label>
            Confirm password
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
          </label>

          {error && <div className="error-box">{error}</div>}

          <button type="submit" className="primary-button full-width" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
