import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { BASE_URI } from 'api/constants';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));
    let { token = null } = user;
    if (token) setisAuthenticated(true);
    else setisAuthenticated(false);
  }, []);

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
  const signIn = async () => {
    setisLoading(true);
    try {
      let { data } = await new Axios({
        method: 'POST',
        url: `${BASE_URI}/signup`
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setisAuthenticated,
        signUp,
        signIn,
        isLoading
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
