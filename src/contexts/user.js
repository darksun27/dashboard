import React, { useState, useEffect } from 'react';
import { useAuth } from './auth';
import Axios from 'axios';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [isAdmin, setisAdmin] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [orders, setOrders] = useState(null);
  let { isAuthenticated } = useAuth();

  useEffect(() => {
    let user = localStorage.getItem('user');
    if (!user) return;
    let { token = null, type = null } = JSON.parse(user);
    console.log(type == 'admin', type);
    if (type == 'admin') setisAdmin(true);
    else setisAdmin(false);
    console.log(type);
  }, [isAuthenticated]);

  return (
    <UserContext.Provider
      value={{
        isAdmin,
        setisAdmin,
        isLoading,
        setisLoading,
        orders,
        setOrders
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
