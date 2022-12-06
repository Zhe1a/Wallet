import s from './Auth.module.css';
import { Formik, Field, Form } from 'formik';
import { NavLink } from 'react-router-dom';
import sprite from '../../images/sprite.svg';

import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
const RegistrationPage = ({ handlePassword, handleSubmit, chek }) => {
  return (
    <div className={s.box}>
      <div className={s.logo}>
        <svg className={s.logoSvg}>
          <use href={`${sprite}#icon-logo-full`}></use>
        </svg>
      </div>
      <Formik
        initialValues={{
          password: '',
          email: '',
          username: '',
          userpassword: '',
        }}
        validate={({ password, userpassword, email }) => {
          const errors = {};
          if (!email) {
            errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,}$/i.test(email)) {
            errors.email = 'Invalid email address';
          }
          handlePassword(password, errors);
        }}
        onSubmit={handleSubmit}
      >
        <Form className={s.form}>
          <div className={s.inner}>
            <label form="email">
              <svg className={s.svg}>
                <use href={`${sprite}#email`}></use>
              </svg>
              <Field
                name="email"
                type="email"
                required
                className={s.field}
                placeholder="E-mail"
              />
            </label>
          </div>
          <div className={s.inner}>
            <label form="password">
              <svg className={s.svg}>
                <use href={`${sprite}#password`}></use>
              </svg>
              <Field
                name="password"
                type="password"
                required
                className={s.field}
                placeholder="Password"
              />
            </label>
          </div>
          <div className={s.inner}>
            <label form="password">
              <svg className={s.svg}>
                <use href={`${sprite}#password`}></use>
              </svg>
              <Field
                name="userpassword"
                type="password"
                required
                className={s.field}
                placeholder="Confirm password"
              />
              <div className={s.block_check}>
                <div style={chek} className={s.check}></div>
              </div>
            </label>
          </div>
          <div className={s.inner}>
            <svg className={s.svg}>
              <use href={`${sprite}#user`}></use>
            </svg>
            <label form="username">
              <Field
                name="username"
                type="username"
                required
                className={s.field}
                placeholder="First name"
              />
            </label>
          </div>
          <button type="submit" className={s.button}>
            Register
          </button>
          <NavLink to="/login" className={s.link}>
            Log in
          </NavLink>
        </Form>
      </Formik>
    </div>
  );
};
RegistrationPage.propTypes = {
  handlePassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  chek: PropTypes.object,
};
export default RegistrationPage;