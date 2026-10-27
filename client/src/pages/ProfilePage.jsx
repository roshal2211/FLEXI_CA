import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function ProfilePage() {
  const { user, refreshProfile } = useAuth();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setName(user?.name || '');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim()) {
      setError('Name is required.');
      return;
    }

    setLoading(true);

    try {
      await api.put('/auth/profile', { name: name.trim() });
      await refreshProfile();
      setSuccess('Profile updated successfully.');
    } catch (err) {
      setError(err.message || 'Unable to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <header className="page-header">
        <div>
          <p className="caption">Account information</p>
          <h1>Profile</h1>
        </div>
      </header>

      <div className="profile-grid">
        <div className="panel-card">
          <h3>Personal details</h3>
          <div className="profile-info-list">
            <div>
              <span>Name</span>
              <strong>{user?.name || 'Student'}</strong>
            </div>
            <div>
              <span>Email</span>
              <strong>{user?.email || 'Not available'}</strong>
            </div>
            <div>
              <span>Member since</span>
              <strong>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</strong>
            </div>
          </div>
        </div>

        <div className="panel-card">
          <h3>Update profile</h3>
          <form className="profile-form" onSubmit={handleSubmit}>
            <label>
              Full name
              <input value={name} onChange={(e) => setName(e.target.value)} required />
            </label>

            {error && <div className="error-box">{error}</div>}
            {success && <div className="success-box">{success}</div>}

            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? 'Saving...' : 'Save changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
