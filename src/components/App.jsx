import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './Login.jsx';
import Chat from './Chat.jsx';
import Navbar from './Navbar.jsx';
import AuthContext from '../contexts/authContext.js';

export default () => {
  const auth = useContext(AuthContext);
  return (
    <Navbar>
      <Router>
        <Switch>
          <Route exact path="/">
            {auth.isLogIn
              ? <Chat />
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
