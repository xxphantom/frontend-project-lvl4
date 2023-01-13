import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Navbar from './layout/Navbar.jsx';
import Home from './components/Home';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import PrivateRoute from './components/navigation/PrivateRoute.jsx';
import PublicRoute from './components/navigation/PublicRoute.jsx';
import NotFound from './components/navigation/NotFound.jsx';

const App = () => (
  <Router>
    <Navbar>
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
          <PublicRoute>
            <NotFound />
          </PublicRoute>
        </Route>
      </Switch>
    </Navbar>
  </Router>
);

export default App;
