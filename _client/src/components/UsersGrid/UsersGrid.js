import React, {useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {useDispatch, useSelector} from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {deleteUser} from "../../actions/users";
import {IconButton, Tooltip} from "@mui/material";
import { logOut } from '../../reducers/UserReducer';


const UsersGrid = ({isOpenEdit, setIsOpenEdit, setUpdateUserData}) => {
    const {users} = useSelector(state => state.users)
    const {currentUser} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const formatUsers = users.map(user => ({
        id: user._id,
        username: user.username,
        password: user.password,
        email: user.email,
        role: user.roles[0]
    }))
    const [usersData, setUsersData] = useState(formatUsers || [])

    const handleOpenEdit = () => {
        setIsOpenEdit(true)
    }

    const columns = currentUser.roles[0] === 'ADMIN' ? [
        {field: 'id', headerName: 'ID', width: 150},
        {
            field: 'username',
            headerName: 'Username',
            width: 200,
        },
        {
            field: 'password',
            headerName: 'Password',
            width: 200,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 100,
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 70,
            description: 'This column delete user.',
            sortable: false,
            disableClickEventBubbling: true,
            renderCell: () => (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>),
        },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 70,
            description: 'This column edit user data.',
            sortable: false,
            disableClickEventBubbling: true,
            renderCell: () => (
                <Tooltip title="Edit" onClick={handleOpenEdit}>
                    <IconButton>
                        <EditIcon/>
                    </IconButton>
                </Tooltip>),
        },

    ] : [
        {field: 'id', headerName: 'ID', width: 150},
        {
            field: 'username',
            headerName: 'Username',
            width: 200,
        },
        {
            field: 'password',
            headerName: 'Password',
            width: 200,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 100,
        },

    ];

    const onCellClick = (params, event, details) => {
        if (params.field === 'delete') {
            dispatch(deleteUser(params.id))
        } else if(params.field === 'edit') {
            setUpdateUserData({
                id: params.id,
                username: params.row.username,
                password: params.row.password,
                email: params.row.email,
                role: params.row.role
            })
        }

        if(currentUser._id === params.id) {
            dispatch(logOut())
        }
    }

    return (
        <div style={{height: 400, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <DataGrid
                rows={usersData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                onCellClick={onCellClick}
                disableSelectionOnClick
            />
        </div>
    );
};

export default UsersGrid;
