import React, { useState, useEffect } from 'react';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [isAdmin, setisAdmin] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    let user = localStorage.getItem('user');
    if (!user) return;
    let { token = null, type = null } = JSON.parse(user);
    if (type == 'admin') setisAdmin(true);
    else setisAdmin(false);
    console.log(type);
  }, []);

  return (
    <UserContext.Provider
      value={{ isAdmin, setisAdmin, isLoading, setisLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
