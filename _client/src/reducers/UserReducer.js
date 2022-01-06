const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';
const IS_LOADING = 'IS_LOADING';
const IS_LOADED = 'IS_LOADED';
const SET_RESPONSE_MESSAGE = 'SET_RESPONSE_MESSAGE';
const CLEAR_RESPONSE_MESSAGE = 'CLEAR_RESPONSE_MESSAGE';

const initialState = {
  currentUser: {
    id: '',
    username: '',
    password: '',
    email: '',
    role: '',
  },
  isAuth: false,
  isLoaded: true,
  authMessage: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload.user,
        isAuth: true,
        authMessage: null,
      };
    case LOG_OUT:
      localStorage.removeItem('token');
      return {
        ...state,
        currentUser: {},
        isAuth: false,
      };
    case IS_LOADING:
      return {
        ...state,
        isLoaded: false,
      };
    case IS_LOADED:
      return {
        ...state,
        isLoaded: true,
      };
    case SET_RESPONSE_MESSAGE:
      return {
        ...state,
        authMessage: action.payload,
      };
    case CLEAR_RESPONSE_MESSAGE:
      return {
        ...state,
        authMessage: null,
      };
    default:
      return state;
  }
};

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const isLoading = () => ({
  type: IS_LOADING,
});

export const isLoaded = () => ({
  type: IS_LOADED,
});

export const setResponse = (payload) => ({
  type: SET_RESPONSE_MESSAGE,
  payload,
});

export const clearResponse = () => ({
  type: CLEAR_RESPONSE_MESSAGE,
});
