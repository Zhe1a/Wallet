import { Formik, Field, Form } from 'formik';
import s from './Auth.module.css';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { LoginApi } from 'redux/AuthRedux/operations';
import sprite from '../../images/sprite.svg';
import login from '../../images/currency/login.png';
import Photo from './AuthPhoto';
import { mediaQueriesAuth } from './RegistrationForm';
import Media from 'react-media';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const dispatch = useDispatch();
  const notify = e =>
    toast.error(e, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  const handleSubmit = e => {
    const { password } = e;
    password.length >= 6 && password.length <= 12
      ? dispatch(LoginApi(e))
      : notify('The password must contain from 6 to 12');
  };
  return (
    <div className={s.section}>
      <Media queries={mediaQueriesAuth}>
        {matches =>
          (matches.tablet || matches.desktop) && <Photo img={login} />
        }
      </Media>
      <div className={s.body}>
        <div className={s.box}>
          <div className={s.logo}>
            <svg className={s.logoSvg}>
              <use href={`${sprite}#icon-logo-full`}></use>
            </svg>
          </div>
          <Formik
            initialValues={{ password: '', email: '' }}
            validate={({ password, email }) => {
              const errors = {};
              if (!email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,}$/i.test(email)
              ) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={e => {
              handleSubmit(e);
            }}
          >
            <Form className={s.form}>
              <div className={s.inner}>
                <label>
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
                <label>
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
              <button type="submit" className={s.button}>
                Log in
              </button>
              <NavLink to="/register" className={s.link}>
                Register
              </NavLink>
            </Form>
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Login;