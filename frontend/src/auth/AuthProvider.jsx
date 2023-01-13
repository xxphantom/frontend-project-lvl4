import React, { useState, useCallback, useMemo } from 'react';
import { useLocalStorage } from 'react-use';
import { AuthContext } from '../contexts';

const AuthProvider = ({ children }) => {
  const [authData, setAuthData, removeAuthData] = useLocalStorage('user');

  const username = authData ? authData.username : null;
  const token = authData ? authData.token : null;

  const [isLogIn, setLogIn] = useState(!!token);

  const logIn = useCallback((authParams) => {
    setAuthData(authParams);
    setLogIn(true);
  }, [setAuthData]);

  const logOut = useCallback(() => {
    removeAuthData();
    setLogIn(false);
  }, [removeAuthData]);

  const auth = useMemo(() => ({
    isLogIn,
    logIn,
    logOut,
    token,
    username,
  }), [isLogIn, logIn, logOut, token, username]);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
