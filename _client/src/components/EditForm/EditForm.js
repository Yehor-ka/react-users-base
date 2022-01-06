import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import s from './EditForm.module.scss';

const EditForm = ({
  isAdmin,
  isOpenEdit,
  updateUserData,
  handleUpdateUser,
  clickUpdateUser,
  handleCloseEdit,
}) => {
  return (
    <div>
      <Accordion
        expanded={isOpenEdit === true}
        sx={{ backgroundColor: '#e9e6e6', border: 'none', boxShadow: 'none' }}>
        <AccordionSummary
          sx={{ backgroundColor: '#e9e6e6', border: 'none', boxShadow: 'none' }}></AccordionSummary>
        <AccordionDetails>
          <Typography
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '10px',
              fontWeight: 'bold',
            }}
            variant="h4">
            {isAdmin ? 'UPDATE USER DATA FORM' : 'UPDATE PROFILE FORM'}
          </Typography>
          <Box className={s.edit__input}>
            <TextField variant="outlined" fullWidth label="ID" disabled value={updateUserData.id} />
          </Box>
          <Box className={s.edit__input}>
            <TextField
              name="username"
              onChange={(e) => handleUpdateUser(e)}
              variant="outlined"
              fullWidth
              label="Username"
              value={updateUserData.username}
            />
          </Box>

          <Box className={s.edit__input}>
            <TextField
              variant="outlined"
              fullWidth
              label="Password"
              disabled
              value={updateUserData.password}
            />
          </Box>

          <Box className={s.edit__input}>
            <TextField
              name="email"
              onChange={(e) => handleUpdateUser(e)}
              variant="outlined"
              fullWidth
              label="Email"
              value={updateUserData.email}
            />
          </Box>

          <Box className={s.edit__input}>
            <TextField
              variant="outlined"
              fullWidth
              label="Role"
              disabled
              value={updateUserData.role}
            />
          </Box>

          <div className={s.edit__btn}>
            <Button sx={{ marginRight: '15px' }} onClick={clickUpdateUser} variant="outlined">
              {isAdmin ? 'Update user' : 'Update profile'}
            </Button>
            {isAdmin && (
              <Button onClick={handleCloseEdit} variant="outlined">
                Close
              </Button>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default EditForm;
