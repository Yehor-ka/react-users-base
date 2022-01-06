import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {userReducer} from "./UserReducer";
import {usersReducer} from "./UsersReducer";

const rootReducer = combineReducers({
    user: userReducer,
    users: usersReducer
})

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);