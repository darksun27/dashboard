import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { BASE_URI } from 'api/constants';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;
    let { token = null } = user;
    if (token) setisAuthenticated(true);
  }, []);

  const logout = () => {
    localStorage.clear();
    setisAuthenticated(false);
  };

  const signUp = async ({ email, password }) => {
    setisLoading(true);
    let data = new FormData();
    data.append('email', email);
    data.append('password', password);
    try {
      let {
        data: { token, type }
      } = await new Axios({
        method: 'POST',
        url: `${BASE_URI}/signup`,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
        data
      });
      localStorage.setItem(
        'user',
        JSON.stringify({
          token,
          type
        })
      );
      console.log(type);
      console.log('SignUp success');
      setisAuthenticated(true);
      return true;
    } catch (e) {
      console.log('SignUp Failed');
      console.log(e);
      return false;
    }
  };
  const signIn = async ({ email, password }) => {
    setisLoading(true);
    try {
      let data = new FormData();
      data.append('email', email);
      data.append('password', password);
      let {
        data: { token, type }
      } = await new Axios({
        method: 'POST',
        url: `${BASE_URI}/signin`,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
        data
      });
      localStorage.setItem(
        'user',
        JSON.stringify({
          token,
          type
        })
      );
      console.log(type);
      console.log('SignIn success');
      setisAuthenticated(true);
      return true;
    } catch (e) {
      console.log('SignIn Failed');
      console.log(e);
      return false;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setisAuthenticated,
        signUp,
        signIn,
        isLoading,
        logout
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
