import Navbar from './Navbar/Navbar';
import './styles.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from './Authorization/Registration';
import Login from './Authorization/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { auth } from '../actions/user';
import Home from './Home/Home';
import { useNavigate } from 'react-router';
import DialogResponse from './DialogResponse/DialogResponse';

function App() {
  const { isAuth, isLoaded, currentUser, authMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(auth());
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [isAuth]);

  useEffect(() => {
    if (authMessage) {
      setIsOpenDialog(true);
    }
  }, [authMessage]);

  return (
    <>
      {!isLoaded ? (
        <div className="loader-wrapper">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="app">
          <Navbar currentUser={currentUser} />
          <div className="wrap">
            <Routes>
              {isAuth ? (
                <Route path="/" element={<Home />} />
              ) : (
                <>
                  <Route path="/registration" element={<Registration />} />
                  <Route path="/login" element={<Login />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      )}
      <DialogResponse setOpen={setIsOpenDialog} open={isOpenDialog} authMessage={authMessage} />
    </>
  );
}

export default App;
