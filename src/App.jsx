import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './pages/Login.jsx';
import ChatPage from './pages/Chat.jsx';
import Navbar from './pages/Navbar.jsx';
import { useAuth } from './hooks';

export default () => {
  const auth = useAuth();
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
