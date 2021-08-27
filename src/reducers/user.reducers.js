import { DELETE_EVENT, DELETE_USER, GET_USER } from "../actions/users.actions";

const initialState = {};

export default function userReducer(state = initialState, action){
    switch(action.type){
        case GET_USER:
            return action.payload;
        case DELETE_EVENT:
            return action.payload;
        case DELETE_USER:
            return action.payload;
        default:
            return state;
    }
};