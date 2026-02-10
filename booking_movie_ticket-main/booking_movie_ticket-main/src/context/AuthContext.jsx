import { createContext, useState, useContext, useEffect } from 'react';
import { storage } from '../utils/localStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = storage.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const register = (email, password, name) => {
    const existingUser = storage.findUser(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: Date.now(),
      email,
      password,
      name,
      createdAt: new Date().toISOString()
    };

    storage.saveUser(newUser);
    return newUser;
  };

  const login = (email, password) => {
    const user = storage.findUser(email);
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    storage.setCurrentUser(user);
    setCurrentUser(user);
    return user;
  };

  const logout = () => {
    storage.logout();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
