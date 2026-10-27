import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('student_dashboard_token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveToken = (newToken) => {
    if (newToken) {
      localStorage.setItem('student_dashboard_token', newToken);
    } else {
      localStorage.removeItem('student_dashboard_token');
    }
    setToken(newToken);
  };

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/auth/me');
        setUser(response.user);
      } catch (error) {
        saveToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    saveToken(response.token);
    setUser(response.user);
    return response;
  };

  const register = async (data) => {
    const response = await api.post('/auth/register', data);
    saveToken(response.token);
    setUser(response.user);
    return response;
  };

  const logout = () => {
    saveToken(null);
    setUser(null);
  };

  const refreshProfile = async () => {
    if (!token) return null;
    const response = await api.get('/auth/me');
    setUser(response.user);
    return response.user;
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: Boolean(token && user),
      login,
      register,
      logout,
      refreshProfile
    }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
