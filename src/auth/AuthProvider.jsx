import React, { useState } from 'react';
import { AuthContext } from 'contexts';
import { useLocalStorage } from 'react-use';

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
  const auth = {
    isLogIn,
    logIn,
    logOut,
    token: authData?.token,
    username: authData?.username,
  };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
