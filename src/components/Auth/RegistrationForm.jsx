import register from '../../images/currency/register.png';
import { useDispatch } from 'react-redux';
import { RegisterApi } from 'redux/AuthRedux/operations';

import 'react-toastify/dist/ReactToastify.css';
import s from './Auth.module.css';
import Media from 'react-media';
import { useState } from 'react';
import Photo from './AuthPhoto';
import RegistrationPage from './RegistrationPage';

import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const mediaQueriesAuth = {
  mobile: '(min-width: 320px) and (max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1279px)',
  desktop: '(min-width: 1280px)',
};
const Register = () => {
  const [chek, setChek] = useState();
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
  const dispatch = useDispatch();

  const handleSubmit = e => {
    const { email, username, password, userpassword } = e;
    const beginWithoutDigit = /^\D.*$/;
    const withoutSpecialChars = /^[^-() /]*$/;
    const containsLetters = /^.*[a-zA-Z]+.*$/;

    if (
      password.length >= 6 &&
      password.length <= 12 &&
      username.length > 1 &&
      username.length <= 12
    ) {
      if (
        beginWithoutDigit.test(password) &&
        withoutSpecialChars.test(password) &&
        containsLetters.test(password)
      ) {
        password === userpassword
          ? dispatch(RegisterApi({ email, username, password }))
          : notify('The password does not match');
      } else {
        notify(
          'Your password is misspelled, it must contain letters and numbers '
        );
      }
    } else {
      notify(
        'The password must contain from 6 to 12 characters and the name from 1 to 12 letters'
      );
    }
  };
  const handlePassword = (password, errors) => {
    const good = { width: '100%', backgroundColor: '#24cca7' };
    const normally = { width: '45%', backgroundColor: 'orange' };
    const badly = { width: '25%', backgroundColor: 'red' };
    const refresh = { width: '0%', backgroundColor: '#E5F1EF' };
    if (password.length > 0 && password.length < 3) {
      notify(errors.email);
      setChek(refresh);
    }
    if (password.length > 3 && password.length < 5) {
      setChek(badly);
    }
    if (password.length >= 6 && password.length <= 8) {
      setChek(normally);
    }
    if (password.length >= 8 && password.length <= 12) {
      setChek(good);
    }
  };

  return (
    <div className={s.section}>
      <Media queries={mediaQueriesAuth}>
        {matches =>
          (matches.tablet || matches.desktop) && <Photo img={register} />
        }
      </Media>
      <div className={s.body}>
        <RegistrationPage
          handleSubmit={handleSubmit}
          handlePassword={handlePassword}
          chek={chek}
        />
      </div>
      <ToastContainer />
    </div>
  );
};
export default Register;