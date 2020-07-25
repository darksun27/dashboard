import React, { useState } from 'react';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const login = async () => {
    setisLoading(true);
    try {
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setisAuthenticated, login, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
