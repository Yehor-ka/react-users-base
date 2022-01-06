import axios from 'axios';
import { isLoaded, isLoading, setResponse, setUser } from '../reducers/UserReducer';

export const registration = (username, email, password) => async (dispatch) => {
  try {
    const resp = await axios.post('http://localhost:5000/auth/authorization', {
      username,
      email,
      password,
    });
    
    if(resp.data.errors?.errors[0]?.msg) {
      const strError = resp.data.errors?.errors[0].msg || "Ошибка регистрации"
      dispatch(setResponse(strError));
    } else {
      dispatch(setResponse(resp.data.message));
    }
  } catch (e) {
    dispatch(setResponse(e.message));
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(isLoading());
    const resp = await axios.post('http://localhost:5000/auth/login', {
      email,
      password,
    });
    console.log(resp);
    if(!resp.data.message) {
      dispatch(setUser(resp.data));
      localStorage.setItem('token', resp.data.token);
    } else {
      dispatch(setResponse(resp.data.message));
    }
    dispatch(isLoaded());
  } catch (e) {
    dispatch(isLoaded());
    dispatch(setResponse(e.message));
  }
};

export const auth = () => async (dispatch) => {
  try {
    dispatch(isLoading());
    const resp = await axios.get('http://localhost:5000/auth/auth', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    dispatch(setUser(resp.data));
    dispatch(isLoaded());
    localStorage.setItem('token', resp.data.token);
  } catch (e) {
    dispatch(isLoaded());
    dispatch(setResponse(e.message));
    localStorage.removeItem('token');
  }
};
