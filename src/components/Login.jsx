/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import axios from 'axios';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { createLoginSchema } from '../validation/schema.js';
import { useAuth } from '../hooks';
import routes from '../routes.js';
import Logo from '../../assets/login.jpg';

function LoginForm({ t }) {
  const auth = useAuth();
  const inputEl = useRef(null);
  const loginSchema = createLoginSchema(t);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const handleSubmit = async (values, { setStatus }) => {
    const responce = await axios.post(routes.loginPath(), values)
      .catch((err) => {
        if (err.response?.status === 401) {
          setStatus({ authError: true });
        } else {
          toast.error(t('networkError'));
        }
      });
    const { token, username } = responce.data;
    setStatus({ authError: false });
    auth.logIn({ token, username });
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        status,
        touched,
        isSubmitting,
      }) => {
        const getClasses = (fieldName) => cn(
          'form-control',
          { 'is-invalid': ((status && status.authError) || errors[fieldName]) && touched[fieldName] },
        );
        return (
          <Form className="col-12 col-md-6 mt-3 mt-mb-0">
            <h1 className="text-center mb-4">{t('logIn')}</h1>
            <div className="form-floating mb-3 form-group">
              <Field
                innerRef={inputEl}
                id="username"
                type="username"
                name="username"
                placeholder={t('nickname')}
                className={getClasses('username')}
              />
              <label htmlFor="username">{t('nickname')}</label>
              <div className="invalid-tooltip">
                <ErrorMessage name="username" />
                {status && status.authError ? t('login.wrongCredentials') : null}
              </div>
            </div>
            <div className="form-floating mb-4 form-group">
              <Field
                id="password"
                type="password"
                name="password"
                placeholder={t('password')}
                className={getClasses('password')}
              />
              <label htmlFor="password">{t('password')}</label>
              <div className="invalid-tooltip">
                <ErrorMessage name="password" />
                {status && status.authError ? t('login.wrongCredentials') : null}
              </div>
            </div>
            <button
              type="submit"
              className="w-100 mb-3 btn btn-outline-primary"
              disabled={isSubmitting}
            >
              {t('logIn')}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

function Login() {
  const { t } = useTranslation();
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={Logo} alt={t('login.altImageText')} />
              </div>
              <LoginForm t={t} />
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span className="p-1">{t('login.dontHaveAccount')}</span>
                <Link to="/signup">{t('login.registration')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
