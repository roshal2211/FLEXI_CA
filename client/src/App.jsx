import { Link, Navigate, NavLink, Outlet, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import DiscoverPage from './pages/DiscoverPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import SavedTopicsPage from './pages/SavedTopicsPage';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="app-loading">Loading your workspace...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppLayout() {
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Discover', to: '/discover' },
    { label: 'Saved', to: '/saved' },
    { label: 'Profile', to: '/profile' }
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <h2>Curio</h2>
        </div>

        <nav className="side-nav">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-user">
          <div className="sidebar-user-details">
            <span className="sidebar-avatar">{user?.name?.charAt(0).toUpperCase() || 'S'}</span>
            <div>
              <strong>{user?.name || 'Student'}</strong>
              <small>Student account</small>
            </div>
          </div>
          <button className="logout-button" onClick={logout}>Logout</button>
        </div>
      </aside>

      <main className="main-panel">
        <div className="mobile-topbar">
          <Link to="/discover" className="mobile-brand">
            <strong>Curio</strong>
          </Link>
          <button className="logout-button mobile-logout" onClick={logout}>Logout</button>
        </div>
        <nav className="mobile-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/discover" replace /> : <LandingPage />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/discover" replace /> : <LoginPage />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/discover" replace /> : <RegisterPage />} />
      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/saved" element={<SavedTopicsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="/dashboard" element={<Navigate to="/discover" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
