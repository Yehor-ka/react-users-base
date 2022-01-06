import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Button, Tab, Typography } from '@mui/material'
import React from 'react'
import EditForm from '../EditForm/EditForm'
import UsersGrid from '../UsersGrid/UsersGrid'

const HomeUser = ({ tabs, handleChangeTabs, isOpenEdit, setIsOpenEdit, setUpdateUserData, updateUserData, handleUpdateUser, clickUpdateUser, handleCloseEdit, deleteOwnAccount }) => {
    return (
        <div>
            <TabContext value={tabs}>
              <TabList onChange={handleChangeTabs} aria-label="basic tabs example">
                <Tab label="Table" value="1" />
                <Tab label="Edit profile" value="2" />
                <Tab label="Delete profile" value="3" />
              </TabList>
              <TabPanel value="1">
                <Typography variant="h4" align="center" sx={{ fontWeight: 'bold' }}>
                  USERS DATA TABLE
                </Typography>
                <UsersGrid
                  isOpenEdit={isOpenEdit}
                  setIsOpenEdit={setIsOpenEdit}
                  setUpdateUserData={setUpdateUserData}
                />
              </TabPanel>
              <TabPanel value="2">
                <EditForm
                  isAdmin={false}
                  isOpenEdit={true}
                  updateUserData={updateUserData}
                  handleUpdateUser={handleUpdateUser}
                  clickUpdateUser={clickUpdateUser}
                  handleCloseEdit={handleCloseEdit}
                />
              </TabPanel>
              <TabPanel value="3">
                <Typography variant="h6">Are you sure you wanna delete your account?</Typography>
                <div>
                  <Button variant="outlined" onClick={deleteOwnAccount}>
                    Delete
                  </Button>
                </div>
              </TabPanel>
            </TabContext>
        </div>
    )
}

export default HomeUser
