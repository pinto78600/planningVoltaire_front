import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editColor, getUser } from '../../actions/users.actions';


const ChangeColor = ({ id, detailView, modalCloseDetails, setLoad, setPlanning }) => {
    const [color, setColor] = useState(detailView.color);
    const [loadPlanning, setLoadPlanning] = useState(false);
    const [cancel, setCancel] = useState( detailView.color === '#928f8f' ? true : false);
    const [arrive, setArrive] = useState( detailView.color === '#FFD700' ? true : false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    let userPlanning = useSelector(state => state.userReducer);

    const handleChangeColor = (e, eventId) => {
        e.preventDefault();
        const data = {eventId, color}
        setLoading(true);
        dispatch(editColor(id, data))
        .then(() => dispatch(getUser(id)))
        .then(() => setLoadPlanning(true))
        .then(() => modalCloseDetails())
        setLoad(true);
    }

    const handleChangeCancel = e => {
      if(e.target.checked){
        setCancel(true)
        setColor('#928f8f')
        setArrive(false)
      }else setCancel(false)
    }

    const handleChangeArrive = e => {
      if(e.target.checked){
        setArrive(true)
        setColor('#FFD700')
        setCancel(false)
      }else setArrive(false)
    }

    useEffect(() => {
        if(loadPlanning) {
            setPlanning(userPlanning);
            setLoadPlanning(false);
        }
        if(!cancel && !arrive) setColor(detailView.color === '#FF0000' ? '#FF0000' : '#F0F0F0' );

     },[userPlanning, dispatch, loadPlanning, setPlanning, cancel, arrive, color, detailView.color]);

    return(
        <div className='container_form_situation'>
          {loading ? (
            <div className='icon' >
              <i className='fas fa-spinner fa-pulse'></i>
            </div> 
          )
          :
          (
            <form action='' onSubmit={e => handleChangeColor(e, detailView._id)} >
              <input type='checkbox' id='annuler' name='#928f8f' onChange={e => handleChangeCancel(e)} checked={cancel} />
              <label for="annuler" >Annuler</label>
              <br/>
              <input type='checkbox' id='arriver' name='#FFD700' onChange={e => handleChangeArrive(e)} checked={arrive} />
              <label for="arriver" >Arriver</label>
              {detailView.color !== color && (
              <div>
                <input type='submit' value='Valider modification' />          
              </div>
              )}
            </form>
          )}
      </div>
    )

}

export default ChangeColor;