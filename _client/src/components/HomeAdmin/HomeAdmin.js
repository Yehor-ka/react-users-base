import { Typography } from '@mui/material'
import React from 'react'
import EditForm from '../EditForm/EditForm'
import UsersGrid from '../UsersGrid/UsersGrid'

const HomeAdmin = ({isAdmin, isOpenEdit, updateUserData, handleUpdateUser, clickUpdateUser, handleCloseEdit, setIsOpenEdit, setUpdateUserData }) => {
    return (
        <div>
            <EditForm
                  isAdmin={true}
                  isOpenEdit={isOpenEdit}
                  updateUserData={updateUserData}
                  handleUpdateUser={handleUpdateUser}
                  clickUpdateUser={clickUpdateUser}
                  handleCloseEdit={handleCloseEdit}
                />
                <Typography variant="h4" align="center" sx={{ fontWeight: 'bold' }}>
                  USERS DATA TABLE
                </Typography>
                <UsersGrid
                  isOpenEdit={isOpenEdit}
                  setIsOpenEdit={setIsOpenEdit}
                  setUpdateUserData={setUpdateUserData}
                />
        </div>
    )
}

export default HomeAdmin
