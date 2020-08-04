import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { BASE_URI } from 'api/constants';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [hasErrorLogin, setHasErrorLogin] = useState(false);


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
    let formdata = new FormData();
    formdata.append('email', email);
    formdata.append('password', password);
    try {
      let {
        data
      } = await new Axios({
        method: 'POST',
        url: `${BASE_URI}/signup`,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formdata
      });
      localStorage.setItem(
        'user',
        JSON.stringify({
          data
        })
      );
      // console.log(type);
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
      let formdata = new FormData();
      formdata.append('email', email);
      formdata.append('password', password);
      let {
        data
      } = await new Axios({
        method: 'POST',
        url: `${BASE_URI}/signin`,
        headers: { 'Content-Type': 'multipart/form-data' },
        data:formdata
      });
      console.log(data)
      localStorage.setItem(
        'user',
        JSON.stringify({
          type:data.type,
          token:data.token,
          id:data.id,
        })
      );
      // console.log(type);
      console.log('SignIn success');
      setisAuthenticated(true);
      return true;
    } catch (e) {
      setHasErrorLogin(true);
      setErrorText('Incorrect Password or Email');
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
        errorText,
        hasErrorLogin,
        logout
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
