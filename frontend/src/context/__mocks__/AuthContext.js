import React, { useState, useContext } from "react";

const AuthContext = React.createContext();

const mockAuthContext = {
  user: null,
  isAuthenticated: false,
  login: jest.fn((userData) => {
    mockAuthContext.user = userData;
    mockAuthContext.isAuthenticated = true;
  }),
  logout: jest.fn(() => {
    mockAuthContext.user = null;
    mockAuthContext.isAuthenticated = false;
  }),
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(mockAuthContext.user);
  const [isAuthenticated, setIsAuthenticated] = useState(
    mockAuthContext.isAuthenticated
  );

  mockAuthContext.login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    mockAuthContext.user = userData;
    mockAuthContext.isAuthenticated = true;
  };

  mockAuthContext.logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    mockAuthContext.user = null;
    mockAuthContext.isAuthenticated = false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login: mockAuthContext.login,
        logout: mockAuthContext.logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, AuthContext, useAuth, mockAuthContext as defaul
