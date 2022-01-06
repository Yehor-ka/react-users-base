import React from 'react';
import s from './Navbar.module.scss';
import Logo from '../../assets/img/logo.png';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../reducers/UserReducer';
import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

const Navbar = ({ currentUser }) => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  return (
    <div className={s.navbar}>
      <div className={s.container}>
        <img className={s.navbar__logo} src={Logo} alt="Logo_users" />
        <div className={s.navbar__header}>USERS BASE</div>
        {!isAuth ? (
          <>
            <div className={s.navbar__login}>
              <NavLink
                to="/login"
                className={({isActive}) => isActive ? s['active-link'] : ''}>
                Войти
              </NavLink>
            </div>
            <div className={s.navbar__registration}>
              <NavLink
                to="/registration"
                className={({isActive}) => isActive ? s['active-link'] : ''}>
                Регистрация
              </NavLink>
            </div>
          </>
        ) : (
          <div className={s.navbar__right}>
            <Avatar sx={{ bgcolor: deepOrange[500], width: 28, height: 28 }}>
              {currentUser.username[0].toUpperCase()}
            </Avatar>
            <div className={s.navbar__username}>{currentUser.username}</div>
            <div className={s.navbar__login} onClick={() => dispatch(logOut())}>
              Выйти
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
