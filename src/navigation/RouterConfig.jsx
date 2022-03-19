import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import PrivateRoute from 'navigation/PrivateRoute.jsx';
import PublicRoute from 'navigation/PublicRoute.jsx';
import NotFound from 'navigation/NotFound.jsx';

const RouterConfig = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      </Route>
      <Route path="/login">
        <PublicRoute restricted>
          <Login />
        </PublicRoute>
      </Route>
      <Route path="/signup">
        <PublicRoute restricted>
          <Signup />
        </PublicRoute>
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </Router>
);

export default RouterConfig;
