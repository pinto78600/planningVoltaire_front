import { combineReducers } from "redux";
import usersReducer from "./users.reducers";
import userReducer from "./user.reducers";

export default combineReducers({
    usersReducer,
    userReducer
})