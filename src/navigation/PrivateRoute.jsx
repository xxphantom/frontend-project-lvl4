import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from 'hooks';

function PrivateRoute({ children }) {
  const { isLogIn } = useAuth();
  return isLogIn ? children : <Redirect to="/login" />;
}

export default PrivateRoute;
