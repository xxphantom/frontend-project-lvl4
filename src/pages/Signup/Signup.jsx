/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import Logo from 'assets/registration.jpg';
import { useAuth } from 'hooks';
import routes from 'routes.js';

const RegForm = ({ t }) => {
  const auth = useAuth();
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const [existingNames, setExistingNames] = useState([]);

  const validationSchema = Yup.object({
    username: Yup.string()
      .required(t('validation.required'))
      .min(3, t('validation.minNameLength'))
      .max(20, t('validation.maxNameLength'))
      .notOneOf(existingNames, t('validation.alreadyHaveUser')),
    password: Yup.string()
      .required(t('validation.required'))
      .min(6, t('validation.minPasswordLength')),
    passwordConfirm: Yup.string()
      .required(t('validation.required'))
      .oneOf([Yup.ref('password')], t('validation.passwordMismatch')),
  });

  const handleSubmit = async (values, { setFieldTouched }) => {
    const { username, password } = values;
    try {
      const responce = await axios.post(routes.registrationPath(), { username, password });
      auth.logIn(responce.data);
    } catch (err) {
      if (err.response.status === 409) {
        setExistingNames((names) => [...names, username]);
        setFieldTouched('username');
        return;
      }
      throw err;
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '', passwordConfirm: '' }}
      validationSchema={validationSchema}
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
          { 'is-invalid': ((status && status.backendErrors[fieldName]) || errors[fieldName]) && touched[fieldName] },
        );
        return (
          <Form className="col-12 col-md-6 mt-3 mt-mb-0">
            <h1 className="text-center mb-4">{t('signup.labelForm')}</h1>
            <div className="form-floating mb-3 form-group">
              <Field
                id="username"
                type="text"
                name="username"
                innerRef={inputEl}
                placeholder={t('nickname')}
                className={getClasses('username')}
              />
              <label htmlFor="userName">{t('nickname')}</label>
              <div className="invalid-tooltip">
                <ErrorMessage name="username" />
                {status && status.backendErrors.username ? t('signup.alreadyHaveUser') : null}
              </div>
            </div>
            <div className="form-floating mb-3 form-group">
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
              </div>
            </div>
            <div className="form-floating mb-4 form-group">
              <Field
                id="passwordConfirm"
                type="password"
                name="passwordConfirm"
                placeholder={t('signup.confirmPassword')}
                className={getClasses('passwordConfirm')}
              />
              <label htmlFor="password">{t('signup.confirmPassword')}</label>
              <div className="invalid-tooltip">
                <ErrorMessage name="passwordConfirm" />
              </div>
            </div>
            <button
              type="submit"
              className="w-100 mb-3 btn btn-outline-primary"
              disabled={isSubmitting}
            >
              {t('signup.submitForm')}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

const Signup = () => {
  const { t } = useTranslation();
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={Logo} alt={t('signup.altImageText')} />
              </div>
              <RegForm t={t} />
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span className="p-1">{t('signup.maybeHaveAccount')}</span>
                <Link to="/login">{t('logIn')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
