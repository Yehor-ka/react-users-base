
const SET_USERS = "SET_USERS"
const IS_LOADING_USERS = "IS_LOADING_USERS"
const IS_LOADED_USERS = "IS_LOADED_USERS"
const DELETE_USER = "DELETE_USER"
const UPDATE_USER = "UPDATE_USER"

const initialState = {
    users: [],
    isLoaded: false
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: [...action.payload],
                isLoaded: true
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload),
                isLoaded: true
            }
        case UPDATE_USER:
            const selectUpdatedUser = state.users.find(user => user._id === action.payload.id)
            const indexOfUser = state.users.findIndex(user => user._id === action.payload.id)
            const updatedUser = {
                ...selectUpdatedUser,
                username: action.payload.username,
                email: action.payload.email
            }
            const otherUsers = state.users.filter(user => user._id !== action.payload.id)
            otherUsers.splice(indexOfUser, 0, updatedUser)
            return {
                ...state,
                users: otherUsers,
                isLoaded: true
            }
        case IS_LOADING_USERS:
            return {
                ...state,
                isLoaded: false
            }
        case IS_LOADED_USERS:
            return {
                ...state,
                isLoaded: true
            }
        default:
            return state
    }
}


export const setUsers = (payload) => ({
    type: SET_USERS,
    payload
})

export const deleteUserAction = (payload) => ({
    type: DELETE_USER,
    payload
})

export const updateUserAction = (payload) => ({
    type: UPDATE_USER,
    payload
})

export const isLoadingUsers = () => ({
    type: IS_LOADING_USERS,
})

export const isLoadedUsers = () => ({
    type: IS_LOADED_USERS,
})