import React, { createContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  setUser: () => {}
});

const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [token, setTokenState] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadTokenFromLocalStorage = async () => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          const response = await api.get('/api/me');
          if (response.data) {
            setUserState(response.data.user);
            setTokenState(storedToken);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("authToken");
            setUserState(null);
            setTokenState(null);
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          localStorage.removeItem("authToken");
          setUserState(null);
          setTokenState(null);
          setIsAuthenticated(false);
        }
      }
    };

    loadTokenFromLocalStorage();
  }, []);

  const login = (userData, tokenValue) => {
    try {
      localStorage.setItem("authToken", JSON.stringify(tokenValue));
      setTokenState(tokenValue);
      setUserState(userData);
      setIsAuthenticated(true);
      api.defaults.headers.common['Authorization'] = `Bearer ${tokenValue}`;
    } catch (error) {
      console.error("Error saving token to localStorage:", error);
      setUserState(null);
      setTokenState(null);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("authToken");
      setUserState(null);
      setTokenState(null);
      setIsAuthenticated(false);
      delete api.defaults.headers.common['Authorization'];
    } catch (error) {
      console.error("Error removing token from localStorage:", error);
    }
  };

  const setUser = (newUser) => {
    if (typeof newUser === 'object' || newUser === null) {
      setUserState(newUser);
    } else {
      console.error("setUser expects an object or null");
    }
  };

  const value = {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    setUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;