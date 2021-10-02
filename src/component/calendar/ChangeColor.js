import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editColor, getUser } from '../../actions/users.actions';


const ChangeColor = ({ id, detailView, modalCloseDetails, setLoad, setPlanning }) => {
    const [color, setColor] = useState(detailView.color ? detailView.color : '');
    const [loadPlanning, setLoadPlanning] = useState(false);

    const dispatch = useDispatch();

    let userPlanning = useSelector(state => state.userReducer);

    const handleChangeColor = (e, eventId) => {
        e.preventDefault();
        const data = {eventId, color}
        dispatch(editColor(id, data))
        .then(() => dispatch(getUser(id)))
        .then(() => setLoadPlanning(true))
        .then(() => modalCloseDetails())
        setLoad(true);
    }

    useEffect(() => {
        if(loadPlanning) {
            setPlanning(userPlanning);
            setLoadPlanning(false);
        }
     },[userPlanning, dispatch, loadPlanning, setPlanning])
  

    return(
        <div>
        <form action='' onSubmit={e => handleChangeColor(e, detailView._id)} >
          <select name="color" id="color" onChange={e => setColor(e.target.value)} value={color} >
            <option value="#F0F0F0">En attente</option>
            <option value="#928f8f">Annuler</option>
            <option value="#FFD700">Arriver</option>
          </select>
          <input type='submit' value='Changer' />
        </form>
      </div>
    )

}

export default ChangeColor;