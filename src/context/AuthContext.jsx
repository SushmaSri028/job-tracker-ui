import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app load, restore user from localStorage if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await authApi.login({ email, password });
    localStorage.setItem('token', data.token);
    const userInfo = { email: data.email, fullName: data.fullName };
    localStorage.setItem('user', JSON.stringify(userInfo));
    setUser(userInfo);
    return data;
  };

  const register = async (email, password, fullName) => {
    const data = await authApi.register({ email, password, fullName });
    localStorage.setItem('token', data.token);
    const userInfo = { email: data.email, fullName: data.fullName };
    localStorage.setItem('user', JSON.stringify(userInfo));
    setUser(userInfo);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}