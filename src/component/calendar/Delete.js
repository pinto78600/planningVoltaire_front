import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent, getUser, getUsers } from '../../actions/users.actions';

const Delete = ({ setPlanning, modalCloseDetails, userId, eventId, setLoad }) => {

    let userPlanning = useSelector(state => state.userReducer);

    const [loadPlanning, setLoadPlanning] = useState(false);
    const [loading, setLoading] = useState(false);


    const dispatch = useDispatch();

    const handleDelete = () => {
        if(window.confirm('Voulez-vous supprimer cet événement ?')){
            setLoading(true);
            dispatch(deleteEvent(userId, eventId))
            .then(() => dispatch(getUser(userId)))
            .then(() => setLoadPlanning(true))
            .then(() => modalCloseDetails())
            setLoad(true)
        }
      }

    useEffect(() => {
        if(loadPlanning) {
            setPlanning(userPlanning);
            setLoadPlanning(false)
        }
        dispatch(getUsers());

     },[userPlanning, loadPlanning, setPlanning, dispatch])
 

    
    return (
        <div>
            {loading ? (
                <div className='icon' >
                    <i className='fas fa-spinner fa-pulse'></i>
                </div> 
            )
            :
            (
                <button onClick={() => handleDelete()} >Supprimer</button>
            )}
        </div>
    );
};

export default Delete;