import React, { useState } from 'react';
import { useLocalStorage } from 'react-use';
import AuthContext from '../contexts/authContext.js';

const AuthProvider = ({ children }) => {
  const [authData, setAuthData, removeAuthData] = useLocalStorage('user');
  const isHasToken = !!authData;
  const [isLogIn, setLogIn] = useState(isHasToken);
  const logIn = ({ username, token }) => {
    setAuthData({ username, token });
    setLogIn(true);
  };
  const logOut = () => {
    removeAuthData();
    setLogIn(false);
  };
  return (
    <AuthContext.Provider value={{
      isLogIn,
      logIn,
      logOut,
      token: authData?.token,
      username: authData?.username,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
