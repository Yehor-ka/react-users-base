import axios from "axios";
import {deleteUserAction, isLoadedUsers, isLoadingUsers, setUsers, updateUserAction} from "../reducers/UsersReducer";


export const getUsers = () => async (dispatch) => {
    try {
        dispatch(isLoadingUsers())
        const resp = await axios.get("http://localhost:5000/users/users")
        dispatch(setUsers(resp.data))
        dispatch(isLoadedUsers())
    } catch (e) {
        dispatch(isLoadedUsers())
        alert(e.message)
    }

}

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch(isLoadingUsers())
        const resp = await axios.delete(`http://localhost:5000/users/delete/${id}`)
        dispatch(deleteUserAction(id))
        dispatch(isLoadedUsers())
    } catch (e) {
        dispatch(isLoadedUsers())
        alert(e.message)
    }

}

export const updateUser = (user) => async (dispatch) => {
    try {
        dispatch(isLoadingUsers())
        const resp = await axios.put(`http://localhost:5000/users/update/${user.id}`, {
            username: user.username,
            email: user.email
        })
        dispatch(updateUserAction(user))
        dispatch(isLoadedUsers())
    } catch (e) {
        dispatch(isLoadedUsers())
        alert(e.message)
    }

}