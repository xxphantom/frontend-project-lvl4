import React, { useState } from 'react';
import AuthContext from '../contexts/authContext.js';

const AuthProvider = ({ children }) => {
  const userData = localStorage.getItem('user');
  const user = JSON.parse(userData);
  const isHasToken = !!user;
  const [isLogIn, setLogIn] = useState(isHasToken);
  const logIn = ({ username, token }) => {
    localStorage.setItem('user', JSON.stringify({ username, token }));
    setLogIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setLogIn(false);
  };
  return (
    <AuthContext.Provider value={{ isLogIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
