import { createContext, useContext, useState, useCallback } from 'react';
import api from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('restoYH_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback(async (email, password) => {
    try {
      const response = await api.post('/login', {
        email,
        password,
      });

      const token = response.data.token;
      const userData = response.data.user;

      localStorage.setItem('token', token);
      localStorage.setItem('restoYH_user', JSON.stringify(userData));

      setUser(userData);

      return {
        success: true,
        role: userData.role,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('restoYH_user');
    localStorage.removeItem('token');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}