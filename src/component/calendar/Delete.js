import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent, getUser } from '../../actions/users.actions';

const Delete = ({ setPlanning, modalCloseDetails, userId, eventId, setLoad }) => {

    let userPlanning = useSelector(state => state.userReducer);

    const [loadPlanning, setLoadPlanning] = useState(false)

    const dispatch = useDispatch();

    const handleDelete = () => {
        if(window.confirm('Voulez-vous supprimer cet événement ?')){
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
     },[userPlanning, loadPlanning, setPlanning])
 

    
    return (
        <div>
            <button onClick={() => handleDelete()} >Supprimer</button>
        </div>
    );
};

export default Delete;