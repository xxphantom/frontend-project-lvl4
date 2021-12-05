import React from 'react';
import { Link } from 'react-router-dom';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import cn from 'classnames';
import { useAuth } from '../hooks';
import routes from '../routes.js';
import Logo from '../../assets/icon.jpg';

const validationSchema = Yup.object({
  username: Yup.string()
    .required('Поле должно быть заполнено')
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов'),
  password: Yup.string()
    .required('Поле должно быть заполнено')
    .min(6, 'Не менее 6 символов'),
  passwordConfirm: Yup.string()
    .required('Поле должно быть заполнено')
    .oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
});

const RegForm = () => {
  const auth = useAuth();

  const handleSubmit = async (values, actions) => {
    const { username, password } = values;
    console.log(values);
    try {
      const responce = await axios.post(routes.registrationPath(), { username, password });
      actions.setStatus({ regError: false });
      auth.logIn(responce.data);
    } catch (err) {
      if (err.response.status === 409) {
        actions.setStatus({ regError: true });
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
          { 'is-invalid': ((status && status.regError) || errors[fieldName]) && touched[fieldName] },
        );
        return (
          <Form className="col-12 col-md-6 mt-3 mt-mb-0">
            <h1 className="text-center mb-4">Регистрация</h1>
            <div className="form-floating mb-3 form-group">
              <Field
                id="username"
                type="text"
                name="username"
                placeholder="Ваш ник"
                className={getClasses('username')}
              />
              <label htmlFor="userName">Ваш ник</label>
              <div className="invalid-tooltip">
                <ErrorMessage name="username" />
                {status && status.regError ? ' Пользователь уже существует' : null}
              </div>
            </div>
            <div className="form-floating mb-3 form-group">
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
              </div>
            </div>
            <div className="form-floating mb-4 form-group">
              <Field
                id="passwordConfirm"
                type="password"
                name="passwordConfirm"
                placeholder="Подтвердите пароль"
                className={getClasses('passwordConfirm')}
              />
              <label htmlFor="password">Подтвердите пароль</label>
              <div className="invalid-tooltip">
                <ErrorMessage name="passwordConfirm" />
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
              <img src={Logo} alt="Страница регистрации" />
            </div>
            <RegForm />
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span className="p-1">Уже есть аккаунт?</span>
              <Link to="/login">Войти</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
