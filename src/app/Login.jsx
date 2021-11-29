/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import {
  Link,
} from 'react-router-dom';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import cn from 'classnames';
import routes from '../routes.js';
import Logo from '../../assets/icon.jpg';
import AuthContext from '../contexts/authContext.js';

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Поле должно быть заполнено'),
  password: Yup.string()
    .required('Поле должно быть заполнено'),
});

const LoginForm = () => {
  const auth = useContext(AuthContext);
  const handleSubmit = async (values, actions) => {
    try {
      const responce = await axios.post(routes.loginPath(), values);
      const { token, username } = responce.data;
      actions.setStatus({ authError: false });
      auth.logIn({ token, username });
    } catch (err) {
      if (err.response.status === 401) {
        actions.setStatus({ authError: true });
        return;
      }
      throw err;
    }
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
            <h1 className="text-center mb-4">Войти</h1>
            <div className="form-floating mb-3 form-group">
              <Field
                id="username"
                type="username"
                name="username"
                placeholder="Ваш ник"
                className={getClasses('username')}
              />
              <label htmlFor="userName">Ваш ник</label>
              <div className="invalid-tooltip">
                <ErrorMessage name="username" />
                {status && status.authError ? 'Неверный логин или пароль' : null}
              </div>
            </div>
            <div className="form-floating mb-4 form-group">
              <Field
                id="password"
                type="password"
                name="password"
                placeholder="Пароль"
                className={getClasses('password')}
              />
              <label htmlFor="password">Пароль</label>
              <div className="invalid-tooltip">
                <ErrorMessage name="password" />
                {status && status.authError ? 'Неверный логин или пароль' : null}
              </div>
            </div>
            <button
              type="submit"
              className="w-100 mb-3 btn btn-outline-primary"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default () => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img src={Logo} alt="Страница входа" />
            </div>
            <LoginForm />
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span className="p-1">Нет аккаунта?</span>
              <Link to="/signup">Регистрация</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
