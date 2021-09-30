import axios from 'axios';

export const GET_USERS = "GET_USERS";
export const POST_EVENT  = "POST_EVENT";
export const GET_USER = "GET_USER";
export const DELETE_EVENT = "DELETE_EVENT";
export const EDIT_EVENT = "EDIT_EVENT";
export const DELETE_USER = "DELETE_USER";
export const EDIT_COLOR= "EDIT_COLOR";

export const getUsers = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api`)
            .then(res => {
                dispatch({ type : GET_USERS, payload : res.data });
            })
            .catch((err) => console.log(err)); 
    }
};

export const getUser = (id) => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}api/${id}`,
        })
        .then(res => {
            dispatch({ type : GET_USER, payload : res.data });
        })
        .catch(err => console.log(err));
    }
}

export const postEvent = (id, data) => {
    return (dispatch) => {
        return axios({
            method: 'post',
            url:`${process.env.REACT_APP_API_URL}api/${id}`,
            data: {data}
        })
        .then(res => {
            if(res.data.errors){
                dispatch({type: POST_EVENT, payload : res.data.errors})
            }
        })
        .catch(err => console.log(err));
    }
}

export const deleteEvent = (userId, eventId) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url : `${process.env.REACT_APP_API_URL}api/${userId}`,
            data : {eventId}
        })
        .then(res => {
            dispatch({ type : DELETE_EVENT, payload : res.data })
        })
        .catch(err => console.log(err));
    }
}

export const editEvent = (userId, data) =>{
    return (dispatch) => {
        return axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}api/${userId}`,
            data: {data}
        })
        .then(res => {
            if(res.data.errors){
                dispatch({type: EDIT_EVENT, payload : res.data.errors})
            }
        })
        .catch(err => console.log(err));
    }
}

export const editColor = (userId, color) => {
    return (dispatch) => {
        return axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}api/color/${userId}`,
            data: {color}
        })
        .then(res => {
            if(res.data.errors){
                dispatch({type: EDIT_COLOR, payload : res.data.errors})
            }
        })
        .catch(err => console.log(err));
    }
}

export const deleteUser = (id) => {
    return (dispatch) => {
        return axios({
            method:'delete',
            url:`${process.env.REACT_APP_API_URL}api/${id}`
        })
        .then(res => {
            if(res.data.errors){
                dispatch({type: DELETE_USER, payload : res.data.errors})
            }
        })
        .catch(err => console.log(err));
    }
}
