import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

interface User {
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (userData: any, tokenValue: string) => void;
  logout: () => void;
  setUser: (newUser: User | null) => void;
}

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default useAuth;

// This hook simplifies access to the authentication context, improving code readability and maintainability.