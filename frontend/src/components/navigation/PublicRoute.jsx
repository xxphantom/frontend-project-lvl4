import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../hooks';

const PublicRoute = ({ restricted, children }) => {
  const { isLogIn } = useAuth();
  return isLogIn && restricted ? <Redirect to="/" /> : children;
};

export default PublicRoute;
