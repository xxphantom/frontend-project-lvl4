import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './app/Login.jsx';
import ChatPage from './app/Chat.jsx';
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
              ? <ChatPage />
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
