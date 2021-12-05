import React from 'react';
import { useAuth } from '../hooks';

export default (props) => {
  const { children } = props;
  // const auth = useContext(AuthContext);
  const { isLogIn, logOut } = useAuth();
  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">
            Chat on React
          </a>
          { isLogIn ? (
            <button type="button" onClick={logOut} className="btn btn-primary">
              Выйти
            </button>
          ) : null}
        </div>
      </nav>
      {children}
    </div>
  );
};
