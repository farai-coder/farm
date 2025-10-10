// AuthProvider.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types for the context state and actions
type AuthContextType = {
  isAuthenticated: boolean;
  userRole: string | null;
  userName: string | null;
  userId: string | null; // Changed from number to string to match API's user_id
  userEmail: string | null;
  farmId: string | null; // Added farmId
  login: (user_id: string, name: string, role: string, email: string, farm_id: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null); // Changed from number to string
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setEmail] = useState<string | null>(null);
  const [farmId, setFarmId] = useState<string | null>(null); // Added farmId state

  // The login function now takes user_id (string), name, role, email, and farm_id
  const login = (user_id: string, name: string, role: string, email: string, farm_id: string) => {
    setUserId(user_id);          // Set the user ID (now string)
    setUserName(name);           // Set the user name
    setUserRole(role);           // Set the user role
    setEmail(email);             // Set the user email
    setFarmId(farm_id);          // Set the farm ID
    setIsAuthenticated(true);    // Set the authentication status to true
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserId(null);
    setUserName(null);
    setEmail(null);
    setFarmId(null);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      userName,
      userId,
      userRole,
      userEmail,
      farmId,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};