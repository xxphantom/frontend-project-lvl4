import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './app/LoginPage.jsx';
import MessagesList from './app/ChatPage.jsx';
import Navbar from './app/Navbar.jsx';
import AuthContext from './contexts/authContext.js';

export default () => {
  const auth = useContext(AuthContext);
  return (
    <Navbar>
      <Router>
        <Switch>
          <Route exact path="/">
            {auth.isLogIn
              ? <MessagesList />
              : <Redirect to="/login" /> }
          </Route>
          <Route path="/login">
            {auth.isLogIn ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="*">
            <div>
              <h2>404</h2>
            </div>
          </Route>
        </Switch>
      </Router>
    </Navbar>
  );
};
