import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';

export default (props) => {
  const { children } = props;
  const { t } = useTranslation();
  const { isLogIn, logOut } = useAuth();
  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">
            {t('chatName')}
          </a>
          { isLogIn ? (
            <button type="button" onClick={logOut} className="btn btn-primary">
              {t('exit')}
            </button>
          ) : null}
        </div>
      </nav>
      {children}
    </div>
  );
};
