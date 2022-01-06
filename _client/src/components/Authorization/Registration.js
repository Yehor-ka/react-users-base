import React, { useState } from 'react';
import s from './Authorization.module.scss';
import CustomInput from '../../utils/CustomInput/CustomInput';
import { registration } from '../../actions/user';
import { useDispatch } from 'react-redux';
import { Alert, Snackbar } from '@mui/material';

const Registration = () => {
  const [regData, setRegData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const [isRegistrationError, setIsRegistrationError] = useState(false);

  const onClickRegistrate = () => {
    if (regData.username.trim() && regData.email.trim() && regData.password.trim()) {
      dispatch(registration(regData.username, regData.email, regData.password));
      setRegData({
        username: '',
        email: '',
        password: '',
      });
      setIsRegistrationError(false);
    } else {
      setIsRegistrationError(true);
    }
  };


  const closeSnackBar = () => {
    setIsRegistrationError(false);
  }

  return (
    <div className={s.authorization}>
      <div className={s.header}>Регистрация</div>
      <CustomInput
        name={'username'}
        value={regData.username}
        setValue={setRegData}
        typeInput={'text'}
        text={'Введите ваше имя'}
      />
      <CustomInput
        name={'email'}
        value={regData.email}
        setValue={setRegData}
        typeInput={'text'}
        text={'Введите ваш email'}
      />
      <CustomInput
        name={'password'}
        value={regData.password}
        setValue={setRegData}
        typeInput={'password'}
        text={'Введите ваш пароль'}
      />
      <button onClick={onClickRegistrate} className={s.button}>
        Зарегистрироваться
      </button>
      <Snackbar open={isRegistrationError} autoHideDuration={4000} onClose={closeSnackBar}>
        <Alert severity="error" sx={{ width: '100%' }}>
          *Поля для ввода должны быть заполнены!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Registration;
