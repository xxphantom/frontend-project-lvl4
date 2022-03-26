import React, { useState, useMemo } from 'react';
import { useLocalStorage } from 'react-use';
import { AuthContext } from '../contexts';

function AuthProvider({ children }) {
  const [authData, setAuthData, removeAuthData] = useLocalStorage('user');

  const username = authData ? authData.username : null;
  const token = authData ? authData.token : null;

  const [isLogIn, setLogIn] = useState(!!token);

  const logIn = (authParams) => {
    setAuthData(authParams);
    setLogIn(true);
  };

  const logOut = () => {
    removeAuthData();
    setLogIn(false);
  };

  const auth = useMemo(() => ({
    isLogIn,
    logIn,
    logOut,
    token,
    username,
  }), [token, isLogIn]);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
