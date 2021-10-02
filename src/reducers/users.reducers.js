import { EDIT_COLOR, EDIT_EVENT, GET_USERS, POST_EVENT } from "../actions/users.actions";

const initialState = {};

export default function usersReducer(state = initialState, action){
    switch(action.type){
        case GET_USERS:
            return action.payload;
        case POST_EVENT:
            return action.payload;
        case EDIT_EVENT:
            return action.payload;
        case EDIT_COLOR:
            return action.payload;
        default:
            return state;
    }
};