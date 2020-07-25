import React, { useState } from 'react';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [isAdmin, setisAdmin] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  return (
    <UserContext.Provider
      value={{ isAdmin, setisAdmin, isLoading, setisLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
