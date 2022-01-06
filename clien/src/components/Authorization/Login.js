import React, { useState } from 'react';
import s from './Authorization.module.scss';
import CustomInput from '../../utils/CustomInput/CustomInput';
import { login } from '../../actions/user';
import { useDispatch } from 'react-redux';
import { Alert, Snackbar } from '@mui/material';

const Login = () => {
  const [loginData, loginRegData] = useState({
    email: '',
    password: '',
  });
  const [isLoginError, setIsLoginError] = useState(false);
  const dispatch = useDispatch();

  const onLogin = () => {
    if (loginData.email.trim() && loginData.password.trim()) {
      setIsLoginError(false);
      dispatch(login(loginData.email, loginData.password));
    } else {
      setIsLoginError(true);
    }
  };

  const closeSnackBar = () => {
    setIsLoginError(false);
  }

  return (
    <div className={s.authorization}>
      <div className={s.header}>Авторизация</div>
      <CustomInput
        name={'email'}
        value={loginData.email}
        setValue={loginRegData}
        typeInput={'text'}
        text={'Введите ваш email'}
      />
      <CustomInput
        name={'password'}
        value={loginData.password}
        setValue={loginRegData}
        typeInput={'password'}
        text={'Введите ваш пароль'}
      />
      <button onClick={onLogin} className={s.button}>
        Войти
      </button>
      <Snackbar open={isLoginError} autoHideDuration={4000} onClose={closeSnackBar}>
        <Alert severity="error" sx={{ width: '100%' }}>
          *Поля для ввода должны быть заполнены!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
