import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers, updateUser } from '../../actions/users';
import Loader from '../Loader/Loader';
import { logOut } from '../../reducers/UserReducer';
import HomeAdmin from '../HomeAdmin/HomeAdmin';
import HomeUser from '../HomeUser/HomeUser';

const Home = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { isLoaded } = useSelector((state) => state.users);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [updateUserData, setUpdateUserData] = useState({
    id: '',
    username: '',
    password: '',
    email: '',
    role: '',
  });
  const [tabs, setTabs] = React.useState('1');

  const handleUpdateUser = (e) => {
    setUpdateUserData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const clickUpdateUser = () => {
    dispatch(updateUser(updateUserData));
    if (currentUser.roles[0] === 'ADMIN') {
      setIsOpenEdit(false);
      if(currentUser._id === updateUserData.id) {
        dispatch(logOut());
      }
    } else {
      dispatch(logOut());
    }
  };

  const handleCloseEdit = () => {
    setIsOpenEdit(false);
  };

  useEffect(() => {
    dispatch(getUsers());
    if (currentUser.roles[0] === 'USER') {
      setUpdateUserData(() => ({
        id: currentUser._id,
        username: currentUser.username,
        password: currentUser.password,
        email: currentUser.email,
        role: currentUser.roles[0],
      }));
    }
  }, []);

  const handleChangeTabs = (event, newValue) => {
    setTabs(newValue);
  };

  const deleteOwnAccount = () => {
    dispatch(deleteUser(currentUser._id));
    dispatch(logOut());
  };

  return (
    <div>
      {isLoaded ? (
        <div style={{ marginTop: '20px' }}>
          {currentUser.roles[0] === 'USER' ? (
            <HomeUser
              tabs={tabs}
              handleChangeTabs={handleChangeTabs}
              isOpenEdit={isOpenEdit}
              setIsOpenEdit={setIsOpenEdit}
              setUpdateUserData={setUpdateUserData}
              updateUserData={updateUserData}
              handleUpdateUser={handleUpdateUser}
              clickUpdateUser={clickUpdateUser}
              handleCloseEdit={handleCloseEdit}
              deleteOwnAccount={deleteOwnAccount}
            />
          ) : (
            <HomeAdmin
              isAdmin={true}
              isOpenEdit={isOpenEdit}
              updateUserData={updateUserData}
              handleUpdateUser={handleUpdateUser}
              clickUpdateUser={clickUpdateUser}
              handleCloseEdit={handleCloseEdit}
              setIsOpenEdit={setIsOpenEdit}
              setUpdateUserData={setUpdateUserData}
            />
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Home;
